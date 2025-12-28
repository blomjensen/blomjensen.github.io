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
    title: { en: "Rockfall Gallery", no: "Ras-galleri" },
    category: { en: "Studio project", no: "Studioprosjekt" },
    description: {
      en: "Short summary…",
      no: "Kort oppsummering…",
    },
    fullDescription: {
      en: "Longer text under the carousel…",
      no: "Lengre tekst under karusellen…",
    },
    images: [
      { src: "/projects/rockfall_gallery/01_plan.png", caption: "Plan 1:500" },
      // { src: "/projects/rockfall_gallery/02_section.png", caption: "Snitt 1:50" },
      // ...
    ],
    processImages: [
      // { src: "/projects/rockfall_gallery/10_process.png", caption: "Prosess" },
    ],
  },
];
