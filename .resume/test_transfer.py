import importlib.util
import json
from pathlib import Path
import tempfile
import unittest

spec = importlib.util.spec_from_file_location("transfer", Path(__file__).with_name("transfer.py"))
transfer = importlib.util.module_from_spec(spec)
spec.loader.exec_module(transfer)


class TransferTests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.root = Path(self.temp.name) / "source"
        self.root.mkdir()
        (self.root / ".resume").mkdir()
        for _, paths, _ in transfer.GROUPS:
            for p in paths:
                target = self.root / p
                if p.endswith(".md"):
                    target.parent.mkdir(parents=True, exist_ok=True)
                    target.write_bytes(b"notes as data\r\n")
                else:
                    target.mkdir(parents=True, exist_ok=True)
        (self.root / ".omx/artifacts/evidence.bin").write_bytes(bytes(range(256)))
        (self.root / ".omx/tools/library.bin").write_bytes(b"audit only")
        (self.root / ".omx/tools/library.link").symlink_to("library.bin")
        (self.root / "study/private/extraction.txt").write_bytes("source evidence\r\n£λ".encode())
        (self.root / "study/generated/current.json").write_bytes(b"{}\n")
        (self.root / ".omx/state").mkdir()
        (self.root / ".omx/state/old-owner.json").write_bytes(b"MUST NOT TRANSFER")
        transfer.prepare(self.root, strict=False)
        self.folder = self.root / ".resume"
        self.dest = Path(self.temp.name) / "destination"
        self.dest.mkdir()

    def tearDown(self):
        self.temp.cleanup()

    def mutate_manifest(self, operation):
        p = self.folder / "manifest.json"
        data = json.loads(p.read_text())
        operation(data)
        p.write_text(json.dumps(data))

    def test_exact_restore_idempotence_and_quarantine_without_authority(self):
        result = transfer.restore(self.folder, self.dest)
        self.assertGreater(result["restoredEntries"], 0)
        self.assertEqual((self.dest / "study/private/extraction.txt").read_bytes(),
                         (self.root / "study/private/extraction.txt").read_bytes())
        self.assertFalse((self.dest / ".omx/state").exists())
        self.assertFalse((self.dest / ".omx/tools").exists())
        self.assertEqual((self.dest / ".resume/audit/omx-tools/library.link").read_bytes(), b"audit only")
        self.assertEqual(transfer.restore(self.folder, self.dest)["restoredEntries"], 0)

    def test_existing_changed_file_refuses_before_any_other_restore(self):
        p = self.dest / "study/private/extraction.txt"
        p.parent.mkdir(parents=True)
        p.write_bytes(b"do not overwrite")
        with self.assertRaisesRegex(ValueError, "overwrite"):
            transfer.restore(self.folder, self.dest)
        self.assertEqual(p.read_bytes(), b"do not overwrite")
        self.assertFalse((self.dest / ".omx").exists())

    def test_existing_symlink_ancestor_refuses(self):
        (self.dest / "study").symlink_to(self.root / "study", target_is_directory=True)
        with self.assertRaisesRegex(ValueError, "ancestor"):
            transfer.restore(self.folder, self.dest)

    def test_corrupt_part_refuses_before_any_restore(self):
        p = next((self.folder / "archives").iterdir())
        p.write_bytes(p.read_bytes() + b"corrupt")
        with self.assertRaisesRegex(ValueError, "part"):
            transfer.restore(self.folder, self.dest)
        self.assertFalse((self.dest / ".omx").exists())

    def test_traversal_member_refuses(self):
        self.mutate_manifest(lambda d: d["archives"][0]["members"][0].update(path="../escape"))
        with self.assertRaisesRegex(ValueError, "Unsafe"):
            transfer.restore(self.folder, self.dest)

    def test_escaping_tool_symlink_refuses_before_any_restore(self):
        def mutate(d):
            next(x for x in d["archives"][1]["members"] if x["type"] == "symlink")["linkTarget"] = "../../outside"
        self.mutate_manifest(mutate)
        with self.assertRaisesRegex(ValueError, "symlink"):
            transfer.restore(self.folder, self.dest)
        self.assertFalse((self.dest / ".omx").exists())

    def test_existing_case_alias_refuses(self):
        (self.dest / "Study").mkdir()
        with self.assertRaisesRegex(ValueError, "stored case"):
            transfer.restore(self.folder, self.dest)

    def test_duplicate_casefold_member_refuses(self):
        def mutate(d):
            member = dict(d["archives"][0]["members"][0])
            member["path"] = member["path"].upper()
            d["archives"][0]["members"].append(member)
        self.mutate_manifest(mutate)
        with self.assertRaisesRegex(ValueError, "Duplicate/case"):
            transfer.restore(self.folder, self.dest)


if __name__ == "__main__":
    unittest.main()
