# External Skills Lock

Verified: 2026-08-01

These skills are installed only for `/Users/bjornblomjensen/Developer/bjorn-portfolio` under `.agents/skills/`. They are experimental specialist inputs, not authorities over the portfolio identity, project context, live implementation, or user instructions.

## Locked sources

| Skill | Upstream | Commit | License | Local compatibility adaptation |
| --- | --- | --- | --- | --- |
| `animation-vocabulary` | `https://github.com/emilkowalski/skills`, `skills/animation-vocabulary` | `70744e3816f1d93eafb697161a8b880a7384c5ff` | MIT | None |
| `find-animation-opportunities` | `https://github.com/emilkowalski/skills`, `skills/find-animation-opportunities` | `70744e3816f1d93eafb697161a8b880a7384c5ff` | MIT | None |
| `improve-animations` | `https://github.com/emilkowalski/skills`, `skills/improve-animations` | `70744e3816f1d93eafb697161a8b880a7384c5ff` | MIT | None |
| `review-animations` | `https://github.com/emilkowalski/skills`, `skills/review-animations` | `70744e3816f1d93eafb697161a8b880a7384c5ff` | MIT | Replaced the unsupported `disable-model-invocation` frontmatter field with Codex policy `allow_implicit_invocation: false` in `agents/openai.yaml`; workflow content is unchanged |
| `transitions-dev` | `https://github.com/Jakubantalik/transitions.dev`, `skills/transitions-dev` | `67d5c679305a8a1eb7507d56c3f143c0b47602df` | No license detected in the upstream repository at this commit | Shortened only the discovery description to fit Codex's 1024-character validation limit; workflow and recipes are unchanged |
| `impeccable` 4.0.4 | `https://github.com/pbakaus/impeccable`, `.agents/skills/impeccable` | `c5e1ddd054dc093ef2546c36b82eddf2c4e84bb9` | Apache-2.0 | Removed the unsupported top-level `version` field and recorded it here; added `allow_implicit_invocation: false`; workflow content is unchanged |

## Operating limits

- Load the full skill only when its narrow role is relevant. Use one external specialist at a time unless the task explicitly requires comparison.
- `review-animations` and `impeccable` are explicit-only. Their broad review posture must not silently override project or user-owned guidance.
- Treat Transitions.dev as local evaluation material because no upstream license was detected. Do not commit, redistribute, publish, or copy its recipes into shipped code until usage rights are clarified.
- Impeccable includes Node scripts for inspection, live iteration, image work, and hook management. Installation did not run those scripts or activate hooks.
- No application dependency, package-manager file, source file, or media asset was changed by this installation.
- Installation does not authorize implementation, hook activation, dependency installation, commits, pushes, deployment, publishing, asset movement, or deletion.

## Maintenance

- Update owner: Bjorn, with Codex assisting only after explicit authorization.
- Before an update, compare the new upstream version with this lock and preserve or deliberately revise the local compatibility adaptations.
- Validate every skill after updating. Test discovery and invocation boundaries before using it on project work.
- Removal is exact and reversible through version control once these files are tracked: remove only the named directory under `.agents/skills/`, update this lock and `SKILLS_MANIFEST.md`, and leave all project code and assets untouched.
