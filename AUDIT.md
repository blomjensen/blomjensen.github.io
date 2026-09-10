# Kodeaudit — bjorn-portfolio

**Repo:** `~/Developer/bjorn-portfolio` → `github.com/blomjensen/blomjensen.github.io` → `blomjensen.no`
**Revisjon:** `161f57a` på `main`, **skittent arbeidstre** (16 endrede + 9 nye filer)
**Dato:** 10. september 2026
**Metode:** kun lesing. Ingen filer i repoet er endret, flyttet eller slettet.

Hver linje er merket **FAKTA** (verifisert i repoet) eller **ANTAKELSE** (utledet).
Se «Ikke verifisert» nederst — to ting kunne ikke sjekkes fordi npm-registeret er blokkert
fra begge miljøene jeg har tilgang til.

---

## 0. Inventar

| | |
|---|---|
| Type | Vite 6.3.5 + React 18.3.1, TypeScript-kildekode, SPA med to entry points (`index.html`, `lab/index.html`) |
| Build | `vite build` → `build/`, `base` styrt av `VITE_BASE` (default `/`, riktig for user page) |
| Deploy | GitHub Actions → `actions/deploy-pages@v4`, trigger på push til `main` |
| Domene | `public/CNAME` = `blomjensen.no`, custom domain over GitHub Pages |
| Avhengigheter | 5 runtime (`react`, `react-dom`, `three` 0.178, `lucide-react`, `suncalc`), 2 dev |
| Node | 22 i CI, 22.23.2 lokalt — konsistent |
| Lint / typecheck / test | **Ingen.** Ingen `tsconfig.json`, ingen `typescript`-avhengighet, ingen linter, ingen tester |
| Kildekode | 3 575 linjer over 29 filer, tyngst `Portfolio.tsx` (850) og `projects.ts` (955) |
| `public/` | 141 filer, **136 MB** |
| `.git` | 130 MB på disk, 62,7 MiB pakket |
| Tredjeparts runtime | Umami analytics (`cloud.umami.is`), DRACO-dekoder (`cdn.jsdelivr.net`) |

---

## 1. Funn

| ID | Alv. | Område | Fil:linje | Hva som er galt | Hvorfor det betyr noe | Fiks | Risiko | Est. |
|---|---|---|---|---|---|---|---|---|
| S2-01 | S2 | Sikkerhet | `package.json:14` | Vite 6.3.5 rammes av CVE-2026-39363 (6.0.0–6.4.1). Vilkårlig fillesing via dev-serverens WebSocket, CVSS 8.2 | Gjelder **kun dev-server**, ikke produksjon. Men du kjører `npm run dev`; et ondsinnet nettsted du besøker samtidig kan lese filer fra maskinen | Oppgrader til `vite@^6.4.2` | lav | 10 |
| S2-02 | S2 | Korrekthet | `ProjectModelViewer.tsx:94-95, 116-117` | `SunCalc.getPosition()` returnerer azimut og høyde **i radianer**. Koden ganger med `Math.PI/180` som om de var grader | Solbanen i diplommodellen er feil med faktor ~57. Sola står praktisk talt fast like over horisonten uansett dato og klokkeslett — funksjonen ser ut til å virke, men viser ikke solforhold | Fjern grad→radian-konverteringen begge steder | lav | 15 |
| S2-03 | S2 | Ytelse | `Photography.tsx:315-324` | `transitions-2fps.mp4` (10,4 MB) ligger som `autoPlay` i en **sammenslått** listepost. `preload="metadata"` overstyres av `autoPlay` | Førstegangsbesøkende laster ~10 MB video de ikke har bedt om å se, før de har klikket noe. Dette dominerer sidevekten | Bytt til `poster` + `preload="none"`, start avspilling først når posten åpnes | lav | 30 |
| S2-04 | S2 | Build | hele repoet | Ingen typesjekk noe sted: ingen `tsconfig.json`, `typescript` står ikke i `devDependencies`, CI kjører bare `vite build`. Vite/SWC **stripper** typer uten å sjekke dem | Typefeil når produksjon uten at noe stopper dem. Dette er også grunnen til at feil av S2-02-typen overlever | Legg til `typescript` + `tsconfig.json`, `"typecheck": "tsc --noEmit"`, kjør den i workflowen før build | lav | 45 |
| S2-05 | S2 | Korrekthet | `App.tsx:87, 121, 145` | `querySelector('#' + sectionId)` med `sectionId` fra `location.hash.slice(1)` | `blomjensen.no/#1` eller en hash med mellomrom gir `SyntaxError` og dreper popstate-handleren — resten av navigasjonen slutter å virke i den økten | Bruk `getElementById(sectionId)` | lav | 5 |
| S3-01 | S3 | Deploy | `public/` | 49 av 141 filer (**76,2 MB av 136 MB**) refereres ikke fra noen kildefil | Over halvparten av det som lastes opp til Pages ved hver deploy er dødvekt. Verstingene: `rockfall_gallery/01_plan.png` 24,7 MB, `ferry_station/1_5000 støer og annet.jpeg` 9,5 MB (+ .webp 7,6 MB), `transitions-4fps.mp4` 6,5 MB | Se «Om de 76 MB» under tabellen — ikke slett blindt | **middels** | 60 |
| S3-02 | S3 | Ytelse | `Portfolio.tsx:661, 763` | Alle bilder i karuseller og bilderader har `loading="eager"` | Når du åpner ett prosjekt lastes hvert bilde i alle rader samtidig, også de utenfor skjermen. Bildene ligger på 0,5–1 MB | `loading="lazy"` på alt utenom det første | lav | 10 |
| S3-03 | S3 | Ytelse | alle `<img>` i `src/` | Ingen `width`/`height` | Layoutet hopper mens bildene lastes (CLS). Merkbart i karusellene | Legg på intrinsiske dimensjoner | lav | 40 |
| S3-04 | S3 | Robusthet | `main.tsx`, `App.tsx` | Ingen error boundary | Én kastet feil i én komponent gir **blank side** — `#root` blir tom, ingen feilmelding | Error boundary rundt `<AppContent />` med en lesbar fallback | lav | 20 |
| S3-05 | S3 | Tilgjengelighet | `ProjectModelViewer.tsx:194` | `role="img"` på containeren som *inneholder* dato- og tidskontrollene | `role="img"` gjør alt innhold under usynlig for skjermlesere. Solbane-kontrollene blir uleselige og uklikkbare via hjelpemidler | Flytt `role="img"`/`aria-label` til canvas-elementet, la kontrollene ligge utenfor | lav | 15 |
| S3-06 | S3 | Tilgjengelighet | `Portfolio.tsx:797-847` | `role="dialog" aria-modal="true"` uten fokusfelle og uten å flytte fokus inn/ut | Tab går rett gjennom til siden bak mens galleriet er åpent; skjermlesere leser bakgrunnen | Flytt fokus til lukkeknappen ved åpning, fang Tab, returner fokus ved lukking | lav | 30 |
| S3-07 | S3 | Ytelse | `App.tsx:19-57, 152-166` | `CursorTrail` kjører `requestAnimationFrame` uavbrutt hele sidens levetid, også når pekeren aldri beveger seg og på touch-enheter. `wheel`-lytter på `window` med `{passive:false}` kaller `closest()` på hvert hjul-event | Konstant rAF er batteri- og CPU-bruk uten nytte; ikke-passiv wheel-lytter blokkerer scroll-optimalisering i nettleseren | Stopp rAF når pekeren er i ro / på `(pointer: coarse)`; flytt wheel-lytteren til nav-elementet | lav | 25 |
| S3-08 | S3 | Tilgjengelighet | `App.tsx:13-72` | `useReducedEffects`-hooken finnes, men **brukes ingen steder**. `prefers-reduced-motion` sjekkes i stedet inline fire ulike steder, og `CursorTrail` sjekker det ikke i det hele tatt | Brukere med redusert bevegelse får markørsporet uansett. Logikken har drevet fra hverandre | Ta i bruk hooken, eller slett den og gjør inline-sjekkene konsistente | lav | 20 |
| S3-09 | S3 | Sikkerhet | `ProjectModelViewer.tsx:70` | DRACO-dekoderen hentes fra `cdn.jsdelivr.net` ved kjøring, uten SRI | Modellvisningen slutter å virke hvis jsDelivr er nede eller blokkert. Tredjepartskode uten integritetssjekk i en ellers selvhostet side | Kopier dekoderen fra `node_modules/three/examples/jsm/libs/draco/` til `public/` og pek dit | lav | 15 |
| S3-10 | S3 | Innhold | `Photography.tsx:173-182, 383-385` | 8 hardkodede bildestier i komponenten pares **indeksbasert** med `c.aquateketImages` i `content.ts`. Ingen guard | I dag er begge 8 lange (verifisert), så det virker. Fjerner du ett tekstobjekt kaster `image.label.split()` og hele siden blir blank (jf. S3-04) | Flytt stiene inn i `content.ts` sammen med tekstene, eller legg inn en guard | lav | 20 |
| S3-11 | S3 | Publisering | `public/tests/` | `blomjensen.no/tests/diplom-model.html` er **live** (verifisert med HTTP-kall) og indekserbar. `nederste-del-test.glb` (2,0 MB) er ubrukt. **Rettelse:** `diplom-modell-test.glb` (4,1 MB) er derimot i bruk — `projects.ts:92` | En testside er ute i produksjon på ditt eget domene, uten `noindex` | Flytt ut av `public/`, eller legg `noindex` + `Disallow` i robots.txt | lav | 10 |
| S4-01 | S4 | Død kode | `src/contexts/ThemeContext.tsx` | Hele filen er ubrukt — ingen importerer `ThemeProvider` eller `useTheme`. `App.tsx` har sin egen tema-state, mot **samme** `localStorage['theme']`-nøkkel | Duplisert temalogikk. Hvis noen tar providern i bruk senere, kolliderer de to | Slett filen | lav | 5 |
| S4-02 | S4 | Død kode | `src/assets/` | 5 av 7 filer importeres ikke: `e36c9927…webp` (905 KB), `hero-666aaa-1116.webp` (473 KB), `e6814993…webp` (452 KB), `2e07276d…webp` (296 KB), `8636c894…webp` (130 KB) — **2,2 MB** | Havner ikke i bundelen (Vite tar bare det som importeres), men ligger i git og gjør `src/` uleselig | Slett, eller flytt til et arkiv utenfor repoet | lav | 10 |
| S4-03 | S4 | Config | `netlify.toml` | Beskriver en Netlify-deploy som ikke brukes. `[[redirects]] /* → /index.html` ville dessuten **overstyre** `/lab/` og gjøre lab-siden utilgjengelig hvis den noen gang tas i bruk | To motstridende deploy-historier i repoet. Fella er innebygd | Slett filen, eller legg inn et unntak for `/lab/*` og dokumenter hvorfor den finnes | lav | 5 |
| S4-04 | S4 | Deploy | mangler | Ingen `public/404.html` | GitHub Pages viser sin egen generiske 404 på feilstavede URL-er | Legg til en enkel 404-side i din typografi | lav | 20 |
| S4-05 | S4 | i18n | `Navigation.tsx:101-102, 115, 82, 120` | `aria-label`/`title` på temaknappen er hardkodet norsk («Aktiver mørkmodus») også når siden står på engelsk. Samme for `sr-only` «Menu» og `aria-label="Primary navigation"` | Skjermleserbrukere i engelsk modus får norsk | Legg dem i `content.ts` som resten | lav | 15 |
| S4-06 | S4 | Analyse | `lab/index.html` | Umami-scriptet står i `index.html`, men **ikke** i `lab/index.html` | All trafikk på `/lab/` er usporet. Tallene dine er ufullstendige uten at noe indikerer det | Legg scriptet inn i begge entry points | lav | 5 |
| S4-07 | S4 | CI | `.github/workflows/deploy.yml:10-13, 22-25` | `pages: write` og `id-token: write` er gitt på toppnivå, altså også til `build`-jobben som ikke trenger dem. Actions er pinnet til tag (`@v4`), ikke SHA | Bredere rettigheter enn nødvendig i jobben som kjører tredjepartskode (`npm ci`). Tag-pinning betyr at innholdet kan endres under deg | Flytt `pages`/`id-token` til `deploy`-jobben; pin actions til commit-SHA | lav | 15 |
| S4-08 | S4 | Repo | `.gitignore` | `.agents/` (vendored skill-verktøy, ~hundrevis av filer) er hverken sporet eller ignorert | Én `git add -A` og hele verktøykassen ligger i historikken | Legg `.agents/` i `.gitignore` hvis den ikke skal versjoneres | lav | 2 |
| S4-09 | S4 | Repo | git-historikk | 62,7 MiB pakket. De største blobene er de samme mediefilene som S3-01 — de blir liggende i historikken selv om du sletter dem nå | Hver `git clone` drar ned 60+ MB. Ikke kritisk, men det vokser | Se HISTORIKK nederst. Gjør det manuelt, ikke automatisk | **høy** | 60 |
| S4-10 | S4 | Repo | arbeidstre | 16 endrede + 9 nye filer ucommittet, inkludert `projects.ts`, `App.tsx`, `vite.config.ts` | Det som ligger live er ikke det du har lokalt. Vanskelig å si hva som faktisk er testet | Commit eller forkast før noe annet gjøres | lav | — |

---

### Om de 76 MB (S3-01)

Ikke slett listen ukritisk. Den deler seg i tre:

1. **Trygt å fjerne — erstattet av .webp:** `rockfall_gallery/01_plan.png` (24,7 MB) og `03_model.png` (8,2 MB) finnes begge også som `.webp` i samme mappe, og ingen av variantene refereres. `ferry_station/1_5000 støer og annet.jpeg` (9,5 MB) og `.webp` (7,6 MB) — heller ikke referert. `transitions-4fps.mp4` (6,5 MB) er den ene av tre fps-varianter som ikke brukes. ≈ 56 MB.
2. **Testmateriale:** `public/tests/diplom-model.html` og `nederste-del-test.glb` (2,0 MB), jf. S3-11. **Ikke** `diplom-modell-test.glb` — den er i bruk.
3. **Sannsynlig arbeid underveis:** flere av de urefererte `.webp`-filene er blant de **usporede** filene i arbeidstreet (`edge-landscape/01-rain-path-collage.webp`, `aho-models/drone.webp` m.fl.). Det ser ut som bilder du nettopp har lagt inn og ennå ikke koblet til `projects.ts`. **ANTAKELSE** — bekreft før du rører dem.

Filnavnet `1_5000 støer og annet.jpeg` inneholder mellomrom og `ø`. Det virker i dag fordi ingenting lenker til det, men blir en URL-kodingsfelle hvis du tar det i bruk.

---

## 2. Verifisert friskt

Dette ble aktivt sjekket og var i orden:

- **Ingen hemmeligheter.** Verken i arbeidstreet eller i git-historikken (`git log -p` over alle commits, mønstre for API-nøkler, tokens, private nøkler, `.env`). Treffene som dukket opp lå i `.agents/`-verktøyet og var ordtreff i prosatekst, ikke nøkler.
- **Ingenting feilsporet i git:** ingen `node_modules`, ingen `build/`, ingen `.env`, ingen `.DS_Store` i indeksen.
- **`.DS_Store` publiseres ikke.** `blomjensen.no/.DS_Store` gir 404 — Vite kopierer ikke dotfiler fra `public/`. (Jeg sjekket fordi det ellers lekker mappeinnhold.)
- **Ingen brutte assetreferanser.** Alle 92 stier som refereres fra kode finnes på disk.
- **Ingen `innerHTML`, `dangerouslySetInnerHTML`, `eval` eller `document.write`.**
- **Alle eksterne lenker** har `rel="noopener noreferrer"` (`Hero.tsx:127`, `Contact.tsx:98`).
- **Lyttere er balansert:** 13 `addEventListener` mot 13 `removeEventListener`, alle med opprydding i cleanup.
- **Three.js ryddes opp riktig** ved unmount — geometri, materialer, teksturer, renderer og `setAnimationLoop(null)` (`ProjectModelViewer.tsx:164-190`).
- **CNAME, robots.txt, sitemap.xml og canonical** peker konsistent på `blomjensen.no`.
- **Workflow-rettigheter er ikke `write-all`**, ingen `pull_request_target`, ingen `${{ github.event.* }}` i `run:`-blokker.
- **`base`-oppsettet er riktig** for user page — ingen fare for asset-404 i produksjon fra den kanten.
- **Aquateket-koblingen er i synk i dag:** 8 stier mot 8 tekstobjekter i begge språk.

---

## 3. Ikke verifisert

- **Produksjonsbygg og bundelstørrelser.** `npm ci` feiler i begge miljøene jeg har — `registry.npmjs.org` er utenfor egress-listen (403, `host_not_allowed`). Jeg har derfor **ikke** tall på hvor stor JS-bundelen blir med `three` + `lucide-react`. **ANTAKELSE:** three.js er den klart tyngste avhengigheten og lastes på forsiden selv om modellvisningen bare brukes inne i ett prosjekt — sjekk om den kan lastes med `React.lazy`. Kjør selv: `npm run build` og se på `build/assets/*.js`.
- **`npm audit`.** Samme årsak. S2-01 er funnet ved å slå opp Vite-versjonen mot GitHub Advisory Database, ikke ved å kjøre audit. Kjør `npm audit` lokalt for full oversikt.
- **Runtime-feil i nettleseren.** Jeg har ikke åpnet siden i en browser med konsollen på — ingen av funnene over bygger på observert konsoll-output.
- **Visuell og responsiv sjekk.** Ikke gjort.

---

## 4. Anbefalt rekkefølge

**Batch 1 — rydd grunnen (gjør dette først)**
S4-10 (commit/forkast arbeidstreet) → S2-04 (typecheck + lint i CI) → S2-01 (vite ≥ 6.4.2).
Etter dette har du et sikkerhetsnett før du endrer kode.

**Batch 2 — feil som gir feil resultat**
S2-02 (solvinkelen), S2-05 (hash-krasjet), S3-04 (error boundary), S3-10 (aquateket-koblingen).

**Batch 3 — vekt**
S2-03 (10 MB-videoen), S3-02 (`loading`), S3-01 punkt 1 og 2 (de ~62 trygge MB), S3-11 (testsiden ut).
Mål sidevekten før og etter, ellers vet du ikke om det virket.

**Batch 4 — tilgjengelighet og finpuss**
S3-03, S3-05, S3-06, S3-07, S3-08, S3-09, S4-01 til S4-08.

**Ikke automatiser:** S4-09. Å skrive om git-historikken endrer alle commit-SHA-er, krever `--force` mot `main` og kan ikke angres uten backup. Gjør det som en egen, bevisst operasjon etter at du har en kopi av repoet — og bare hvis klonestørrelsen faktisk plager deg.
