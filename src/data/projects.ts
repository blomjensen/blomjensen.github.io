export type ProjectImage = {
  src: string;
  caption?: string;
};

export type Project = {
  id: number;
  title: { en: string; no: string };
  category: { en: string; no: string };
  description: { en: string; no: string };
  fullDescription: { en: string; no: string };
  images: ProjectImage[];
  processImages?: ProjectImage[];
};

export const projects: Project[] = [
  {
    id: 1,
    title: { en: "The Road", no: "The Road" },
    category: { en: "Collaborative project", no: "Samarbeidsprosjekt" },
    description: {
      en: "A collaborative landscape proposal that studies movement, protection, and terrain along a narrow road corridor.",
      no: "Et samarbeidsprosjekt som utforsker bevegelse, sikring og terreng langs et smalt veiforløp.",
    },
    fullDescription: {
      en: "The Road develops a landscape response to a steep and exposed roadside condition. Through mapping, model studies, and spatial testing, the project explores how infrastructure, rockfall protection, and movement can be shaped as one coherent landscape sequence. The project was developed in collaboration with Trong.",
      no: "The Road utvikler et landskapsgrep for en bratt og utsatt veisituasjon. Gjennom kartlegging, modellstudier og romlige tester undersøker prosjektet hvordan infrastruktur, rassikring og bevegelse kan formes som en sammenhengende landskapssekvens. Prosjektet ble utviklet i samarbeid med Trong.",
    },
    images: [
      { src: "/projects/the_road/01_model_overview.webp", caption: "Model overview" },
      { src: "/projects/the_road/02_map.webp", caption: "Territorial map" },
      { src: "/projects/the_road/04_render.webp", caption: "Atmospheric render" },
    ],
    processImages: [
      { src: "/projects/the_road/process_01_study.webp", caption: "Site and structure study" },
      { src: "/projects/the_road/01_model_detail.webp", caption: "Model detail" },
    ],
  },

  {
    id: 2,
    title: { en: "Borgeskogen", no: "Borgeskogen" },
    category: { en: "Collaborative project", no: "Samarbeidsprosjekt" },
    description: {
      en: "A collaborative landscape study combining scapemapping, scenographic model work, and detailed sectioning.",
      no: "Et samarbeidsprosjekt som kombinerer scapemapping, scenografiske modellstudier og detaljert snittarbeid.",
    },
    fullDescription: {
      en: "Borgeskogen moves between territorial reading and close-range spatial detail. The project brings together large-scale mapping, atmospheric scene work, and a 1:50 section to test how topography, vegetation, material transitions, and movement meet the site. The project was developed in collaboration with Dimitra.",
      no: "Borgeskogen beveger seg mellom territoriell lesning og nærgående romlig detalj. Prosjektet samler storskala kartlegging, atmosfæriske scenestudier og et snitt i 1:50 for å teste hvordan topografi, vegetasjon, materialoverganger og bevegelse møter stedet. Prosjektet ble utviklet i samarbeid med Dimitra.",
    },
    images: [
      { src: "/projects/borgeskogen/01_scene.webp", caption: "Scene study" },
      { src: "/projects/borgeskogen/02_scapemap.webp", caption: "Scapemap" },
      { src: "/projects/borgeskogen/03_detail_section.webp", caption: "Detail section 1:50" },
    ],
    processImages: [
      { src: "/projects/borgeskogen/process_01_board.webp", caption: "Process and exhibition board" },
    ],
  },
];
