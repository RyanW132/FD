# Resume backup verification

## Verdict
- **PASS — local backup integrity and isolated restoration verified.** This is a pre-push gate, not remote-upload proof or study/release completion. The study goal remains paused.

## Evidence
- Sealed manifest SHA256: `2973a168f75835c1cc49ae2fb6092ee46ce86173a58602cd8ca6a602ef5b10e9`. Four archive families, eight parts, 4,385 members; every part is at most 90 MiB.
- Fresh archive verification and aggregate secret-format scan: **4,147 files / 564,128,595 uncompressed bytes**, zero known private-key/GitHub-token/OpenAI-style-key/AWS-access-ID format findings. Additional normal Git files and the initial 4,859-file worktree scan were also clean for those formats; no matched secret or restricted source text was emitted.
- Actual isolated production restore: **all 4,147 restored file hashes match**, ten tool symlinks remain confined to audit quarantine; no live `.omx/state` or `.omx/tools` restored. Repeat restore produced **zero new entries**.
- Production probes preserved/refused a changed existing file and rejected existing case aliases, symlink ancestors and a corrupted archive part before target writes. Exactly owned temporary probe trees were removed after identity revalidation.
- Fresh helper regressions: **8/8 pass**. All 13 originals and the 116-file frozen pilot match their bound bytes; pilot aggregate `574b07e5b64153fcb82bd7c072691a3e56661eeb0364e7367f0f5a8960f50c04`.
- Independent candidate Git-object and actual Git-checkout audits: **859 files / 534,336,128 bytes, zero byte mismatches**. Checkout used `core.autocrlf=true`; active `* -text` attributes preserve bytes. Later standalone audit/review metadata still requires final Git-lane staging/checks.
- Handoff: 26 local Markdown references resolve; current 44 drafted lessons / 16 drafted concepts / 371 mapped primary units and zero canonical teaching/reviews agree with disk. All 6,476 canonical coverage records remain pending. Critical plans, interruption checkpoints and the late observability assessment are archived.

## Scope deviation
The verifier queried the already-existing temporary candidate tree once with `git write-tree`, which can update cache/tree-object metadata and exceeded strict read-only Git intent. No primary-index, branch, commit or source operation was used; parent/Git master were notified, no broad cleanup was attempted, and the Git lane owns fresh final index/branch revalidation. The returned tree was the expected `a57736f7d57abfa0c4dd91aa3abd985b19eefca9`.

## Gaps and risks
- Remote push is **not asserted here**. Final delivery must name and verify the actual GitHub commit. These standalone reports are outside the archives they hash to avoid self-reference.
- Pattern scans cannot prove the absence of every possible secret or personal passage. Public archives provide no privacy or encryption; public source/extraction backup was explicitly authorized.
- Quarantine is not an OS security boundary; Windows-mounted WSL may ignore requested mode bits. Restore is non-overwriting but not an atomic filesystem transaction or malicious-owner authenticity proof.
- This verifies migration artifacts only. It does not approve the unfinished study content, renderer/UI, observability design, destination-machine runtime, or G008 release gates.

Reproduce the bounded checks with `python3 -B -m unittest discover -s .resume -p test_transfer.py -v` and, from a full clone, `python3 -B .resume/transfer.py verify` followed by the documented isolated/normal restore procedure. Complete metadata is in [verification.json](verification.json).
