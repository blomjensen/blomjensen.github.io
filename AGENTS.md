# Portfolio Repository Guidance

## Scope

These instructions apply to the whole repository. Read `PROJECT_HANDOFF.md` before proposing or making changes; it is the intended current-state handoff and may change more often than this file. Verify its claims against the live files and Git state. When they differ, follow the live evidence, report the discrepancy, and update the handoff only when authorized.

## Project boundaries

- Keep the React/Vite website in this repository.
- Keep raw and authoritative source assets in the documented iCloud source folder.
- Copy only selected, optimized, web-ready assets into `public/projects/`.
- Keep archive-control work separate from the website repository.
- Preserve English and Norwegian content support.

## Design direction

Preserve the sparse, editorial, architecture-focused direction: restrained typography, generous whitespace, image-led case studies, project-index logic, and direct interactions. Use references for transferable principles rather than copying branding, assets, text, signature layouts, or another site's identity.

## Safe implementation

- Inspect `git status` and the relevant live files before editing.
- Preserve unrelated and uncommitted work.
- Make the smallest coherent change set that satisfies the request.
- Do not add a framework, dependency, design system, global skill, or external service without explicit approval.
- Do not move the repository, delete source assets, or add raw PDFs, InDesign files, Rhino files, GIS exports, or scans.
- Do not commit, push, deploy, or publish without explicit authorization.

## Verification

For implementation work:

1. Run the documented build.
2. Run `git diff --check`.
3. Inspect the rendered site at desktop, 768 px tablet, and 390 px phone widths.
4. Check navigation, language states, mobile menu, project expansion, accessibility labels, image loading, console errors, and horizontal overflow.
5. Report changed files, verification results, and remaining uncertainty.
