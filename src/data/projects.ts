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
  processImages?: ProjectImage[];
  imageRows?: ProjectImageRow[];
};

export const projects: Project[] = [
  {
    id: 1,
    title: { en: 'Impermanence & Maintenance', no: 'Impermanence & Maintenance' },
    category: { en: 'Diploma project, AHO 2026', no: 'Diplomprosjekt, AHO 2026' },
    description: {
      en: 'A calibrated road-protection landscape for unstable terrain along FV55 at Kjenesskreda.',
      no: 'Et kalibrert rassikringslandskap for ustabilt terreng langs FV55 ved Kjenesskreda.',
    },
    fullDescription: {
      en: 'Impermanence & Maintenance examines Kjenesskreda at Esefjorden near Balestrand, where FV55 passes between a steep avalanche slope and the fjord. Mapping, physical models, and spatial studies develop a calibrated road-protection sequence across avalanche, slush, debris, runoff, and seasonal maintenance conditions. The work treats protection infrastructure as a landscape that changes through use, weather, and repair. Developed with Trong Le.',
      no: 'Impermanence & Maintenance undersøker Kjenesskreda ved Esefjorden nær Balestrand, der FV55 går mellom en bratt skredside og fjorden. Kartlegging, fysiske modeller og romlige studier utvikler en kalibrert sikringssekvens for snøskred, sørpeskred, løsmasser, avrenning og sesongbasert vedlikehold. Arbeidet behandler sikringsinfrastruktur som et landskap som endres gjennom bruk, vær og reparasjon. Utviklet med Trong Le.',
    },
    facts: [
      { label: { en: 'Period', no: 'Periode' }, value: { en: 'Spring 2026', no: 'Vår 2026' } },
      {
        label: { en: 'Course', no: 'Kurs' },
        value: { en: '12-803 Diploma Landscape Architecture', no: '12-803 Diplom landskapsarkitektur' },
      },
      {
        label: { en: 'Site', no: 'Sted' },
        value: { en: 'Kjenesskreda, Esefjorden / FV55', no: 'Kjenesskreda, Esefjorden / FV55' },
      },
      { label: { en: 'Team', no: 'Team' }, value: { en: 'With Trong Le', no: 'Med Trong Le' } },
    ],
    images: [
      {
        src: '/projects/impermanence-maintenance/01-drone-overview-bw.webp',
        caption: {
          en: 'Drone survey frames the avalanche path, the road, and the fjord edge as one exposed section.',
          no: 'Droneundersøkelsen samler skredløpet, veien og fjordkanten i ett eksponert snitt.',
        },
      },
      {
        src: '/projects/impermanence-maintenance/02-avalanche-map.webp',
        caption: {
          en: 'The avalanche map locates registered avalanche points and release areas along FV55 around Esefjorden.',
          no: 'Skredkartet lokaliserer registrerte skredpunkt og utløsningsområder langs FV55 rundt Esefjorden.',
        },
      },
      {
        src: '/projects/impermanence-maintenance/02-model-overview.webp',
        caption: {
          en: 'Physical model tests how the protective sequence meets the talus slope, road, and waterline.',
          no: 'Den fysiske modellen tester hvordan sikringssekvensen møter ura, veien og vannlinjen.',
        },
      },
      {
        src: '/projects/impermanence-maintenance/03-site-plan.webp',
        caption: {
          en: 'The 1:1000 site plan reads runout terrain, contour lines, and the road corridor as one continuous field.',
          no: 'Situasjonsplanen i 1:1000 leser utløpsterreng, høydekurver og veikorridor som ett sammenhengende felt.',
        },
        fit: 'contain',
      },
      {
        src: '/projects/impermanence-maintenance/04-model-sequence.webp',
        caption: {
          en: 'Eye-level model study tests the scale and rhythm of protection as experienced from the road.',
          no: 'Modellstudiet i øyehøyde tester skalaen og rytmen i sikringen slik den oppleves fra veien.',
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
      en: 'Developed in 60-540 The Road, the project treats roads and their material, ecological, and social systems as constructed landscapes. At Lonavatnet along Rv13, the pair project uses high-resolution site mapping and physical models to study a sequence of protective structures across a steep roadside condition. Developed with Trong Le.',
      no: 'Prosjektet ble utviklet i 60-540 The Road og behandler veier og deres materielle, økologiske og sosiale systemer som konstruerte landskap. Ved Lonavatnet langs Rv13 bruker parprosjektet detaljert stedskartlegging og fysiske modeller til å undersøke en sekvens av sikringskonstruksjoner i en bratt veisituasjon. Utviklet med Trong Le.',
    },
    facts: [
      { label: { en: 'Period', no: 'Periode' }, value: { en: 'Autumn 2025', no: 'Høst 2025' } },
      { label: { en: 'Course', no: 'Kurs' }, value: { en: '60-540 The Road', no: '60-540 The Road' } },
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
      en: 'Developed in 60-619 Systems: Hydropolis, the project moves between territorial reading and close-range spatial detail at Borgeskogen. Relief mapping, eye-level model studies, and a 1:50 construction section test how ground, vegetation, drainage, local stone, and movement meet at the site. Developed with Dimitra.',
      no: 'Prosjektet ble utviklet i 60-619 Systemer: Hydropolis og beveger seg mellom territoriell lesning og nærgående romlig detalj i Borgeskogen. Relieffkartlegging, modellstudier i øyehøyde og et konstruksjonssnitt i 1:50 tester hvordan terreng, vegetasjon, drenering, lokal stein og bevegelse møtes på stedet. Utviklet med Dimitra.',
    },
    facts: [
      { label: { en: 'Period', no: 'Periode' }, value: { en: '2025', no: '2025' } },
      {
        label: { en: 'Course', no: 'Kurs' },
        value: {
          en: '60-619 Systems: Hydropolis',
          no: '60-619 Systems: Hydropolis',
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
      en: 'The project began in spring 2023 in 61 160 Commons – Place and territories in the north, where Group C worked on Røstlandet and the pressure on bird-cliff and cultural landscapes. Bjørn continued the project independently in spring 2024. Layered mapping compares orthophoto, relief, settlement, and registered stone walls across scales to read how existing boundaries and everyday movement are shaped by terrain and water.',
      no: 'Prosjektet begynte våren 2023 i 61 160 Fellesrom – Sted og territorier i nord, der gruppe C arbeidet med Røstlandet og fuglefjellene og kulturlandskapet under press. Bjørn videreførte prosjektet selvstendig våren 2024. Lagdelt kartlegging sammenligner ortofoto, relieff, bebyggelse og registrerte steinmurer på tvers av skalaer for å lese hvordan eksisterende grenser og hverdagsbevegelse formes av terreng og vann.',
    },
    facts: [
      {
        label: { en: 'Period', no: 'Periode' },
        value: { en: 'Spring 2023 / continued spring 2024', no: 'Vår 2023 / videreført vår 2024' },
      },
      {
        label: { en: 'Course', no: 'Kurs' },
        value: {
          en: '61 160 · Commons – Place and territories in the north',
          no: '61 160 · Fellesrom – Sted og territorier i nord',
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
      en: 'Developed in 60-526 Commons: Parks and Park Systems, the project reads Rødtvet through its forest edge, former agricultural ground, waterways, and post-war housing structure. A connected sequence of rain paths, community gardens, planted edges, and social spaces makes hidden water systems visible while strengthening biodiversity and everyday use. Developed with Maria Olof Sigurdardottir.',
      no: 'Prosjektet ble utviklet i 60-526 Commons: Parks and Park Systems og leser Rødtvet gjennom skogkanten, tidligere jordbruksmark, vannløp og etterkrigstidens boligstruktur. En sammenhengende sekvens av regnveier, felleshager, plantede kanter og sosiale rom synliggjør skjulte vannsystemer og styrker biologisk mangfold og hverdagsbruk. Utviklet med Maria Olof Sigurdardottir.',
    },
    facts: [
      { label: { en: 'Period', no: 'Periode' }, value: { en: 'Autumn 2024', no: 'Høst 2024' } },
      {
        label: { en: 'Course', no: 'Kurs' },
        value: {
          en: '60-526 Commons: Parks and Park Systems',
          no: '60-526 Commons: Parks and Park Systems',
        },
      },
      { label: { en: 'Site', no: 'Sted' }, value: { en: 'Rødtvet, Oslo', no: 'Rødtvet, Oslo' } },
      {
        label: { en: 'Team', no: 'Team' },
        value: { en: 'With Maria Olof Sigurdardottir', no: 'Med Maria Olof Sigurdardottir' },
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
        src: '/projects/edge-landscape/03-landscape-section.webp',
        caption: {
          en: 'A long section tests vegetation structure, movement, and social spaces from the forest edge to the lower ground.',
          no: 'Et langt snitt tester vegetasjonsstruktur, bevegelse og sosiale rom fra skogkanten til det lavereliggende terrenget.',
        },
        fit: 'contain',
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
        src: '/projects/edge-landscape/04-terrain-model.webp',
        caption: {
          en: 'The layered terrain model clarifies the steep forest edge, valleys, and connections across Rødtvet.',
          no: 'Den lagdelte terrengmodellen tydeliggjør den bratte skogkanten, daldragene og forbindelsene på tvers av Rødtvet.',
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
              en: 'Field study image from Rødtvet.',
              no: 'Feltstudiebilde fra Rødtvet.',
            },
          },
          {
            src: '/projects/edge-landscape/07-field-study-02.webp',
            caption: {
              en: 'Field study image from Rødtvet.',
              no: 'Feltstudiebilde fra Rødtvet.',
            },
          },
          {
            src: '/projects/edge-landscape/08-field-study-03.webp',
            caption: {
              en: 'Field study image from Rødtvet.',
              no: 'Feltstudiebilde fra Rødtvet.',
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
          en: '60-701 Pre-diploma for Urbanism and Landscape Architecture',
          no: '60-701 Prediplom for urbanisme og landskapsarkitektur',
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
              en: 'AKP 02 - Wood railing.',
              no: 'AKP 02 - Trerekkverk.',
            },
          },
          {
            src: '/projects/design-by-entropy/06-card-climbing-wall.webp',
            caption: {
              en: 'AKP 03 - Stone feature and geomembrane liner.',
              no: 'AKP 03 - Steinelement og geomembran.',
            },
          },
          {
            src: '/projects/design-by-entropy/07-card-colored-benches.webp',
            caption: {
              en: 'LAP 01 - Pergola.',
              no: 'LAP 01 - Pergola.',
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
