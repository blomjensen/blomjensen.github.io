# Project Handoff

Generated: 2026-07-04 22:07 CEST

This file is the canonical latest handoff for the portfolio repo. If it already exists in a future session, archive the older version first as `PROJECT_HANDOFF_YYYYMMDD_HHMM.md`, then write the new latest context back to `PROJECT_HANDOFF.md`.

## Current Project Goal

Build and improve Bjorn Blom-Jensen's landscape architecture portfolio website for job applications after graduating from AHO in 2026.

The website repo should live here:

`/Users/bjornblomjensen/Developer/bjorn-portfolio`

The GitHub remote is:

`https://github.com/blomjensen/blomjensen.github.io.git`

Obsidian is only the control center for notes, prompts, audits, project text, and links. The iCloud portfolio folder is only the source-material and asset folder, not the code workspace:

`/Users/bjornblomjensen/Library/Mobile Documents/com~apple~CloudDocs/01_Eget arbeid/02_Skole/Portfolio`

Copy only selected optimized web assets into the repo when needed.

## Current Design Direction

The user wants a total UI/UX redesign inspired by:

- `https://www.behance.net/gallery/227273007/LCLA-Architects-Studio-website-redesign-concept-`
- `https://larshovland.com/`

The implemented direction is a sparse editorial architecture portfolio:

- off-white/white canvas
- fixed minimal navigation
- large typographic first viewport
- project metadata lines
- image-led case-study rhythm
- project archive/index rather than card grid
- inline expandable project case studies instead of modal windows
- direct contact links instead of a form
- mobile menu and responsive editorial stacking

Do not copy either reference directly. Treat them as direction for pacing, restraint, typography, whitespace, and case-study structure.

## Files Changed So Far

Content/setup changes:

- `README.md`
- `START_HERE_commands.txt`
- `index.html`
- `src/content.ts`
- `src/data/projects.ts`

Design/UI changes:

- `src/App.tsx`
- `src/components/Navigation.tsx`
- `src/components/Hero.tsx`
- `src/components/Portfolio.tsx`
- `src/components/About.tsx`
- `src/components/Contact.tsx`
- `src/custom.css`

Current Git state before this handoff was created:

- 12 modified files from the content patch and redesign
- no commit made yet
- no push made yet

## Important Decisions

- Keep the portfolio repo outside Obsidian.
- Keep raw/source assets in iCloud, not in the repo.
- Use `public/projects/...` only for optimized web-ready portfolio images.
- Keep multilingual English/Norwegian support.
- Remove the previous dark/glass/app-like design direction from active components.
- Remove the modal project viewer as the main UX pattern.
- Keep the site simple: React + Vite, no new frontend framework added.
- Use existing project data and images for now.
- Keep GitHub Pages as the canonical deploy target. Netlify config, if present, is secondary/legacy.

## What Is Working

Verified after redesign:

- `npm run build` passes.
- `git diff --check` passes.
- Desktop preview renders the new white editorial design.
- Mobile preview renders without horizontal overflow.
- Project rows expand inline.
- Switching the open project works.
- Mobile menu opens correctly.
- Current correct preview server is running at:

`http://127.0.0.1:3001/`

The old/stale preview was visible on:

`http://127.0.0.1:3000/`

Use port `3001` unless the stale server has been stopped.

## What Is Unfinished

- The redesign is functional but still first-pass.
- No commit has been made.
- No deployment/push has been done.
- No final visual polish pass has been done after user review.
- Only three projects are currently represented in `src/data/projects.ts`.
- Some images are placeholders/reused from existing assets and may need replacement with final optimized exports.
- The old `ThemeContext` and `useReducedEffects` files still exist but are no longer used by active components.
- `src/index.css` is generated Tailwind output and still contains old utility classes; active design is controlled mainly by `src/custom.css`.
- Contact text and project copy are improved, but not final application-grade writing yet.

## Exact Next Steps

1. Ask the user to review the live preview at `http://127.0.0.1:3001/`.
2. Confirm the high-level design direction before polishing details.
3. Stop or ignore the stale server on port `3000`; continue using `3001` for this preview.
4. Make a visual polish pass:
   - adjust hero image crop/selection
   - tune heading sizes and spacing
   - refine project detail image layout
   - check About and Contact below the fold
   - improve Norwegian text where needed
5. Replace or add final web-optimized assets from the iCloud source-material folder.
6. Add more projects or project metadata if the user wants a fuller portfolio.
7. Re-run:
   - `npm run build`
   - `git diff --check`
   - browser preview desktop/mobile checks
8. Review `git diff` with the user.
9. Commit only after the user approves the direction.
10. Push/deploy only after commit approval.

## Warnings And Fragile Parts

- Port `3000` may still be serving an older stale version. Do not judge the redesign from that port unless it has been restarted from this repo.
- The Vite config has `open: true`; use `npm run dev -- --host 127.0.0.1 --port 3001 --strictPort --open false` to avoid browser confusion.
- The project currently has no test suite. Verification is build + manual browser checks.
- The repo had earlier `npm audit` advisories involving frontend dependencies. Do not treat dependency security as fully cleaned up yet.
- Do not move the repo, delete source assets, or copy large raw files into the repo without asking the user.
- Be careful with user changes in the worktree. There are already uncommitted edits from the current redesign.
- If adding assets, keep filenames web-safe and optimized; avoid committing raw PDFs, InDesign files, Rhino files, GIS exports, or scans.
- If cleaning unused code, check imports first. `ThemeContext` may be removable, but only after confirming no active component uses it.
- Keep accessibility in mind: project summary buttons already use `aria-expanded`; preserve that if refactoring.
