# Resume-transfer code review

Date: 2026-10-23. Independent `/root/handoff_transfer_review` code-review lane. This is a review of backup transport only, not study-content, application, architecture or release approval. The study goal remains paused.

## Code Review Summary

**Files Reviewed:** 6: `.resume/transfer.py`, `.resume/test_transfer.py`, `.resume/manifest.json` (schema/metadata only), `.gitattributes`, `.gitignore`, and the backup/restore claims in `HANDOFF.md`.

**Total Issues:** 0 confirmed unresolved findings.

### By Severity
- CRITICAL: 0
- HIGH: 0
- MEDIUM: 0
- LOW: 0

### Spec compliance and root-cause check

The helper preserves the explicitly selected current data in four archive families. Live OMX state/runtime/session authority is outside the positive capture allowlist; retained tools map only to `.resume/audit/omx-tools`. It neither installs nor executes tools, adopts old runtime identity, changes source-channel policy, nor suppresses failed integrity checks. The current public-backup authorization and continued learner/credential exclusions are explicitly recorded. Actual content/secret completeness and full restored-disk verification remain the separate verifier lane's responsibility; this reviewer did not inspect textbook or learner content.

Source inspection confirms part-size/hash and concatenated-archive bindings; ordered member type/name/size/hash/link checks; safe relative paths and positive group membership; case-fold duplicate rejection; confined tool links; complete verification and existing-target conflict preflight before writes; symlink-ancestor rejection; exclusive/no-follow new-file creation; and refusal rather than overwrite of different existing bytes. Failed checks surface errors rather than silently falling back or clearing existing work. Exact-byte Git attributes address the observed `core.autocrlf=true`; ignored live/private/generated trees are represented only through the explicit backup route.

### Exact verification boundary

`verify` (`transfer.py:322–330`) checks archive parts, combined archive/member bytes and the 129 protected original/pilot files in the target. It does **not** independently rehash every already-restored destination member. `restore` checks existing targets and their hashes (`333–371`), then hashes copied streams (`373–405`). The separate verifier's complete restored-disk hash audit is the evidence for full restoration. The documented verify → restore → verify sequence must not be described as a general post-restore disk audit. `HANDOFF.md` accurately explains the narrower archive/protected-file checks and does not claim broader inspection.

The helper is not a filesystem transaction: a write or process failure may leave new partial files, but it does not automatically overwrite differing files on retry. The review does not claim hostile-local-owner race resistance, cryptographic authenticity against an owner replacing code/manifest together, OS-enforced quarantine, encrypted storage, or public-backup privacy. These limits do not contradict the bounded current migration contract.

### Fresh diagnostics

- `python3 -B -m unittest discover -s .resume -p test_transfer.py -v`: **8/8 PASS**, using only the existing isolated synthetic tests. Covers exact/idempotent restore, quarantine/no live authority, changed-file refusal before other restoration, symlink ancestors, corrupt parts, traversal, escaping tool links, existing case aliases and duplicate case-fold targets.
- AST parse: both Python files PASS; `transfer.py --help` PASS.
- Scoped `git diff --check`: PASS. No Git mutation performed.
- Manifest metadata: four families, eight parts, 4,385 members and 129 protected files; SHA256 `2973a168f75835c1cc49ae2fb6092ee46ce86173a58602cd8ca6a602ef5b10e9`.
- No redundant 600-MB production restore was run in this lane; the independent verifier owns that evidence. No claim about remote push success is made.

### Recommendation

**APPROVE — zero unresolved findings in this bounded transfer-code review.** Commit/push remains gated on the separate production restore, content/security inventory, exact Git checkout-byte audit and remote checks.
