# Curriculum and knowledge contract

## Canonical model

Use the exact versioned records and closed references enforced by [the executable contracts](../lib/contracts.mjs). The tracked [source contract](source.md) maps canonical roots and references; this prose explains semantics, not a second JSON schema. Production `study/curriculum.json` owns lectures, lessons, concepts, outcomes, exercises and nonderived links; source coverage, reviews and exposure exceptions remain separate canonical resources. IDs are stable independently of title/order; a future rename/removal needs aliases/migration and recoverable orphan learner notes, not silent reassignment.

Production curriculum is currently pending/empty. The independently reviewed pilot lesson remains provisional; its metadata is not silently imported or counted as production readiness.

## Lessons and outcomes

Map all substantive units in all four lectures before claiming comprehensive teaching. Lesson count follows content complexity, not a quota. Prerequisites must be taught or linked before use, without cycles or “learn later” circularity. Distinguish source-derived material from supplemental bridges.

Write outcomes as observable actions with conditions and success criteria, not “understand X.” Every outcome needs precise evidence and scaffolded practice with a separately anchored answer. Lesson/outcome/exercise references must agree in both directions. Supplied exercises need verified source evidence; authored examples/answers are labelled supplemental. No invented official solution is allowed.

Coverage records must distinguish pending, taught, reference-only, excluded and blocked using the exact schema. A substantive lecture unit counts as taught only with appropriate current independent review; unexplained exclusion or an unrelated lesson link cannot hide an omission. Unknown/unidentified regions block comprehensive claims.

## Knowledge graph and complete retrieval

The query/read/graph CLI is implemented; see root [README](../../README.md) for commands and continuation. It selects agent-channel-permitted content from validated captured canonical bytes. Production now includes independently verified lecture source units, but zero teaching lessons. Unknown transcript/textbook lineage is omitted; missing results are not evidence of complete conversion. Canonical Markdown and records remain authoritative; never edit a generated graph as the source of truth.

Graph shape checks in [the executable contracts](../lib/contracts.mjs) specify typed nodes/edges and evidence; the policy-approved projection derives metadata nodes and edges without feeding raw canonical content into the knowledge builder. Nodes represent source/unit/lecture/lesson/concept/outcome and carry a resolvable reference, summary, tags and revision. Edges distinguish contains/teaches/covers/cites/requires/uses/related/contradicts/exemplifies with evidence, source-or-pedagogical basis, reason and review binding. Curriculum prerequisites own dependent-to-prerequisite `requires`; they form a DAG with prerequisites earlier in order. Outcome concepts own `uses`; other structural edges derive from matching records. General `related`/`contradicts` relationships may cycle and must not become implicit prerequisites. Nonderived pedagogical links require explicit rationale and independent review, not fabricated source assertions.

Graph metadata is navigation, not full teaching or a mastery claim. Source IDs in the graph use the `source:` namespace to avoid collisions with lecture IDs. Nodes use closed record/Markdown/source references; source-unit locators resolve through canonical units, not guessed page anchors. Pending/unverified/unknown lineage is conservatively omitted rather than becoming invented article text. A graph node is not itself permission to read restricted material.

Query searches every selected complete document, including long text and fourth-or-later articles, without a tour/sample cap. Full read returns the complete selected UTF-8 projected Markdown; normal reads use explicit revision-pinned byte continuation, preserving multibyte characters. Metadata/snippets never replace required original evidence. Retrieval's semantic revision is distinct from a publication capture digest. Builder-version-2 snapshots manifest graph/search along with content; old version-1 snapshots remain readable without invented graph/search payloads.

[Understand-Anything integration](../integrations/understand-anything.json) is pinned at commit `b8c807c632743ab695ec43cb654a0f1efe216bc8` and explicitly `disabled-unverified`. No plugin is installed, adapter enabled or compatibility verified. Do not run the upstream plugin/export or claim feature parity; any later adapter needs actual pinned-schema validation and documented losses.

## Readiness is not mastery

Independent reviews bind exact input bytes and written rubric evidence. A changed bound file invalidates approval even if its `reviewId` or other labels remain unchanged. Independent author/reviewer work, not a JSON name, establishes the review process; metadata does not authenticate reviewers.

Prepared/reviewed lessons describe content readiness only. A learner starts not-started; practice, teach-back and the learner's own assessment determine progress. Never infer learning from source coverage, an agent response, a publication or a content revision.
