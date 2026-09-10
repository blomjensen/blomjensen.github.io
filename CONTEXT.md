# Portfolio Website Context

Ownership and routing updated: 2026-09-09

## Purpose and identity mode

This repository is the active bilingual personal portfolio website for Bjorn Blom-Jensen, landscape architect.

`identity_mode: personal-portfolio`

Preserve the sparse, editorial, calm, and architecture-focused direction. Studio identity sources may inform visual and editorial judgment, but do not introduce claims about a company, collective, services, clients, or collaborators unless Bjorn explicitly changes the identity mode to `studio-public`.

## Start here

1. Read `AGENTS.md` for stable repository rules.
2. Read this file for project ownership, identity, and context boundaries.
3. Read `SKILLS_MANIFEST.md` and activate only the route needed for the task.
4. Read `PROJECT_HANDOFF.md` for current implementation and work-in-progress status, then verify against Git and live files.
5. Read the exact source files needed for the requested output.

Do not load the entire Obsidian vault or every available skill.

## Authoritative sources

| Need | Source |
| --- | --- |
| Stable repository rules | `AGENTS.md` |
| Project identity and context boundary | `CONTEXT.md` |
| Task-to-skill routing | `SKILLS_MANIFEST.md` |
| Current implementation | Git state and live files in `src/`, `public/`, and project configuration |
| Current handoff and work in progress | `PROJECT_HANDOFF.md`, verified against live state; prior handoffs are in `docs/history/` |
| Portfolio design review workflow | User-owned `$portfolio-reference-auditor` skill |
| Studio identity source | `/Users/bjornblomjensen/Library/Mobile Documents/iCloud~md~obsidian/Documents/Landscape Studio Business Lab/studio_brand_identity_direction.md` |
| Portfolio archive control | `/Users/bjornblomjensen/Portfolio_codex/portfolio-archive-control` |

`/Users/bjornblomjensen/Portfolio_codex` is not this website repository.

## Current-state source

Use `PROJECT_HANDOFF.md` for the dated publication and work-in-progress snapshot. Recheck Git and the live site before implementation. Current status is maintained there rather than duplicated in this identity/context file.

The pre-cleanup context snapshot is preserved in [docs/history/CONTEXT_2026-08-01.md](docs/history/CONTEXT_2026-08-01.md).

External project skills remain optional aids governed by `SKILLS_MANIFEST.md` and `EXTERNAL_SKILLS_LOCK.md`. Installation and compatibility claims must be checked when relevant.

## Context and conflict policy

Execution must first respect platform safety, permissions, approval gates, `AGENTS.md`, and verified live state.

For design and content decisions, use this order:

1. Current task and explicitly approved decisions.
2. This project context and approved project decisions.
3. Studio identity sources permitted by `identity_mode`.
4. Studio-authored project or shared skills.
5. External specialist skills.
6. General design and development conventions.
7. Agent defaults.

Do not silently merge conflicting instructions. Preserve the higher-priority source and report the conflict.

## Boundaries

- Preserve English and Norwegian content support.
- Keep raw and authoritative assets outside the repository; add only selected web-ready copies.
- Keep archive-control work separate from website work.
- External skills may improve execution but may not redefine the identity.
- External skill scripts, hooks, and live modes remain inactive unless the applicable skill is deliberately invoked for an authorized task.
- Do not install skills, add dependencies, commit, push, deploy, publish, move assets, or delete files without the required explicit authorization.
- Review work is read-only unless implementation is explicitly requested.

## Verification

For implementation, follow `AGENTS.md`: build, run `git diff --check`, and inspect desktop, 768 px tablet, and 390 px phone behavior. Include navigation, language states, mobile menu, project expansion, accessibility labels, image loading, console errors, horizontal overflow, and reduced motion where relevant.
