// Fonte única de verdade dos dados profissionais. Extraído integralmente de
// `como_ficou_apos_ajuste.pdf` — sem métricas ou informações inventadas.
// Textos de UI (labels, headings) vivem em src/i18n/*.json; aqui ficam apenas
// os dados estruturados que alimentam mais de um componente e o CV em PDF.

export const contact = {
  phone: "+55 81 99750-7405",
  whatsapp: "https://wa.me/5581997507405",
  email: "alan.v.lins@gmail.com",
  linkedin: "https://www.linkedin.com/in/alan-v-lins",
  // Nenhum usuário de GitHub foi confirmado nas fontes disponíveis — defina
  // aqui quando tiver um perfil público para exibir o link no site.
  github: "https://github.com/alanlins",
  location: "Recife, Pernambuco, Brasil",
} as const;

export const stats = [
  { value: "15+", labelKey: "stats.experience" },
  { value: "5", labelKey: "stats.companies" },
  { value: "10+", labelKey: "stats.stacks" },
] as const;

export interface Experience {
  company: string;
  period: string;
  location: string;
  roleKey: string;
  bulletKeys: string[];
}

export const experiences: Experience[] = [
  {
    company: "Fundação CERTI",
    period: "2023 — 2026",
    location: "Santa Catarina, Brasil (remoto)",
    roleKey: "experience.certi.role",
    bulletKeys: [
      "experience.certi.bullet1",
      "experience.certi.bullet2",
      "experience.certi.bullet3",
      "experience.certi.bullet4",
    ],
  },
  {
    company: "Compass.UOL",
    period: "2020 — 2022",
    location: "Recife, Pernambuco",
    roleKey: "experience.compass.role",
    bulletKeys: [
      "experience.compass.bullet1",
      "experience.compass.bullet2",
      "experience.compass.bullet3",
      "experience.compass.bullet4",
    ],
  },
  {
    company: "MV S/A",
    period: "2014 — 2020",
    location: "Recife e Região, Brasil",
    roleKey: "experience.mv.role",
    bulletKeys: [
      "experience.mv.bullet1",
      "experience.mv.bullet2",
      "experience.mv.bullet3",
      "experience.mv.bullet4",
      "experience.mv.bullet5",
    ],
  },
  {
    company: "Accenture Brasil",
    period: "2013 — 2014",
    location: "Recife e Região",
    roleKey: "experience.accenture.role",
    bulletKeys: [
      "experience.accenture.bullet1",
      "experience.accenture.bullet2",
    ],
  },
  {
    company: "UFPE",
    period: "2012",
    location: "Recife e Região",
    roleKey: "experience.ufpe.role",
    bulletKeys: ["experience.ufpe.bullet1"],
  },
];

export interface Education {
  institution: string;
  period: string;
  degreeKey: string;
}

export const education: Education[] = [
  {
    institution: "Unibratec",
    period: "2015 — 2016",
    degreeKey: "education.postGrad",
  },
  {
    institution: "Unibratec",
    period: "2010 — 2012",
    degreeKey: "education.systems",
  },
  {
    institution: "Unibratec",
    period: "2008 — 2009",
    degreeKey: "education.electronics",
  },
];

export const specialties = [
  {
    icon: "code",
    titleKey: "specialties.fullstack.title",
    descriptionKey: "specialties.fullstack.description",
    tags: ["React", "Angular", "Node.js", "Python/FastAPI", "Java"],
  },
  {
    icon: "network",
    titleKey: "specialties.architecture.title",
    descriptionKey: "specialties.architecture.description",
    tags: ["Microsserviços", "EDA", "BFF", "Design Patterns"],
  },
  {
    icon: "cloud",
    titleKey: "specialties.cloud.title",
    descriptionKey: "specialties.cloud.description",
    tags: ["Azure", "AWS", "Docker", "CI/CD"],
  },
  {
    icon: "sparkles",
    titleKey: "specialties.ai.title",
    descriptionKey: "specialties.ai.description",
    tags: ["LLMs", "Prompt Engineering", "Python"],
  },
] as const;

export interface ProjectPortfolio {
  id: string;
  titleKey: string;
  descriptionKey: string;
  link: string;
}

// Placeholders — substituir por projetos reais (nome, descrição, stack, link)
// assim que estiverem disponíveis. Ver CLAUDE.md para instruções.
export const portfolioProjects: ProjectPortfolio[] = [
  {
    id: "cine-dash",
    titleKey: "portfolio.cineDash.title",
    descriptionKey: "portfolio.cineDash.description",
    link: "https://cine-dash-app-5ap2w.ondigitalocean.app/",
  },
  {
    id: "ai-ticket-triage",
    titleKey: "portfolio.aiTicketTriage.title",
    descriptionKey: "portfolio.aiTicketTriage.description",
    link: "https://ai-ticket-triage-bgca.onrender.com/",
  },
  {
    id: "order-events",
    titleKey: "portfolio.orderEvents.title",
    descriptionKey: "portfolio.orderEvents.description",
    link: "https://notifications-service-a1z6.onrender.com/",
  },
];

export const cvFiles = {
  "pt-BR": `${import.meta.env.BASE_URL}cv/cv-pt-BR.pdf`,
  "en-US": `${import.meta.env.BASE_URL}cv/cv-en-US.pdf`,
  "es-ES": `${import.meta.env.BASE_URL}cv/cv-es-ES.pdf`,
} as const;
