export type LocalizedText = {
  en: string;
  no: string;
};

export type ProjectImage = {
  src: string;
  caption?: LocalizedText;
  fit?: 'cover' | 'contain' | 'dark-contain';
};

export type ProjectImageRow = {
  columns?: 1 | 2 | 3 | 4;
  compact?: boolean;
  naturalAspect?: boolean;
  matchHorizontalHeight?: boolean;
  uniformAspect?: 'portrait';
  images: ProjectImage[];
};

export type ProjectVideo = {
  src: string;
  poster?: string;
  caption?: LocalizedText;
};

export type ProjectFact = {
  label: LocalizedText;
  value: LocalizedText;
};

export type Project = {
  id: number;
  title: LocalizedText;
  category: LocalizedText;
  description: LocalizedText;
  fullDescription: LocalizedText;
  facts: ProjectFact[];
  images: ProjectImage[];
  video?: ProjectVideo;
  processImages?: ProjectImage[];
  imageRows?: ProjectImageRow[];
};

export const projects: Project[] = [
  {
    id: 1,
    title: { en: 'Impermanence & Maintenance', no: 'Impermanence & Maintenance' },
    category: { en: 'Diploma project, AHO, Spring 2026', no: 'Diplomprosjekt, AHO, vår 2026' },
    description: {
      en: 'A calibrated road-protection infrastructure between mountain, water, risk, and seasonal maintenance at Kjenesskreda.',
      no: 'En kalibrert rassikringsinfrastruktur mellom fjell, vann, risiko og sesongbasert vedlikehold ved Kjenesskreda.',
    },
    fullDescription: {
      en: 'At Kjenesskreda near Balestrand, FV55 occupies a narrow threshold between mountain and water, movement and settlement, risk and view. The project asks how the existing road can become a more precise and perceptible form of protection. Through terrain mapping, point clouds, digital simulations, and 1:200 physical models, snow, water, debris, and runoff are studied as recurring landscape processes. Modular walls, a protective gallery, and an avalanche dam slow, redirect, and collect material while making the work of maintenance visible. Developed with Trong Le and supervised by Luis Callejas.',
      no: 'Ved Kjenesskreda nær Balestrand ligger FV55 i en smal terskel mellom fjell og vann, bevegelse og bosetting, risiko og utsikt. Prosjektet undersøker hvordan den eksisterende veien kan bli en mer presis og lesbar form for sikring. Gjennom terrengkartlegging, punktskyer, digitale simuleringer og fysiske modeller i 1:200 studeres snø, vann, løsmasser og avrenning som tilbakevendende landskapsprosesser. Modulære vegger, en beskyttende skredgalleri-konstruksjon og en skredvoll bremser, leder og samler materialer, samtidig som vedlikeholdsarbeidet blir synlig. Utviklet med Trong Le og veiledet av Luis Callejas.',
    },
    facts: [
      { label: { en: 'Period', no: 'Periode' }, value: { en: 'Spring 2026', no: 'Vår 2026' } },
      {
        label: { en: 'Course', no: 'Kurs' },
        value: { en: '12.803. Diploma Landscape Architecture', no: '12.803. Diplom landskapsarkitektur' },
      },
      {
        label: { en: 'Site', no: 'Sted' },
        value: { en: 'Kjenesskreda, Esefjorden / FV55', no: 'Kjenesskreda, Esefjorden / FV55' },
      },
      { label: { en: 'Team', no: 'Team' }, value: { en: 'With Trong Le', no: 'Med Trong Le' } },
      { label: { en: 'Supervisor', no: 'Veileder' }, value: { en: 'Luis Callejas', no: 'Luis Callejas' } },
    ],
    video: {
      src: '/projects/impermanence-maintenance/aho-models/working-model.mp4',
      poster: '/projects/impermanence-maintenance/aho-models/working-model-poster.webp',
      caption: {
        en: 'Working model in 1:200 tests the relationship between terrain, protection, and material movement.',
        no: 'Arbeidsmodell i 1:200 tester forholdet mellom terreng, sikring og materialbevegelse.',
      },
    },
    images: [
      {
        src: '/projects/impermanence-maintenance/00-point-cloud-aho.webp',
        caption: {
          en: 'Point-cloud terrain study reads the avalanche path, road, and fjord edge as one exposed threshold.',
          no: 'Punktsky-studien leser skredløpet, veien og fjordkanten som én eksponert terskel.',
        },
      },
      {
        src: '/projects/impermanence-maintenance/10-plan-aho.webp',
        caption: {
          en: 'Plan drawing develops a calibrated sequence of road protection along the edge of Esefjorden.',
          no: 'Planen utvikler en kalibrert sekvens av rassikring langs kanten av Esefjorden.',
        },
        fit: 'contain',
      },
      {
        src: '/projects/impermanence-maintenance/11-model-bw-aho.webp',
        caption: {
          en: 'A black-and-white model study tests modular protection between the road and the moving slope.',
          no: 'Et svart-hvitt modellstudie tester modulær sikring mellom veien og den bevegelige skråningen.',
        },
      },
      {
        src: '/projects/impermanence-maintenance/12-drone-aho.webp',
        caption: {
          en: 'Aerial view situates the exposed road between the avalanche slope and the fjord.',
          no: 'Dronebildet plasserer den utsatte veien mellom skredskråningen og fjorden.',
        },
      },
      {
        src: '/projects/impermanence-maintenance/13-maintenance-model-aho.webp',
        caption: {
          en: 'The working model makes the relationship between protection, material movement, and maintenance tangible.',
          no: 'Arbeidsmodellen konkretiserer forholdet mellom sikring, materialbevegelse og vedlikehold.',
        },
      },
      {
        src: '/projects/impermanence-maintenance/05-gallery-detail.webp',
        caption: {
          en: 'Model detail studies the transition between open road, gallery structure, and moving ground.',
          no: 'Modelldetaljen undersøker overgangen mellom åpen vei, gallerikonstruksjon og bevegelig terreng.',
        },
      },
      {
        src: '/projects/impermanence-maintenance/06-gallery-luis.webp',
        caption: {
          en: 'A close model view reveals how the gallery structure meets unstable terrain and the waterline.',
          no: 'Et nært modellbilde viser hvordan gallerikonstruksjonen møter ustabilt terreng og vannlinjen.',
        },
      },
    ],
    processImages: [
      {
        src: '/projects/impermanence-maintenance/process-01-risk-map.webp',
        caption: {
          en: 'A national terrain map situates Kjenesskreda within Norway\'s wider distribution of avalanche hazard points.',
          no: 'Et nasjonalt terrengkart plasserer Kjenesskreda i den bredere fordelingen av skredutsatte punkter i Norge.',
        },
        fit: 'contain',
      },
      {
        src: '/projects/impermanence-maintenance/process-02-terrain-reading.webp',
        caption: {
          en: 'A wide terrain study uses elevation data to read how road infrastructure follows steep fjord topography.',
          no: 'En bred terrengstudie bruker høydedata til å lese hvordan veiinfrastrukturen følger den bratte fjordtopografien.',
        },
        fit: 'contain',
      },
    ],
    imageRows: [
      {
        columns: 3,
        compact: true,
        naturalAspect: true,
        images: [
          {
            src: '/projects/impermanence-maintenance/07-cc-bottom.webp',
            caption: {
              en: 'Computational terrain study: lower slope view.',
              no: 'Beregnet terrengstudie: nedre skråningsperspektiv.',
            },
          },
          {
            src: '/projects/impermanence-maintenance/08-cc-top.webp',
            caption: {
              en: 'Computational terrain study: top view.',
              no: 'Beregnet terrengstudie: topperspektiv.',
            },
          },
          {
            src: '/projects/impermanence-maintenance/09-cc-side.webp',
            caption: {
              en: 'Computational terrain study: side view.',
              no: 'Beregnet terrengstudie: sideperspektiv.',
            },
          },
        ],
      },
      {
        columns: 2,
        images: [
          {
            src: '/projects/impermanence-maintenance/aho-models/model-detail.webp',
            caption: {
              en: 'Close study of the gallery structure and its repeated supports.',
              no: 'Nærstudie av gallerikonstruksjonen og de gjentatte støttene.',
            },
          },
          {
            src: '/projects/impermanence-maintenance/aho-models/model-wide.webp',
            caption: {
              en: 'The road edge is tested as a continuous protective landscape.',
              no: 'Veikanten testes som et sammenhengende beskyttende landskap.',
            },
          },
          {
            src: '/projects/impermanence-maintenance/aho-models/model-aerial.webp',
            caption: {
              en: 'Aerial model view reads the intervention across slope and shoreline.',
              no: 'Et oversiktsbilde av modellen leser inngrepet på tvers av skråning og strandlinje.',
            },
          },
          {
            src: '/projects/impermanence-maintenance/aho-models/model-outside.webp',
            caption: {
              en: 'The model places the infrastructure between the studio and the fjord landscape.',
              no: 'Modellen plasserer infrastrukturen mellom studioet og fjordlandskapet.',
            },
          },
        ],
      },
    ],
  },

  {
    id: 2,
    title: { en: 'The Road', no: 'The Road' },
    category: { en: 'AHO studio, Autumn 2025', no: 'AHO-studio, høst 2025' },
    description: {
      en: 'A pair project on roadside protection, terrain, and movement at Lonavatnet along Rv13.',
      no: 'Et parprosjekt om veisikring, terreng og bevegelse ved Lonavatnet langs Rv13.',
    },
    fullDescription: {
      en: 'Developed in the course The Road (60.540), the project treats roads and their material, ecological, and social systems as constructed landscapes. At Lonavatnet along Rv13, the pair project uses high-resolution site mapping and physical models to study a sequence of protective structures across a steep roadside condition. Developed with Trong Le.',
      no: 'Prosjektet ble utviklet i kurset The Road (60.540) og behandler veier og deres materielle, økologiske og sosiale systemer som konstruerte landskap. Ved Lonavatnet langs Rv13 bruker parprosjektet detaljert stedskartlegging og fysiske modeller til å undersøke en sekvens av sikringskonstruksjoner i en bratt veisituasjon. Utviklet med Trong Le.',
    },
    facts: [
      { label: { en: 'Period', no: 'Periode' }, value: { en: 'Autumn 2025', no: 'Høst 2025' } },
      { label: { en: 'Course', no: 'Kurs' }, value: { en: '60.540. The Road', no: '60.540. The Road' } },
      { label: { en: 'Site', no: 'Sted' }, value: { en: 'Lonavatnet / Rv13, Norway', no: 'Lonavatnet / Rv13, Norge' } },
      { label: { en: 'Team', no: 'Team' }, value: { en: 'Pair project with Trong Le', no: 'Parprosjekt med Trong Le' } },
    ],
    images: [
      {
        src: '/projects/the_road/01_model_overview.webp',
        caption: {
          en: 'Physical model tests a sequence of protective structures between the steep slope and road corridor.',
          no: 'Den fysiske modellen tester en sekvens av sikringskonstruksjoner mellom den bratte fjellsiden og veikorridoren.',
        },
      },
      {
        src: '/projects/the_road/02_map.webp',
        caption: {
          en: 'The 1:10,000 site map locates the intervention along Rv13 between Lonavatnet and Botnen.',
          no: 'Stedskartet i 1:10 000 lokaliserer inngrepet langs Rv13 mellom Lonavatnet og Botnen.',
        },
        fit: 'contain',
      },
      {
        src: '/projects/the_road/04_render.webp',
        caption: {
          en: 'Atmospheric study reads the road sequence under low light and steep terrain exposure.',
          no: 'Atmosfærestudien leser veisekvensen i lavt lys og eksponert, bratt terreng.',
        },
      },
    ],
    processImages: [
      {
        src: '/projects/the_road/process_01_study.webp',
        caption: {
          en: 'Overhead model compares the spacing, reach, and transitions of the protective elements.',
          no: 'Modellen sett ovenfra sammenligner avstand, rekkevidde og overganger mellom sikringselementene.',
        },
      },
      {
        src: '/projects/the_road/01_model_detail.webp',
        caption: {
          en: 'Close model view studies the junction between mesh structure, terrain, and road edge.',
          no: 'Nærstudiet undersøker møtet mellom nettkonstruksjon, terreng og veikant.',
        },
      },
    ],
  },

  {
    id: 3,
    title: { en: 'Borgeskogen', no: 'Borgeskogen' },
    category: { en: 'AHO studio, Spring 2025', no: 'AHO-studio, vår 2025' },
    description: {
      en: 'A collaborative landscape study of terrain, water, and everyday access at Borgeskogen.',
      no: 'En samarbeidsstudie av terreng, vann og hverdagsadkomst i Borgeskogen.',
    },
    fullDescription: {
      en: 'Developed in the course Systems: Hydropolis (60.619), the project moves between territorial reading and close-range spatial detail at Borgeskogen. Relief mapping, eye-level model studies, and a 1:50 construction section test how ground, vegetation, drainage, local stone, and movement meet at the site. Developed with Dimitra.',
      no: 'Prosjektet ble utviklet i kurset Systemer: Hydropolis (60.619) og beveger seg mellom territoriell lesning og nærgående romlig detalj i Borgeskogen. Relieffkartlegging, modellstudier i øyehøyde og et konstruksjonssnitt i 1:50 tester hvordan terreng, vegetasjon, drenering, lokal stein og bevegelse møtes på stedet. Utviklet med Dimitra.',
    },
    facts: [
      { label: { en: 'Period', no: 'Periode' }, value: { en: '2025', no: '2025' } },
      {
        label: { en: 'Course', no: 'Kurs' },
        value: {
          en: '60.619. Systems: Hydropolis',
          no: '60.619. Systems: Hydropolis',
        },
      },
      { label: { en: 'Site', no: 'Sted' }, value: { en: 'Borgeskogen, Norway', no: 'Borgeskogen, Norge' } },
      { label: { en: 'Team', no: 'Team' }, value: { en: 'With Dimitra', no: 'Med Dimitra' } },
      {
        label: { en: 'Methods', no: 'Metoder' },
        value: { en: 'Terrain mapping, physical model, 1:50 section', no: 'Terrengkartlegging, fysisk modell, snitt 1:50' },
      },
    ],
    images: [
      {
        src: '/projects/borgeskogen/01_scene.webp',
        caption: {
          en: 'Eye-level model study tests vegetation, material edges, and movement through the site.',
          no: 'Modellstudiet i øyehøyde tester vegetasjon, materialkanter og bevegelse gjennom stedet.',
        },
      },
      {
        src: '/projects/borgeskogen/02_scapemap.webp',
        caption: {
          en: 'Relief-based scapemap makes the larger terrain structure and gradients legible.',
          no: 'Det relieffbaserte scapemapet synliggjør den større terrengstrukturen og gradientene.',
        },
        fit: 'contain',
      },
      {
        src: '/projects/borgeskogen/03_detail_section.webp',
        caption: {
          en: 'The 1:50 section coordinates local red granite, drainage layers, and birch, poplar, and rowan planting.',
          no: 'Snittet i 1:50 samordner lokal rød granitt, drenerende lag og planting av bjørk, poppel og rogn.',
        },
        fit: 'contain',
      },
    ],
    processImages: [
      {
        src: '/projects/borgeskogen/process_01_board.webp',
        caption: {
          en: 'Working board connects the regional aerial view to the project\'s drawn terrain structure.',
          no: 'Arbeidsplaten kobler det regionale flybildet til prosjektets tegnede terrengstruktur.',
        },
        fit: 'contain',
      },
    ],
  },

  {
    id: 4,
    title: { en: 'Røst', no: 'Røst' },
    category: {
      en: 'AHO studio, Spring 2023',
      no: 'AHO-studio, vår 2023',
    },
    description: {
      en: 'A layered reading of Røstlandet, its settlement structure, stone walls, and cultural landscape.',
      no: 'En lagdelt lesning av Røstlandet, bebyggelsesstrukturen, steinmurene og kulturlandskapet.',
    },
    fullDescription: {
      en: 'The project began in spring 2023 in the course Commons – Place and territories in the north (61.160), where Group C worked on Røstlandet and the pressure on bird-cliff and cultural landscapes. Bjørn continued the project independently in spring 2024. Layered mapping compares orthophoto, relief, settlement, and registered stone walls across scales to read how existing boundaries and everyday movement are shaped by terrain and water.',
      no: 'Prosjektet begynte våren 2023 i kurset Fellesrom – Sted og territorier i nord (61.160), der gruppe C arbeidet med Røstlandet og fuglefjellene og kulturlandskapet under press. Bjørn videreførte prosjektet selvstendig våren 2024. Lagdelt kartlegging sammenligner ortofoto, relieff, bebyggelse og registrerte steinmurer på tvers av skalaer for å lese hvordan eksisterende grenser og hverdagsbevegelse formes av terreng og vann.',
    },
    facts: [
      {
        label: { en: 'Period', no: 'Periode' },
        value: { en: 'Spring 2023 / continued spring 2024', no: 'Vår 2023 / videreført vår 2024' },
      },
      {
        label: { en: 'Course', no: 'Kurs' },
        value: {
          en: '61.160. Commons – Place and territories in the north',
          no: '61.160. Fellesrom – Sted og territorier i nord',
        },
      },
      { label: { en: 'Site', no: 'Sted' }, value: { en: 'Røstlandet, Røst', no: 'Røstlandet, Røst' } },
      {
        label: { en: 'Format', no: 'Format' },
        value: { en: 'Group C / independent continuation', no: 'Gruppe C / selvstendig videreføring' },
      },
    ],
    images: [
      {
        src: '/projects/rost/04-house-landscape.webp',
        caption: {
          en: 'A weathered house stands within Røstlandet’s low coastal terrain and open horizon.',
          no: 'Et værslitt hus står i Røstlandets lave kystterreng og åpne horisont.',
        },
      },
      {
        src: '/projects/rost/05-settlement-stone-walls.webp',
        caption: {
          en: 'Dry-stone walls structure the cultivated ground between Røst church and the surrounding settlement.',
          no: 'Tørrmurer strukturerer kulturlandskapet mellom Røst kirke og den omkringliggende bebyggelsen.',
        },
      },
      {
        src: '/projects/rost/06-stone-causeway.webp',
        caption: {
          en: 'A local stone causeway crosses shallow water and records an everyday landscape construction.',
          no: 'En lokal steinbygd spong krysser grunt vann og dokumenterer en hverdagslig landskapskonstruksjon.',
        },
      },
      {
        src: '/projects/rost/07-spatial-drawing.webp',
        caption: {
          en: 'A spatial drawing connects Røst church, wet ground, stone boundaries, and the low settlement horizon.',
          no: 'En romlig tegning kobler Røst kirke, våtmark, steingrenser og den lave bebyggelseshorisonten.',
        },
        fit: 'contain',
      },
      {
        src: '/projects/rost/08-terrain-model.webp',
        caption: {
          en: 'The terrain model makes the subtle relief, building clusters, and exposed coastal ground legible as one landscape.',
          no: 'Terrengmodellen gjør det svake relieffet, bygningsklyngene og det eksponerte kystterrenget lesbart som ett landskap.',
        },
        fit: 'contain',
      },
    ],
    imageRows: [
      {
        naturalAspect: true,
        images: [
          {
            src: '/projects/rost/09-settlement-change-analysis.webp',
            caption: {
              en: 'Settlement change is read as a sequence of named places along Røstlandet’s main route.',
              no: 'Bosettingsendringen leses som en sekvens av navngitte steder langs Røstlandets hovedforbindelse.',
            },
            fit: 'contain',
          },
          {
            src: '/projects/rost/10-site-plan-1-1000.webp',
            caption: {
              en: 'The 1:1000 site plan records buildings, terrain edges, paths, vegetation, and the coastal threshold at Hammer.',
              no: 'Situasjonsplanen i 1:1000 registrerer bebyggelse, terrengkanter, stier, vegetasjon og møtet med kysten ved Hammer.',
            },
            fit: 'contain',
          },
          {
            src: '/projects/rost/11-physical-model-overview.webp',
            caption: {
              en: 'The 1:1000 physical model translates subtle relief, settlement clusters, and cultivated ground into a shared terrain surface.',
              no: 'Den fysiske modellen i 1:1000 oversetter svakt relieff, bebyggelsesklynger og dyrket mark til en sammenhengende terrengflate.',
            },
          },
          {
            src: '/projects/rost/12-physical-model-detail.webp',
            caption: {
              en: 'Close model studies make the relationship between buildings, farm mounds, drainage lines, and exposed ground tangible.',
              no: 'Nærstudier av modellen synliggjør forholdet mellom bebyggelse, gårdshauger, dreneringslinjer og eksponert terreng.',
            },
          },
        ],
      },
    ],
  },

  {
    id: 5,
    title: { en: 'Edge Landscape', no: 'Edge Landscape' },
    category: { en: 'AHO studio, Autumn 2024', no: 'AHO-studio, høst 2024' },
    description: {
      en: 'A blue-green park system reconnecting forest edge, hidden streams, and post-war housing at Rødtvet.',
      no: 'Et blågrønt parksystem som kobler sammen skogkant, skjulte bekker og etterkrigsbebyggelse på Rødtvet.',
    },
    fullDescription: {
      en: '“Structure Spaces of Tomorrow” reads Rødtvet as a neighbourhood shaped by three overlapping histories: agricultural land, post-war housing expansion, and a contemporary multicultural community. Fieldwork and aerial mapping trace how forest edges, waterways, housing types, schools, routes, and transport barriers structure everyday life. The project proposes a connected sequence of rain paths, community gardens, planted edges, and shared spaces that brings the area’s rural traces and hidden water systems into a new public landscape. Developed with Maria Ólöf Sigurðardsdóttir.',
      no: '«Structure Spaces of Tomorrow» leser Rødtvet som et område formet av tre overlappende historier: jordbrukslandskapet, etterkrigstidens boligutbygging og dagens flerkulturelle nærmiljø. Feltarbeid og flyfotokartlegging følger hvordan skogkanter, vannløp, boligtyper, skoler, gangforbindelser og transportbarrierer strukturerer hverdagslivet. Prosjektet foreslår en sammenhengende sekvens av regnveier, felleshager, plantede kanter og felles møteplasser som kobler områdets landbruksspor og skjulte vannsystemer til et nytt offentlig landskap. Utviklet med Maria Ólöf Sigurðardsdóttir.',
    },
    facts: [
      { label: { en: 'Period', no: 'Periode' }, value: { en: 'Autumn 2024', no: 'Høst 2024' } },
      {
        label: { en: 'Course', no: 'Kurs' },
        value: {
          en: '60.526. AHO 2024 Edge Landscape: Innovative Park Systems in Contemporary Cities',
          no: '60.526. AHO 2024 Edge Landscape: Innovative Park Systems in Contemporary Cities',
        },
      },
      { label: { en: 'Site', no: 'Sted' }, value: { en: 'Rødtvet, Oslo', no: 'Rødtvet, Oslo' } },
      {
        label: { en: 'Team', no: 'Team' },
        value: { en: 'With Maria Ólöf Sigurðardsdóttir', no: 'Med Maria Ólöf Sigurðardsdóttir' },
      },
    ],
    images: [
      {
        src: '/projects/edge-landscape/01-structure-plan.webp',
        caption: {
          en: 'The overall plan links the forest edge, housing landscape, rain paths, and shared growing spaces.',
          no: 'Helhetsplanen kobler skogkanten, boliglandskapet, regnveier og felles dyrkingsarealer.',
        },
      },
      {
        src: '/projects/edge-landscape/04-community-garden.webp',
        caption: {
          en: 'A community garden connects everyday cultivation, open ground, and the surrounding housing landscape.',
          no: 'En felleshage kobler hverdagslig dyrking, åpent terreng og det omkringliggende boliglandskapet.',
        },
        fit: 'contain',
      },
      {
        src: '/projects/edge-landscape/05-existing-proposed-section.webp',
        caption: {
          en: 'The section tests how new paths and planted ground can mediate between housing, garages, and the slope.',
          no: 'Snittet tester hvordan nye stier og plantet terreng kan formidle mellom boligbebyggelse, garasjer og skråningen.',
        },
        fit: 'contain',
      },
    ],
    imageRows: [
      {
        columns: 3,
        naturalAspect: true,
        matchHorizontalHeight: true,
        images: [
          {
            src: '/projects/edge-landscape/06-field-study-01.webp',
            caption: {
              en: 'Field study 01 records the existing edge condition at Rødtvet.',
              no: 'Feltstudie 01 dokumenterer den eksisterende kantsonen på Rødtvet.',
            },
          },
          {
            src: '/projects/edge-landscape/07-field-study-02.webp',
            caption: {
              en: 'Field study 02 follows water, ground, and movement through Rødtvet.',
              no: 'Feltstudie 02 følger vann, terreng og bevegelse gjennom Rødtvet.',
            },
          },
          {
            src: '/projects/edge-landscape/08-field-study-03.webp',
            caption: {
              en: 'Field study 03 records the meeting between the housing landscape and forest edge.',
              no: 'Feltstudie 03 dokumenterer møtet mellom boliglandskapet og skogkanten.',
            },
          },
        ],
      },
      {
        naturalAspect: true,
        images: [
          {
            src: '/projects/edge-landscape/09-site-overview-research.webp',
            caption: {
              en: 'Site overview and research situate Rødtvet between Lillomarka, the housing landscape, and regional transport infrastructure.',
              no: 'Stedsoversikten plasserer Rødtvet mellom Lillomarka, boliglandskapet og den regionale transportinfrastrukturen.',
            },
            fit: 'contain',
          },
          {
            src: '/projects/edge-landscape/10-annotated-site-reading.webp',
            caption: {
              en: 'The annotated aerial photograph traces Vestveitbekken, local destinations, barriers, and everyday routes.',
              no: 'Det annoterte flyfotoet følger Vestveitbekken, lokale målpunkt, barrierer og hverdagsruter.',
            },
          },
          {
            src: '/projects/edge-landscape/11-settlement-structure.webp',
            caption: {
              en: 'A settlement reading distinguishes detached housing, small-house areas, and post-war apartment blocks.',
              no: 'Bebyggelsesanalysen skiller mellom eneboligområder, småhusbebyggelse og etterkrigstidens boligblokker.',
            },
          },
          {
            src: '/projects/edge-landscape/12-routes-community-structure.webp',
            caption: {
              en: 'Walking routes and schools reveal a connected social structure across the neighbourhood.',
              no: 'Ganglinjer og skoler synliggjør en sammenhengende sosial struktur på tvers av nærmiljøet.',
            },
          },
          {
            src: '/projects/edge-landscape/13-barriers-connections.webp',
            caption: {
              en: 'A barrier study identifies how vegetation, roads, and level changes limit visual and physical connections.',
              no: 'Barrierestudien viser hvordan vegetasjon, veier og nivåforskjeller begrenser visuelle og fysiske forbindelser.',
            },
          },
          {
            src: '/projects/edge-landscape/14-future-landscape-structure.webp',
            caption: {
              en: 'A conceptual overlay tests a continuous landscape structure across forest, housing, and the road edge.',
              no: 'Et konseptuelt lag tester en sammenhengende landskapsstruktur mellom skogen, boligområdene og veikanten.',
            },
          },
        ],
      },
    ],
  },

  {
    id: 7,
    title: { en: 'Design by Entropy', no: 'Design by Entropy' },
    category: { en: 'Pre-diploma, AHO, Autumn 2025', no: 'Prediplom, AHO, høst 2025' },
    description: {
      en: 'A pre-diploma study of material change, maintenance, and long-term park performance in Oslo.',
      no: 'En prediplomstudie av materialendring, drift og langvarig parkytelse i Oslo.',
    },
    fullDescription: {
      en: 'Design by Entropy investigates how landscape architects can treat material change as a design premise rather than a defect to be repaired. Through talks with Bymiljøetaten and Sagene district, review of Parkinstruks, and field surveys in Alexander Kiellands plass, Lakkegata Aktivitetspark, and Rudolf Nilsens plass, the project studies how weather, use, maintenance, and detailing shape long-term performance in Oslo parks. The work develops the Patina Card as a compact field tool and forms the conceptual groundwork for the diploma project.',
      no: 'Design by Entropy undersøker hvordan landskapsarkitekter kan behandle materialendring som et designpremiss i stedet for en feil som skal repareres. Gjennom samtaler med Bymiljøetaten og Bydel Sagene, lesning av Parkinstruks og feltstudier i Alexander Kiellands plass, Lakkegata Aktivitetspark og Rudolf Nilsens plass, undersøker prosjektet hvordan vær, bruk, drift og detaljering former langvarig ytelse i Oslos parker. Arbeidet utvikler Patina Card som et kompakt feltverktøy og danner det konseptuelle grunnlaget for diplomprosjektet.',
    },
    facts: [
      { label: { en: 'Period', no: 'Periode' }, value: { en: 'Autumn 2025', no: 'Høst 2025' } },
      {
        label: { en: 'Course', no: 'Kurs' },
        value: {
          en: '60.701. Pre-diploma for Urbanism and Landscape Architecture',
          no: '60.701. Prediplom for urbanisme og landskapsarkitektur',
        },
      },
      {
        label: { en: 'Cases', no: 'Case' },
        value: {
          en: 'Alexander Kiellands plass, Lakkegata Aktivitetspark, Rudolf Nilsens plass',
          no: 'Alexander Kiellands plass, Lakkegata Aktivitetspark, Rudolf Nilsens plass',
        },
      },
      {
        label: { en: 'Methods', no: 'Metoder' },
        value: {
          en: 'Interviews, field surveys, Patina Cards',
          no: 'Intervjuer, feltstudier, Patina Cards',
        },
      },
    ],
    images: [
      {
        src: '/projects/design-by-entropy/01-cover.webp',
        caption: {
          en: 'The cover frames weathered timber as the central material image for the study.',
          no: 'Forsiden rammer inn værslitt treverk som den sentrale materialfortellingen i studien.',
        },
      },
    ],
    imageRows: [
      {
        columns: 2,
        naturalAspect: true,
        images: [
          {
            src: '/projects/design-by-entropy/02-case-page.webp',
            caption: {
              en: 'A case page pairs park photography with the Patina Card sequence used in the fieldwork.',
              no: 'En caseside kobler parkfotografi med Patina Card-sekvensen som ble brukt i feltarbeidet.',
            },
          },
          {
            src: '/projects/design-by-entropy/03-patina-cards.webp',
            caption: {
              en: 'A comparative plate records recurring joints, edges, surfaces, and signs of wear across the parks.',
              no: 'En sammenlignende plate registrerer tilbakevendende fuger, kanter, overflater og spor av slitasje på tvers av parkene.',
            },
          },
        ],
      },
      {
        columns: 4,
        naturalAspect: true,
        uniformAspect: 'portrait',
        images: [
          {
            src: '/projects/design-by-entropy/04-detail-card.webp',
            caption: {
              en: 'AKP 01 - Granite fountain framing.',
              no: 'AKP 01 - Granittinnramming ved fontenen.',
            },
          },
          {
            src: '/projects/design-by-entropy/05-card-stone-feature.webp',
            caption: {
              en: 'AKP 02 - Stone feature and geomembrane liner.',
              no: 'AKP 02 - Steinelement og geomembran.',
            },
          },
          {
            src: '/projects/design-by-entropy/06-card-climbing-wall.webp',
            caption: {
              en: 'AKP 03 - Climbing wall.',
              no: 'AKP 03 - Klatrevegg.',
            },
          },
          {
            src: '/projects/design-by-entropy/07-card-colored-benches.webp',
            caption: {
              en: 'LAP 01 - Colored benches.',
              no: 'LAP 01 - Fargede benker.',
            },
          },
          {
            src: '/projects/design-by-entropy/08-card-lap-concrete-bench.webp',
            caption: {
              en: 'LAP 02 - Concrete bench.',
              no: 'LAP 02 - Betongbenk.',
            },
          },
          {
            src: '/projects/design-by-entropy/09-card-lap-climbing-wall.webp',
            caption: {
              en: 'LAP 03 - Concrete painted climbing wall.',
              no: 'LAP 03 - Klatrevegg i malt betong.',
            },
          },
          {
            src: '/projects/design-by-entropy/10-card-rnp-colored-benches.webp',
            caption: {
              en: 'RNP 01 - Colored concrete benches.',
              no: 'RNP 01 - Fargede betongbenker.',
            },
          },
          {
            src: '/projects/design-by-entropy/11-card-rnp-red-gravel.webp',
            caption: {
              en: 'RNP 02 - Red gravel.',
              no: 'RNP 02 - Rød grus.',
            },
          },
        ],
      },
    ],
  },

  {
    id: 6,
    title: { en: 'Perspective Engine', no: 'Perspective Engine' },
    category: { en: 'Decoding, Spring 2025', no: 'Decoding, vår 2025' },
    description: {
      en: 'A physical artefact testing how different forms of perception can be layered in space.',
      no: 'Et fysisk objekt som tester hvordan ulike former for persepsjon kan lagres lagvis i rommet.',
    },
    fullDescription: {
      en: 'Perspective Engine is a wood-and-acrylic artefact developed through a critical design dialogue with AI. Four laser-engraved panels overlap human, animal, artificial, and speculative viewpoints, making perception dependent on the viewer’s position. The process tested both the possibilities and limitations of allowing an AI system to influence design decisions, proportions, fabrication, and presentation.',
      no: 'Perspective Engine er et objekt i tre og akryl utviklet gjennom en kritisk designdialog med KI. Fire lasergraverte plater overlapper menneskelige, animalske, kunstige og spekulative perspektiver, slik at motivet avhenger av betrakterens posisjon. Prosessen undersøkte både mulighetene og begrensningene ved å la et KI-system påvirke designvalg, proporsjoner, fabrikasjon og presentasjon.',
    },
    facts: [
      { label: { en: 'Period', no: 'Periode' }, value: { en: 'Spring 2025', no: 'Vår 2025' } },
      { label: { en: 'Course', no: 'Kurs' }, value: { en: 'Decoding', no: 'Decoding' } },
      {
        label: { en: 'Format', no: 'Format' },
        value: { en: 'Independent physical artefact', no: 'Selvstendig fysisk objekt' },
      },
      {
        label: { en: 'Process', no: 'Prosess' },
        value: { en: 'AI-assisted design dialogue and fabrication', no: 'KI-støttet designdialog og fabrikasjon' },
      },
    ],
    images: [
      {
        src: '/projects/perspective-engine/01-artifact-oblique.webp',
        fit: 'dark-contain',
        caption: {
          en: 'The oblique view reveals how the engraved lines shift as four transparent panels overlap.',
          no: 'Det skrå blikket viser hvordan de graverte linjene forskyves når fire transparente plater overlapper.',
        },
      },
      {
        src: '/projects/perspective-engine/02-artifact-front.webp',
        fit: 'dark-contain',
        caption: {
          en: 'From the front, separate geometries align into a composite field of perception.',
          no: 'Sett forfra samles de separate geometriene i et sammensatt persepsjonsfelt.',
        },
      },
    ],
  },
];
