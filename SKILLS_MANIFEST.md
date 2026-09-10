# Portfolio Website Skills Manifest

Verified: 2026-08-01

This file routes tasks to the smallest useful context and records which project-local skills are available. Installation does not grant permission to edit, publish, run hooks, add dependencies, or widen a task's scope.

## Always load

- `AGENTS.md`
- `CONTEXT.md`
- The latest user request
- Current Git state when repository work is involved
- Only the exact live source files needed for the task

Read `PROJECT_HANDOFF.md` for historical intent, but verify it because its current-state section is stale.

## Availability

| Capability | Source | State | Default activation |
| --- | --- | --- | --- |
| Cross-project routing | `$bjorn-context-router` | available, user-owned | Use when orienting across vaults or projects |
| Portfolio reference and responsive review | `$portfolio-reference-auditor` | available, user-owned | Primary portfolio design-review skill |
| Portfolio project context | `AGENTS.md`, `CONTEXT.md`, live files | available, project-owned | Always for repository tasks |
| Studio identity | Business Lab `studio_brand_identity_direction.md` | available, studio-owned | Load selected sections only when identity or editorial judgment is material |
| Studio motion principles | Not yet created | unavailable | Do not infer a formal motion system |
| Studio design critic | Not yet created | unavailable | Use portfolio auditor for portfolio review |
| Emil Kowalski animation skills | `.agents/skills/{animation-vocabulary,find-animation-opportunities,improve-animations,review-animations}` | installed project-locally, experimental | Use the narrowest matching skill; `review-animations` requires explicit invocation |
| Transitions.dev | `.agents/skills/transitions-dev` | installed project-locally, experimental; upstream license unresolved | Use only for a concrete motion pattern; keep local and do not redistribute |
| Impeccable | `.agents/skills/impeccable` | installed project-locally, experimental | Explicit invocation only; reserve for bounded critique, audit, or final polish |
| `design-review` | Exact upstream unresolved | unavailable | Do not load or install |
| DialKit | `joshpuckett/dialkit` npm library | verified upstream, not installed | Studio Lab or explicit live parameter tuning only |

## Designing or refining a project page

Load:

- `src/data/projects.ts`
- `src/content.ts`
- `src/components/Portfolio.tsx`
- The relevant styles and assets
- The rendered page at desktop, tablet, and phone sizes
- `$portfolio-reference-auditor` when the task includes references, critique, responsive quality, or design-led implementation
- Only the relevant studio identity sections permitted by `identity_mode`

Do not load motion libraries, DialKit, the whole vault, or final-review specialists by default.

## Layout and editorial work

Use `$portfolio-reference-auditor` plus the current rendered site and live CSS. The proposed `editorial-layout` and `portfolio-case-study` studio skills do not yet exist. Do not invent their rules or treat the old personal prompt library as authoritative.

## Writing work

Load the relevant project record, `src/content.ts`, and only the selected studio writing or brand source needed to preserve a precise, landscape-architectural voice. Do not add collective, company, service, or client claims while `identity_mode` is `personal-portfolio`.

## Interaction and motion work

Load:

- The exact component and CSS
- Existing reduced-motion behavior
- The rendered interaction at relevant viewport sizes

Then choose at most one external role for the first pass:

- `find-animation-opportunities` for a read-only search for justified motion.
- `improve-animations` for a read-only, prioritized motion audit and implementation plan.
- Explicit `$review-animations` for strict review of existing motion code.
- `transitions-dev` for a specific transition implementation pattern.
- DialKit only when Bjorn explicitly wants live parameter tuning or a Studio Lab control surface.

Studio intent and accessibility decide whether motion belongs. External examples decide neither identity nor necessity.

## Studio Lab work

Do not treat Studio Lab as ordinary portfolio implementation. Route first to a dedicated Studio Lab project context in the Landscape Studio Business Lab. DialKit may be considered when adjustable parameters are central to the prototype. Portfolio content and case-study rules are not inherited automatically.

## Final design review

Load:

1. `AGENTS.md`, `CONTEXT.md`, current Git state, and relevant live files.
2. Rendered desktop, 768 px tablet, and 390 px phone views.
3. `$portfolio-reference-auditor` as the primary studio-aware review workflow.
4. Build, accessibility, language, asset, console, overflow, and reduced-motion checks.
5. Explicit `$impeccable` only for a bounded final-review experiment after the primary review.

Do not use unresolved `design-review`. Review does not authorize fixes, installation, commits, or deployment.

## External specialist rules

- Pin upstream URL and commit or release before installation.
- Use `EXTERNAL_SKILLS_LOCK.md` as the provenance and compatibility record.
- Record license, files added, dependencies, permissions, update owner, and removal steps.
- Prefer project-local installation to global installation for evaluation.
- Set broad external review skills to explicit invocation when the host supports it.
- Compare one specialist at a time against the existing workflow.
- Keep an external skill `eksperimentell` until a real task demonstrates a repeatable advantage.
- Never edit a managed or upstream cache in place.

## Conflict resolution

For design and content:

1. Current task and approved decisions.
2. Project context.
3. Studio identity permitted by `identity_mode`.
4. Studio-authored skills.
5. External specialist skills.
6. General conventions.
7. Agent defaults.

Safety, permissions, approval gates, `AGENTS.md`, and verified live state remain non-negotiable.

If an external skill conflicts with a higher source, keep the higher source and report the rejected recommendation.
