# Portfolio website — current handoff

Updated: 2026-09-09. Documentation cleanup requested by Bjørn. Existing website code and media edits have been preserved.

## Start here

- Website repository: `/Users/bjornblomjensen/Developer/bjorn-portfolio`
- Public site: [blomjensen.no](https://blomjensen.no/)
- [Studio and portfolio overview](</Users/bjornblomjensen/Documents/Second income/00_PROSJEKTOVERSIKT.md>)
- Read `AGENTS.md` for repository rules and `CONTEXT.md` for identity and ownership.
- [Previous handoff — July 2026](docs/history/PROJECT_HANDOFF_2026-07-04.md) is historical. Its “not committed / not deployed” statements do not describe current status.

## Verified publication

The latest checked GitHub Pages workflow completed successfully for commit `161f57a5eb7fe1279c33f92bd573ac3566d36e86` (“Refine diploma case media flow”).

[Deployment record](https://github.com/blomjensen/blomjensen.github.io/actions/runs/34170935387), started 2026-09-07 23:42 UTC / 2026-09-08 01:42 Oslo time.

The public HTML and its JavaScript asset were available during the 2026-09-09 audit. The public bundle contained Studies navigation and model-viewer code. This is publication evidence, not a new full browser QA pass.

GitHub Pages from `main`, via `.github/workflows/deploy.yml`, remains the deployment target. `netlify.toml` is a legacy/secondary configuration.

## Current implementation

- Bilingual personal landscape-architecture portfolio.
- Navigation: Portfolio, Studies/Studier, About/Om, Contact/Kontakt, plus language toggle.
- Inline project expansion, image/video galleries and interactive diploma model viewers.
- The identity remains personal portfolio. A public Studio Lab section is an idea under discussion and is not implemented.
- The separate Utearealstudie prototype lives at `/Users/bjornblomjensen/Documents/Second income/utearealstudie-site`.

## Local work in progress

At this documentation update, these six tracked files already differed from HEAD:

| Files | Existing work |
| --- | --- |
| `package.json`, `package-lock.json` | Dependency edits |
| `src/components/ProjectModelViewer.tsx` | Model-viewer changes |
| `src/components/Portfolio.tsx`, `src/data/projects.ts` | Project/media changes |
| `src/custom.css` | Presentation and viewer styling |

These edits are not part of the documentation cleanup and are not represented by the successful deployment above. Inspect the diff before resuming implementation.

Additional untracked context/skill files and media exports are present. They are not automatically disposable or ready to publish. Use explicit file selection for any future commit.

## Where to work

| Task | Source |
| --- | --- |
| Project content and assets referenced on the site | `src/data/projects.ts` and `public/projects/` |
| General bilingual copy | `src/content.ts` |
| Navigation and sections | `src/App.tsx`, `src/components/Navigation.tsx` |
| Project layouts and media | `src/components/Portfolio.tsx` |
| 3D model interaction | `src/components/ProjectModelViewer.tsx` |
| Active styles | `src/custom.css` |
| Archive inventory and copy records | [Portfolio archive control](</Users/bjornblomjensen/Portfolio_codex/portfolio-archive-control>) |
| Publication and school-source curation | [Portfolio 2026](</Users/bjornblomjensen/Documents/Portfolio 2026/START_HER.md>) |

Raw school, GIS, Rhino and InDesign material stays in the relevant source/archive locations. Only selected web-ready assets belong in the website repository.

## Next implementation session

1. Recheck Git status and the six-file work-in-progress diff.
2. Confirm the requested viewer/media change and verify that focused change.
3. Treat a Studio Lab section as a separate content/design task after selecting actual experiments.
4. Build and inspect desktop, 768 px tablet and 390 px phone for code/UI changes. Documentation-only edits require link/diff checks.
5. Obtain publication authorization before committing/pushing/deploying website changes, per `AGENTS.md`.

Preview command: `npm run dev -- --host 127.0.0.1 --port 3001 --strictPort --open false`. A port number is not evidence of a running current server; check before reusing it.

Build: `npm run build`. Check whitespace with `git diff --check`. No build or functional browser QA was run for this documentation-only cleanup.
