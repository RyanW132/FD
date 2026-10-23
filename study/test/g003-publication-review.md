# G003 independent publication/privacy review

Date: 2026-10-21. Reviewer lane: `g003_publication_review`; implementation author: separate `g003_publication_core` lane. No production source or test fixes were made by this reviewer.

## Code Review Summary

**Files Reviewed:** 10 implementation/test files (five `study/lib/*.mjs` modules, `scripts/study-build.mjs`, `scripts/study-check.mjs`, both publication test files, and publication fixture helpers). Supporting contracts, PRD publication requirements, test specification and package dependency diff were also inspected.

**Total Unresolved Issues:** 0

### By Severity
- CRITICAL: 0
- HIGH: 0
- MEDIUM: 0
- LOW: 0

### Findings resolved during review

1. **HIGH — shared-span privacy laundering**, repaired at `study/lib/policy.mjs:30-34`, `:46-53`, `:69-77`. Before repair, a public and denied SourceUnit could share the identical extraction path/anchor: publishing omitted the denied record but emitted the same restricted bytes through its public alias. A selection-only repair still published a paraphrased dependent lesson. Independently reproduced both failures. Current recursive provenance closure includes co-owners, dependent source references and shared asset contributors; independent reruns omit both raw and derived canaries.
2. **HIGH — unclassified/Source-record provenance disappeared during merging**, repaired at `study/lib/policy.mjs:37-54`. Before repair, an empty-evidence concept or a denied Source record contributed no units and `unknown:false`; a lesson's public units cancelled that missing classification. Independently reproduced ordinary publication of the dependent lesson, including a false reviewed-complete result for the empty concept. Current unclassified leaves deny, Source/lecture records resolve their units or remain unknown, and independent reruns emit no dependent canary and report teaching incomplete.
3. **HIGH — private-origin path laundering**, repaired at `study/lib/policy.mjs:24-29`, `:71-77`. Before repair, a public source's extraction under `study/private/` was emitted directly. A source-unit-only repair still emitted a public lesson paraphrasing a private concept and advertised reviewed-complete. Independently reproduced both. Current closure propagates private origin through teaching paths, extraction, exercise prompt/answer, Markdown evidence and owned assets. Full coherent reviewed fixtures independently verified private concept and private answer dependencies are withheld, while existing exact selected private-source exceptions still pass the regression suite.
4. **MEDIUM — review subject ignored record path identity**, repaired at `study/lib/contracts.mjs:472-477`, `:493-498`. Before repair, replacing the actual lesson subject with a valid same-ID record in unrelated JSON still allowed reviewed-complete publication. Independently reproduced; current binding requires the correct canonical path and ID. Independent normal and draft reruns both reject the unrelated subject.

### Contract clarification

The leader resolved PRD117 to permit a structurally valid, privacy-safe `changes-needed` review only in explicitly requested, persistently marked unreviewed draft output. `REVIEW_REJECTED` is distinct from byte-freshness `STALE_REVIEW`. Missing hashes/bindings, invalid source identity, paths, references and privacy remain fatal. Normal publication rejects rejected reviews; draft teaching completeness remains false. This is not a blanket error-swallowing fallback.

### Fresh verification

- `node --test study/test/*.test.mjs`: **138 passed, 0 failed**.
- `node scripts/study-check.mjs --syntax --static --json`: **passed**, 14 JavaScript modules checked. Static check is explicitly bounded (`eval`/`new Function`), not ESLint/typechecking.
- Independent synthetic, temporary-directory reproductions verified repaired direct/transitive shared-span, unknown-concept, denied Source-record, shared-image, private-source, private-concept, private-answer and same-ID review scenarios.
- Examined capture confinement/exact-byte rechecks; validation and selection use captured readers without live-file fallback. Generation readers bind manifest membership and payload hashes, return copied pinned bytes, and publication retains explicit completed-batch/atomic-pointer switching.
- Dependency diff adds npm wrappers only; existing `git` dependency is unchanged. Publication modules use Node standard-library/local modules, with no provider SDK or new package.

### Scope limits

Status-only incomplete production publication is valid; it does not certify comprehensive teaching. Browser/server/query/graph behavior is not implemented or approved here. Failure hooks demonstrate exception-boundary consistency, not physical power-loss durability. Descriptor/path checks are not a claim of OS-adversary resistance or reviewer authentication. New unreferenced files outside the declared candidate inputs are an inventory-stage integration consideration, not proof of a captured-input race.

### Recommendation

**APPROVE** the bounded G003 code-review lane. The leader retains integration and any separate architecture/final workflow gates.
