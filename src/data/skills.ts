import type { Skill, SkillCategory } from "./types";

export const skillCategories: SkillCategory[] = [
  {
    id: "revenue",
    label: { es: "Revenue & Pricing", en: "Revenue & Pricing" },
    blurb: {
      es: "Cómo se fija el precio, se pronostica la demanda y se maximiza el margen.",
      en: "How prices are set, demand is forecast and margin is maximized.",
    },
  },
  {
    id: "finance",
    label: { es: "Finanzas & Impuestos", en: "Finance & Tax" },
    blurb: {
      es: "La base operativa: contabilidad, cuentas por cobrar, facturación e impuestos.",
      en: "The operating foundation: accounting, receivables, billing and tax.",
    },
  },
  {
    id: "data",
    label: { es: "Datos & BI", en: "Data & BI" },
    blurb: {
      es: "Del dato crudo al tablero que usa la gerencia para decidir.",
      en: "From raw data to the dashboard leadership decides with.",
    },
  },
  {
    id: "automation",
    label: { es: "Automatización", en: "Automation" },
    blurb: {
      es: "Eliminar trabajo manual repetitivo con flujos, macros, scripts y RPA.",
      en: "Removing repetitive manual work with flows, macros, scripts and RPA.",
    },
  },
  {
    id: "web",
    label: { es: "Desarrollo Web", en: "Web Development" },
    blurb: {
      es: "Productos full-stack en producción, del modelo de datos al despliegue.",
      en: "Full-stack products in production, from data model to deployment.",
    },
  },
  {
    id: "ai",
    label: { es: "IA & Desarrollo asistido", en: "AI & Assisted Dev" },
    blurb: {
      es: "Agentes y modelos de IA como multiplicador de velocidad y calidad.",
      en: "AI agents and models as a multiplier of speed and quality.",
    },
  },
  {
    id: "methods",
    label: { es: "Métodos & Sistemas", en: "Methods & Systems" },
    blurb: {
      es: "Mejora continua, transformación digital y los sistemas empresariales detrás.",
      en: "Continuous improvement, digital transformation and the enterprise systems behind it.",
    },
  },
];

export const skills: Skill[] = [
  // Revenue & Pricing
  {
    id: "revenue-management",
    name: { es: "Revenue Management", en: "Revenue Management" },
    category: "revenue",
    core: true,
    description: {
      es: "Estrategia de ingresos de punta a punta: segmentación, precio, disponibilidad y canales para maximizar ingreso y margen.",
      en: "End-to-end revenue strategy: segmentation, price, availability and channels to maximize revenue and margin.",
    },
  },
  {
    id: "dynamic-pricing",
    name: { es: "Pricing dinámico", en: "Dynamic pricing" },
    category: "revenue",
    description: {
      es: "Modelos de precio que reaccionan a demanda, estacionalidad, eventos y curvas de reserva.",
      en: "Pricing models that react to demand, seasonality, events and booking curves.",
    },
  },
  {
    id: "forecasting",
    name: { es: "Pronóstico de demanda", en: "Demand forecasting" },
    category: "revenue",
    description: {
      es: "Proyecciones de demanda e ingresos a partir de datos históricos y en tiempo real.",
      en: "Demand and revenue projections from historical and real-time data.",
    },
  },
  {
    id: "competitive-intel",
    name: { es: "Inteligencia competitiva", en: "Competitive intelligence" },
    category: "revenue",
    description: {
      es: "Captura automatizada de precios de la competencia y tableros para reaccionar a tiempo.",
      en: "Automated competitor price capture and dashboards to react in time.",
    },
  },
  {
    id: "fleet-optimization",
    name: { es: "Optimización de flota", en: "Fleet optimization" },
    category: "revenue",
    description: {
      es: "Asignación de inventario entre sucursales y contratos para maximizar utilización (RACD, ADR).",
      en: "Inventory allocation across branches and contracts to maximize utilization (RACD, ADR).",
    },
  },
  {
    id: "pnl",
    name: { es: "P&G y escaleras de precio", en: "P&L & price ladders" },
    category: "revenue",
    description: {
      es: "Estados de resultados por categoría y arquitectura de precios alineada a objetivos de margen.",
      en: "Category P&L statements and price architecture aligned with margin targets.",
    },
  },
  {
    id: "pricefx",
    name: { es: "Pricefx", en: "Pricefx" },
    category: "revenue",
    core: true,
    description: {
      es: "Flujos de aprobación comercial y de precios en la plataforma de pricing empresarial.",
      en: "Commercial and pricing approval workflows on the enterprise pricing platform.",
    },
  },
  {
    id: "rms",
    name: { es: "RMS", en: "RMS" },
    category: "revenue",
    description: {
      es: "Implementación y optimización de sistemas de Revenue Management.",
      en: "Revenue Management System implementation and optimization.",
    },
  },

  // Finance & Tax
  {
    id: "tax",
    name: { es: "Impuestos & NIIF", en: "Tax & IFRS" },
    category: "finance",
    description: {
      es: "Impuesto sobre la renta, impuesto corporativo, legislación fiscal y normas IFRS.",
      en: "Income tax, corporate tax, tax law and IFRS standards.",
    },
  },
  {
    id: "audit",
    name: { es: "Auditoría & recuperación de saldos", en: "Audit & balance recovery" },
    category: "finance",
    description: {
      es: "Auditoría de procesos de débito y crédito para recuperar saldos en AR, AP y ajustes contables.",
      en: "Auditing debit and credit processes to recover balances in AR, AP and accounting adjustments.",
    },
  },
  {
    id: "accounting",
    name: { es: "Contabilidad & cierres", en: "Accounting & closes" },
    category: "finance",
    description: {
      es: "Cierres mensuales multi-empresa, conciliaciones bancarias y controles financieros.",
      en: "Multi-company monthly closes, bank reconciliations and financial controls.",
    },
  },
  {
    id: "accounts-receivable",
    name: { es: "Cuentas por cobrar", en: "Accounts receivable" },
    category: "finance",
    description: {
      es: "Diseño y operación de procesos de AR en portafolios multinacionales.",
      en: "Designing and running AR processes across multinational portfolios.",
    },
  },
  {
    id: "billing",
    name: { es: "Facturación multinacional", en: "Multinational billing" },
    category: "finance",
    description: {
      es: "Rentas fijas y variables, notas de crédito/débito, intereses, energía y terceros.",
      en: "Fixed and variable rents, credit/debit notes, interest, energy and third parties.",
    },
  },
  {
    id: "collections",
    name: { es: "Cobranza", en: "Collections" },
    category: "finance",
    description: {
      es: "Gestión y recuperación de cartera; Top 3 del portafolio de Argentina.",
      en: "Portfolio management and recovery; Top 3 in the Argentina portfolio.",
    },
  },
  {
    id: "commercial-agreements",
    name: { es: "Acuerdos comerciales", en: "Commercial agreements" },
    category: "finance",
    description: {
      es: "Revisión y cumplimiento de acuerdos y allowances de proveedores en 4 mercados.",
      en: "Review and compliance of vendor agreements and allowances in 4 markets.",
    },
  },

  // Data & BI
  {
    id: "power-bi",
    name: { es: "Power BI", en: "Power BI" },
    category: "data",
    core: true,
    description: {
      es: "Dashboards ejecutivos, modelos de datos y alertas automáticas adoptados como estándar.",
      en: "Executive dashboards, data models and automated alerts adopted as the standard.",
    },
  },
  {
    id: "sql-bigquery",
    name: { es: "SQL / BigQuery", en: "SQL / BigQuery" },
    category: "data",
    core: true,
    description: {
      es: "Consultas, reportería y pipelines de datos en la nube para inteligencia de precios.",
      en: "Queries, reporting and cloud data pipelines for pricing intelligence.",
    },
  },
  {
    id: "power-query",
    name: { es: "Power Query", en: "Power Query" },
    category: "data",
    core: true,
    description: {
      es: "Extracción, transformación y modelado de datos (ETL) para análisis y reportes.",
      en: "Data extraction, transformation and modeling (ETL) for analysis and reporting.",
    },
  },
  {
    id: "excel",
    name: { es: "Excel avanzado", en: "Advanced Excel" },
    category: "data",
    core: true,
    description: {
      es: "Modelado financiero, estadística y análisis de datos a nivel avanzado.",
      en: "Financial modeling, statistics and advanced data analysis.",
    },
  },
  {
    id: "data-modeling",
    name: { es: "Modelado de datos", en: "Data modeling" },
    category: "data",
    description: {
      es: "Modelos relacionales y semánticos que sostienen reportes y alertas confiables.",
      en: "Relational and semantic models behind reliable reports and alerts.",
    },
  },
  {
    id: "data-analysis",
    name: { es: "Análisis de datos", en: "Data analysis" },
    category: "data",
    description: {
      es: "Exploración, limpieza y descripción de datos para responder preguntas de negocio.",
      en: "Exploring, cleaning and describing data to answer business questions.",
    },
  },
  {
    id: "data-viz",
    name: { es: "Visualización de datos", en: "Data visualization" },
    category: "data",
    description: {
      es: "Elegir la forma correcta de mostrar un dato para que la decisión sea obvia.",
      en: "Choosing the right form for the data so the decision becomes obvious.",
    },
  },
  {
    id: "tableau",
    name: { es: "Tableau", en: "Tableau" },
    category: "data",
    description: {
      es: "Visualización y exploración interactiva de datos.",
      en: "Interactive data visualization and exploration.",
    },
  },
  {
    id: "statistics",
    name: { es: "Estadística & analítica predictiva", en: "Statistics & predictive analytics" },
    category: "data",
    description: {
      es: "Estadística descriptiva, minería de datos y fundamentos de modelos predictivos.",
      en: "Descriptive statistics, data mining and predictive modeling fundamentals.",
    },
  },
  {
    id: "r",
    name: { es: "R", en: "R" },
    category: "data",
    description: {
      es: "Limpieza, transformación y visualización de datos con R.",
      en: "Data wrangling and visualization with R.",
    },
  },

  // Automation
  {
    id: "power-automate",
    name: { es: "Power Automate", en: "Power Automate" },
    category: "automation",
    core: true,
    description: {
      es: "Flujos que integran Outlook, SharePoint y reportes para eliminar trabajo manual.",
      en: "Flows that connect Outlook, SharePoint and reporting to remove manual work.",
    },
  },
  {
    id: "python",
    name: { es: "Python", en: "Python" },
    category: "automation",
    core: true,
    description: {
      es: "Herramientas de cálculo, procesamiento de exportaciones de SAP y limpieza de datos.",
      en: "Calculation tools, SAP export processing and data cleaning.",
    },
  },
  {
    id: "vba",
    name: { es: "VBA / Macros", en: "VBA / Macros" },
    category: "automation",
    core: true,
    description: {
      es: "Suites de macros y herramientas que capturan datos y automatizan tareas repetitivas.",
      en: "Macro suites and tools that capture data and automate repetitive tasks.",
    },
  },
  {
    id: "rpa",
    name: { es: "RPA", en: "RPA" },
    category: "automation",
    description: {
      es: "Automatización robótica de procesos, desde el levantamiento y costeo hasta la construcción.",
      en: "Robotic process automation, from mapping and costing to the build.",
    },
  },
  {
    id: "sharepoint",
    name: { es: "SharePoint & Outlook", en: "SharePoint & Outlook" },
    category: "automation",
    description: {
      es: "Buzones compartidos y repositorios integrados a flujos automáticos.",
      en: "Shared mailboxes and repositories wired into automated flows.",
    },
  },

  // Web development
  {
    id: "nextjs",
    name: { es: "Next.js", en: "Next.js" },
    category: "web",
    core: true,
    description: {
      es: "Framework principal de mis productos SaaS y de este mismo sitio.",
      en: "The main framework behind my SaaS products — and this very site.",
    },
  },
  {
    id: "react",
    name: { es: "React", en: "React" },
    category: "web",
    core: true,
    description: {
      es: "Interfaces interactivas: dashboards, pantallas de cocina y paneles de gestión.",
      en: "Interactive UIs: dashboards, kitchen displays and management panels.",
    },
  },
  {
    id: "typescript",
    name: { es: "TypeScript", en: "TypeScript" },
    category: "web",
    core: true,
    description: {
      es: "Tipado estricto para productos mantenibles.",
      en: "Strict typing for maintainable products.",
    },
  },
  {
    id: "javascript",
    name: { es: "JavaScript", en: "JavaScript" },
    category: "web",
    description: {
      es: "El lenguaje base de la web y de mis productos.",
      en: "The base language of the web and of my products.",
    },
  },
  {
    id: "fastapi",
    name: { es: "FastAPI", en: "FastAPI" },
    category: "web",
    core: true,
    description: {
      es: "APIs en Python para plataformas internas como el portafolio de automatización.",
      en: "Python APIs for internal platforms such as the automation portfolio.",
    },
  },
  {
    id: "firebase",
    name: { es: "Firebase", en: "Firebase" },
    category: "web",
    core: true,
    description: {
      es: "Autenticación, base de datos en tiempo real y multi-tenancy para SaaS.",
      en: "Authentication, real-time database and multi-tenancy for SaaS.",
    },
  },
  {
    id: "vercel",
    name: { es: "Vercel", en: "Vercel" },
    category: "web",
    description: {
      es: "Despliegue continuo a producción de cada producto.",
      en: "Continuous deployment to production for every product.",
    },
  },
  {
    id: "github",
    name: { es: "GitHub", en: "GitHub" },
    category: "web",
    core: true,
    description: {
      es: "Control de versiones y flujo de trabajo de cada proyecto.",
      en: "Version control and workflow for every project.",
    },
  },
  {
    id: "devops",
    name: { es: "DevOps", en: "DevOps" },
    category: "web",
    description: {
      es: "Fundamentos de integración y entrega continua aplicados a proyectos de datos.",
      en: "Continuous integration and delivery fundamentals applied to data projects.",
    },
  },

  // AI & assisted development
  {
    id: "claude-code",
    name: { es: "Claude Code", en: "Claude Code" },
    category: "ai",
    core: true,
    description: {
      es: "Agente de programación para construir y refactorizar productos completos.",
      en: "Coding agent for building and refactoring complete products.",
    },
  },
  {
    id: "antigravity",
    name: { es: "Google Antigravity", en: "Google Antigravity" },
    category: "ai",
    core: true,
    description: {
      es: "Entorno de desarrollo con agentes de IA.",
      en: "Agent-first AI development environment.",
    },
  },
  {
    id: "codex",
    name: { es: "Codex", en: "Codex" },
    category: "ai",
    core: true,
    description: {
      es: "Agente de código para tareas de desarrollo en paralelo.",
      en: "Coding agent for parallel development tasks.",
    },
  },
  {
    id: "gemini",
    name: { es: "Gemini / AI Studio", en: "Gemini / AI Studio" },
    category: "ai",
    core: true,
    description: {
      es: "Prototipado de soluciones con modelos de Google.",
      en: "Prototyping solutions with Google's models.",
    },
  },
  {
    id: "llm-assistants",
    name: { es: "Claude / ChatGPT", en: "Claude / ChatGPT" },
    category: "ai",
    core: true,
    description: {
      es: "Asistentes de IA para análisis, redacción técnica y diseño de soluciones.",
      en: "AI assistants for analysis, technical writing and solution design.",
    },
  },
  {
    id: "grok",
    name: { es: "Grok", en: "Grok" },
    category: "ai",
    core: true,
    description: {
      es: "Modelo de IA complementario para investigación y contraste de enfoques.",
      en: "Complementary AI model for research and comparing approaches.",
    },
  },
  {
    id: "vscode",
    name: { es: "VS Code", en: "VS Code" },
    category: "ai",
    core: true,
    description: {
      es: "Editor principal, integrado con agentes de IA.",
      en: "Main editor, integrated with AI agents.",
    },
  },
  {
    id: "gcp",
    name: { es: "Google Cloud (GCP)", en: "Google Cloud (GCP)" },
    category: "ai",
    core: true,
    description: {
      es: "Servicios en la nube de Google, incluyendo BigQuery.",
      en: "Google cloud services, including BigQuery.",
    },
  },

  // Methods & systems
  {
    id: "lean-six-sigma",
    name: { es: "Lean Six Sigma", en: "Lean Six Sigma" },
    category: "methods",
    core: true,
    description: {
      es: "Green Belt. Metodología DMAIC para reducir variación y desperdicio.",
      en: "Green Belt. DMAIC methodology to reduce variation and waste.",
    },
  },
  {
    id: "process-improvement",
    name: { es: "Mejora de procesos", en: "Process improvement" },
    category: "methods",
    description: {
      es: "Levantar, medir y rediseñar procesos antes de automatizarlos.",
      en: "Mapping, measuring and redesigning processes before automating them.",
    },
  },
  {
    id: "digital-transformation",
    name: { es: "Transformación digital", en: "Digital transformation" },
    category: "methods",
    description: {
      es: "Lean Digital Ambassador: adopción de herramientas digitales con cambio medible.",
      en: "Lean Digital Ambassador: digital tool adoption with measurable change.",
    },
  },
  {
    id: "sap-hcm",
    name: { es: "SAP HCM", en: "SAP HCM" },
    category: "methods",
    core: true,
    description: {
      es: "Exportaciones de planilla y RR. HH. como fuente para cálculos y automatizaciones.",
      en: "Payroll and HR exports as the source for calculations and automations.",
    },
  },
  {
    id: "requirements",
    name: { es: "Análisis de requerimientos", en: "Requirements analysis" },
    category: "methods",
    description: {
      es: "Traducir necesidades del negocio en especificaciones construibles.",
      en: "Turning business needs into buildable specifications.",
    },
  },
  {
    id: "project-management",
    name: { es: "Gestión de proyectos", en: "Project management" },
    category: "methods",
    description: {
      es: "Planificación, seguimiento y entrega de iniciativas de punta a punta.",
      en: "Planning, tracking and delivering initiatives end to end.",
    },
  },
  {
    id: "stakeholder-mgmt",
    name: { es: "Gestión de stakeholders", en: "Stakeholder management" },
    category: "methods",
    description: {
      es: "Colaboración con marketing, ventas y operaciones; presentación de insights a la alta gerencia.",
      en: "Partnering with marketing, sales and operations; presenting insights to senior management.",
    },
  },
  {
    id: "emotional-intelligence",
    name: { es: "Inteligencia emocional", en: "Emotional intelligence" },
    category: "methods",
    description: {
      es: "Habilidades blandas para liderar, negociar y trabajar entre áreas.",
      en: "Soft skills to lead, negotiate and work across teams.",
    },
  },
];

export const skillById = new Map(skills.map((s) => [s.id, s]));
