#!/usr/bin/env python3
"""Byte-preserving paused-work backup. No dependency installation or runtime adoption."""
import argparse
import gzip
import hashlib
import io
import json
import os
from pathlib import Path, PurePosixPath
import posixpath
import re
import stat
import tarfile

LIMIT = 90 * 1024 * 1024
GROUPS = [
    ("omx-portable", [".omx/artifacts", ".omx/context", ".omx/drafts", ".omx/plans",
                      ".omx/specs", ".omx/ultragoal", ".omx/notepad.md"], None),
    ("omx-tools-audit", [".omx/tools"], ".resume/audit/omx-tools"),
    ("restricted-study-private", ["study/private"], None),
    ("generated-snapshots", ["study/generated"], None),
]


def fail(message):
    raise ValueError(message)


def safe(name):
    if not isinstance(name, str) or not name or "\\" in name or "\0" in name:
        fail("Unsafe backup path")
    p = PurePosixPath(name)
    if p.is_absolute() or any(x in ("", ".", "..") for x in name.split("/")) or ":" in name:
        fail("Unsafe backup path")
    return name


def digest_file(path):
    h = hashlib.sha256()
    with open(path, "rb") as f:
        for block in iter(lambda: f.read(1024 * 1024), b""):
            h.update(block)
    return h.hexdigest()


def entries(root, selected):
    result = []
    def visit(p):
        rel = p.relative_to(root).as_posix()
        if p.name == "__pycache__" or p.suffix == ".pyc":
            return
        safe(rel)
        st = p.lstat()
        if stat.S_ISLNK(st.st_mode):
            result.append((rel, "symlink", st))
        elif stat.S_ISDIR(st.st_mode):
            result.append((rel, "directory", st))
            for child in sorted(p.iterdir(), key=lambda x: x.name):
                visit(child)
        elif stat.S_ISREG(st.st_mode):
            result.append((rel, "file", st))
        else:
            fail("Unsupported input type: " + rel)
    for name in selected:
        p = root / name
        if not p.exists() and not p.is_symlink():
            fail("Required backup input missing: " + name)
        visit(p)
    return sorted(result, key=lambda item: item[0])


def identity(st):
    return (st.st_dev, st.st_ino, st.st_mode, st.st_size, st.st_mtime_ns, st.st_ctime_ns)


class Parts:
    def __init__(self, folder, name):
        self.folder, self.name = folder, name
        self.parts, self.file = [], None
        self.total, self.current_size = 0, 0
        self.all_hash, self.current_hash = hashlib.sha256(), None

    def close_part(self):
        if self.file:
            self.file.flush()
            os.fsync(self.file.fileno())
            self.file.close()
            self.parts.append({"path": self.path, "byteLength": self.current_size,
                               "sha256": self.current_hash.hexdigest()})
            self.file = None

    def write(self, data):
        original = len(data)
        while data:
            if self.file is None:
                self.path = "archives/" + self.name + ".tar.gz.part" + str(len(self.parts)).zfill(3)
                self.file = open(self.folder / self.path, "xb")
                self.current_size, self.current_hash = 0, hashlib.sha256()
            block, data = data[:LIMIT - self.current_size], data[LIMIT - self.current_size:]
            self.file.write(block)
            self.current_hash.update(block)
            self.all_hash.update(block)
            self.current_size += len(block)
            self.total += len(block)
            if self.current_size == LIMIT:
                self.close_part()
        return original

    def flush(self):
        if self.file:
            self.file.flush()


class HashReader:
    def __init__(self, f):
        self.f, self.h = f, hashlib.sha256()

    def read(self, n=-1):
        data = self.f.read(n)
        self.h.update(data)
        return data


class Joined(io.RawIOBase):
    def __init__(self, paths):
        self.paths, self.i, self.f = paths, 0, None

    def read(self, n=-1):
        if n < 0:
            return b"".join(iter(lambda: self.read(1024 * 1024), b""))
        out = bytearray()
        while len(out) < n:
            if self.f is None:
                if self.i >= len(self.paths):
                    break
                self.f = open(self.paths[self.i], "rb")
                self.i += 1
            data = self.f.read(n - len(out))
            if data:
                out.extend(data)
            else:
                self.f.close()
                self.f = None
        return bytes(out)

    def close(self):
        if self.f:
            self.f.close()
        super().close()


def prepare(root, strict=True):
    folder = root / ".resume"
    (folder / "archives").mkdir(exist_ok=False)
    protected = []
    if strict:
        source_manifest = json.loads((root / "study/sources/manifest.json").read_text())
        sources = list(source_manifest["sources"].values())
        if len(sources) != 13:
            fail("Expected 13 original sources")
        for source in sources:
            p = root / safe(source["originalPath"])
            if digest_file(p) != source["sha256"] or p.stat().st_size != source["byteLength"]:
                fail("Original source integrity failure")
            protected.append({"path": source["originalPath"], "sha256": source["sha256"],
                              "byteLength": source["byteLength"]})
        pilot = [p for p in (root / "study/pilot").rglob("*") if p.is_file()]
        if len(pilot) != 116:
            fail("Expected frozen 116-file pilot")
        protected += [{"path": p.relative_to(root).as_posix(), "sha256": digest_file(p),
                       "byteLength": p.stat().st_size} for p in sorted(pilot)]
    archives = []
    for name, selected, quarantine in GROUPS:
        before = entries(root, selected)
        writer, members = Parts(folder, name), []
        with gzip.GzipFile(filename="", mode="wb", compresslevel=1, mtime=0, fileobj=writer) as gz:
            with tarfile.open(fileobj=gz, mode="w|", format=tarfile.PAX_FORMAT) as tar:
                for rel, kind, st in before:
                    member = {"path": rel, "type": kind, "byteLength": st.st_size if kind == "file" else 0,
                              "sha256": None, "linkTarget": None, "sourceMode": stat.S_IMODE(st.st_mode)}
                    info = tarfile.TarInfo(rel)
                    info.mtime, info.uid, info.gid = 0, 0, 0
                    info.uname, info.gname = "", ""
                    if kind == "directory":
                        info.type, info.mode = tarfile.DIRTYPE, 0o755
                        tar.addfile(info)
                    elif kind == "symlink":
                        target = os.readlink(root / rel)
                        if quarantine is None or target.startswith("/") or "\\" in target or "\0" in target:
                            fail("Unexpected archive symlink")
                        resolved = posixpath.normpath(posixpath.join(posixpath.dirname(rel), target))
                        if not resolved.startswith(".omx/tools/"):
                            fail("Tool symlink escapes quarantine")
                        member["linkTarget"] = info.linkname = target
                        info.type, info.mode = tarfile.SYMTYPE, 0o777
                        tar.addfile(info)
                    else:
                        flags = os.O_RDONLY | getattr(os, "O_NOFOLLOW", 0)
                        with os.fdopen(os.open(root / rel, flags), "rb") as f:
                            if identity(os.fstat(f.fileno())) != identity(st):
                                fail("Input changed before backup read")
                            reader = HashReader(f)
                            info.size, info.mode = st.st_size, 0o644
                            tar.addfile(info, reader)
                            member["sha256"] = reader.h.hexdigest()
                            if identity(os.fstat(f.fileno())) != identity(st):
                                fail("Input changed during backup read")
                    members.append(member)
        writer.close_part()
        after = entries(root, selected)
        if [(p, t, identity(s)) for p, t, s in before] != [(p, t, identity(s)) for p, t, s in after]:
            fail("Backup input membership/identity changed")
        archives.append({"name": name, "parts": writer.parts, "sha256": writer.all_hash.hexdigest(),
                         "byteLength": writer.total, "members": members,
                         "quarantinePrefix": quarantine})
    manifest = {"schemaVersion": 1,
                "authorization": "User explicitly requested public GitHub backup after being informed that supplied course/textbook sources and restricted extraction artifacts are included. This is not browser/agent policy expansion.",
                "excluded": ["live OMX state/runtime/logs/cache/session/locks/metrics/tmux identity",
                             "credentials and browser profiles", "private learner state", "node_modules", "Python caches"],
                "archives": archives, "protectedFiles": protected}
    with open(folder / "manifest.json", "x", encoding="utf-8", newline="\n") as f:
        json.dump(manifest, f, indent=2, ensure_ascii=True)
        f.write("\n")
    return manifest


def target_name(archive, member):
    name = safe(member["path"])
    if archive["quarantinePrefix"]:
        if name != ".omx/tools" and not name.startswith(".omx/tools/"):
            fail("Unexpected quarantine member")
        name = archive["quarantinePrefix"] + name[len(".omx/tools"):]
    return safe(name)


def load_manifest(folder):
    value = json.loads((folder / "manifest.json").read_text())
    if value.get("schemaVersion") != 1:
        fail("Unsupported backup manifest")
    if [a["name"] for a in value["archives"]] != [x[0] for x in GROUPS]:
        fail("Unexpected archive groups")
    seen = set()
    for archive, (_, _, quarantine) in zip(value["archives"], GROUPS):
        if archive["quarantinePrefix"] != quarantine:
            fail("Unexpected quarantine mapping")
        for i, part in enumerate(archive["parts"]):
            if part["path"] != "archives/" + archive["name"] + ".tar.gz.part" + str(i).zfill(3):
                fail("Unexpected archive part path")
            if not 0 < part["byteLength"] <= LIMIT:
                fail("Invalid archive part size")
            if not re.fullmatch("[a-f0-9]{64}", part["sha256"]):
                fail("Invalid archive part hash")
        for member in archive["members"]:
            name = target_name(archive, member)
            if name.casefold() in seen:
                fail("Duplicate/case-aliased backup target")
            seen.add(name.casefold())
            original = member["path"]
            allowed = next(g[1] for g in GROUPS if g[0] == archive["name"])
            if not any(original == p or original.startswith(p + "/") for p in allowed):
                fail("Member outside positive backup allowlist")
            if member["type"] not in ("file", "directory", "symlink"):
                fail("Unsupported member type")
            if not isinstance(member["byteLength"], int) or member["byteLength"] < 0:
                fail("Invalid member length")
            if member["type"] == "file":
                if not re.fullmatch("[a-f0-9]{64}", member["sha256"] or "") or member["linkTarget"] is not None:
                    fail("Invalid file binding")
            elif member["byteLength"] != 0 or member["sha256"] is not None:
                fail("Invalid non-file binding")
            if member["type"] == "symlink":
                target = member["linkTarget"]
                if not quarantine or not isinstance(target, str) or not target or target.startswith("/") or "\\" in target or "\0" in target:
                    fail("Unsafe manifest symlink")
                resolved = posixpath.normpath(posixpath.join(posixpath.dirname(name), target))
                if not resolved.startswith(quarantine + "/"):
                    fail("Manifest symlink escapes quarantine")
            elif member["linkTarget"] is not None:
                fail("Unexpected link target")
    return value


def scan_archive(folder, archive, consume=None):
    whole, total, paths = hashlib.sha256(), 0, []
    for part in archive["parts"]:
        p = folder / safe(part["path"])
        if p.is_symlink() or not p.is_file() or p.stat().st_size != part["byteLength"]:
            fail("Archive part missing or changed")
        h = hashlib.sha256()
        with open(p, "rb") as f:
            for block in iter(lambda: f.read(1024 * 1024), b""):
                h.update(block); whole.update(block); total += len(block)
        if h.hexdigest() != part["sha256"]:
            fail("Archive part hash mismatch")
        paths.append(p)
    if whole.hexdigest() != archive["sha256"] or total != archive["byteLength"]:
        fail("Combined archive identity mismatch")
    count = 0
    with Joined(paths) as joined, tarfile.open(fileobj=joined, mode="r|gz") as tar:
        for actual in tar:
            if count >= len(archive["members"]):
                fail("Unmanifested archive member")
            member = archive["members"][count]; count += 1
            kind = "file" if actual.isfile() else "directory" if actual.isdir() else "symlink" if actual.issym() else "unsupported"
            if actual.name != member["path"] or kind != member["type"] or actual.size != member["byteLength"]:
                fail("Archive member identity mismatch")
            if kind == "symlink" and actual.linkname != member["linkTarget"]:
                fail("Archive symlink mismatch")
            stream = tar.extractfile(actual) if kind == "file" else None
            if consume:
                consume(archive, member, stream)
            elif stream:
                h = hashlib.sha256()
                for block in iter(lambda: stream.read(1024 * 1024), b""):
                    h.update(block)
                if h.hexdigest() != member["sha256"]:
                    fail("Archived file hash mismatch")
    if count != len(archive["members"]):
        fail("Missing archive member")


def verify(folder, root):
    manifest = load_manifest(folder)
    for item in manifest["protectedFiles"]:
        p = root / safe(item["path"])
        if p.is_symlink() or not p.is_file() or p.stat().st_size != item["byteLength"] or digest_file(p) != item["sha256"]:
            fail("Original/pilot checkout bytes differ")
    for archive in manifest["archives"]:
        scan_archive(folder, archive)
    return manifest


def check_target(root, archive, member, case_cache=None):
    name = target_name(archive, member)
    p = root / name
    current = root
    for component in PurePosixPath(name).parts:
        if current.is_dir() and not current.is_symlink():
            names = case_cache.get(current) if case_cache is not None else None
            if names is None:
                names = set(os.listdir(current))
                if case_cache is not None:
                    case_cache[current] = names
            if component not in names and any(x.casefold() == component.casefold() for x in names):
                fail("Restore path aliases different stored case")
        current = current / component
    for parent in reversed(p.parents):
        if parent == root.parent:
            continue
        if parent == root or root in parent.parents:
            if parent.is_symlink() or parent.exists() and not parent.is_dir():
                fail("Restore ancestor is not a plain directory")
    exists = p.exists() or p.is_symlink()
    if exists:
        kind = member["type"]
        same = (kind == "directory" and p.is_dir() and not p.is_symlink()
                or kind == "file" and p.is_file() and not p.is_symlink() and digest_file(p) == member["sha256"]
                or kind == "symlink" and p.is_symlink() and os.readlink(p) == member["linkTarget"])
        if not same:
            fail("Refusing to overwrite different existing target: " + name)
    return p, exists


def restore(folder, root):
    if root.is_symlink() or not root.is_dir():
        fail("Restore root must be an existing plain directory")
    manifest = verify(folder, root)
    case_cache = {}
    for archive in manifest["archives"]:
        for member in archive["members"]:
            check_target(root, archive, member, case_cache)
    restored = 0
    def consume(archive, member, stream):
        nonlocal restored
        p, exists = check_target(root, archive, member, case_cache)
        if member["type"] == "file":
            h = hashlib.sha256()
            if exists:
                for block in iter(lambda: stream.read(1024 * 1024), b""):
                    h.update(block)
            else:
                p.parent.mkdir(parents=True, exist_ok=True)
                flags = os.O_WRONLY | os.O_CREAT | os.O_EXCL | getattr(os, "O_NOFOLLOW", 0)
                with os.fdopen(os.open(p, flags, 0o644), "wb") as f:
                    for block in iter(lambda: stream.read(1024 * 1024), b""):
                        f.write(block); h.update(block)
                    f.flush(); os.fsync(f.fileno())
                restored += 1
            if h.hexdigest() != member["sha256"]:
                fail("Restored file hash mismatch")
        elif not exists:
            p.parent.mkdir(parents=True, exist_ok=True)
            if member["type"] == "directory":
                p.mkdir(mode=0o755)
            else:
                target = member["linkTarget"]
                if not archive["quarantinePrefix"] or target.startswith("/") or "\\" in target:
                    fail("Unsafe restore symlink")
                resolved = posixpath.normpath(posixpath.join(posixpath.dirname(target_name(archive, member)), target))
                if not resolved.startswith(archive["quarantinePrefix"] + "/"):
                    fail("Restore symlink escapes quarantine")
                os.symlink(target, p)
            restored += 1
    for archive in manifest["archives"]:
        scan_archive(folder, archive, consume)
    return {"restoredEntries": restored, "archives": len(manifest["archives"]),
            "tools": "quarantined under .resume/audit/omx-tools; never automatically executed"}


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("command", choices=["prepare", "verify", "restore"])
    parser.add_argument("--root", type=Path)
    args = parser.parse_args()
    folder = Path(__file__).resolve().parent
    root = (args.root or folder.parent).absolute()
    result = prepare(root) if args.command == "prepare" else verify(folder, root) if args.command == "verify" else restore(folder, root)
    print(json.dumps({"ok": True, "command": args.command,
                      "archives": len(result["archives"]) if isinstance(result.get("archives"), list) else result.get("archives"),
                      **({"restoredEntries": result["restoredEntries"], "tools": result["tools"]} if "restoredEntries" in result else {})}))


if __name__ == "__main__":
    try:
        main()
    except (OSError, ValueError, KeyError, tarfile.TarError) as error:
        raise SystemExit("Backup operation refused: " + str(error))
