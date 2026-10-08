import type { Chapter, Role } from "./types";

export const chapters: Chapter[] = [
  {
    id: "builder",
    label: { es: "Construcción", en: "Building" },
    period: { es: "2025 — hoy", en: "2025 — now" },
    blurb: {
      es: "Automatización, RPA y productos SaaS full-stack asistidos por IA.",
      en: "Automation, RPA and AI-assisted full-stack SaaS products.",
    },
  },
  {
    id: "revenue",
    label: { es: "Revenue & Estrategia", en: "Revenue & Strategy" },
    period: { es: "2024 — 2026", en: "2024 — 2026" },
    blurb: {
      es: "Pricing dinámico, P&L y estrategia de ingresos multi-país.",
      en: "Dynamic pricing, P&L and multi-country revenue strategy.",
    },
  },
  {
    id: "finance",
    label: { es: "Finanzas, Impuestos & AR", en: "Finance, Tax & AR" },
    period: { es: "2016 — 2024", en: "2016 — 2024" },
    blurb: {
      es: "Contabilidad, cuentas por cobrar, facturación multinacional e impuestos.",
      en: "Accounting, receivables, multinational billing and tax.",
    },
  },
];

export const roles: Role[] = [
  {
    id: "dos-pinos",
    company: "Dos Pinos",
    companyNote: {
      es: "Cooperativa de Productores de Leche R.L.",
      en: "Cooperativa de Productores de Leche R.L.",
    },
    title: { es: "Especialista en Automatización de Procesos", en: "Process Automation Specialist" },
    start: "2026-07",
    end: null,
    location: { es: "Costa Rica", en: "Costa Rica" },
    markets: { es: "Centro de Servicios Compartidos", en: "Shared Services Center" },
    industry: { es: "Consumo masivo · Lácteos", en: "FMCG · Dairy" },
    chapter: "builder",
    summary: {
      es: "Tecnología y automatización para RR. HH. y planilla: alertas proactivas, RPA y herramientas a la medida.",
      en: "HR and payroll technology & automation: proactive alerts, RPA and custom-built tools.",
    },
    highlights: [
      {
        es: "Desarrollé el **sistema de alertas automáticas** del Centro de Servicios Compartidos: **53 modelos de datos** y alertas en **Power BI** que reemplazan la revisión manual por un control proactivo.",
        en: "Developed the **automated alert system** for the Shared Services Center: **53 data models** and **Power BI** alerts that replace manual review with proactive control.",
      },
      {
        es: "Analicé los ciclos de planilla y construí el **RPA para su automatización**: **425 horas/año** de trabajo manual identificadas y valoradas para priorizar la inversión tecnológica.",
        en: "Analyzed payroll cycles and built the **RPA for its automation**: **425 hours/year** of manual work identified and costed to prioritize tech investment.",
      },
      {
        es: "Desarrollé una herramienta en **Python**: calculador de liquidaciones que procesa exportaciones de **SAP HCM** y calcula beneficios de ley, además de un generador de reportes.",
        en: "Built a **Python** tool: a severance calculator that processes **SAP HCM** exports to compute legal benefits, plus a custom report generator.",
      },
      {
        es: "Construí una plataforma de portafolio de automatización (**FastAPI + Next.js**) para inventariar procesos, darles seguimiento en Kanban y medir el ROI.",
        en: "Built an automation portfolio platform (**FastAPI + Next.js**) to inventory processes, track them on Kanban and measure ROI.",
      },
      {
        es: "Implementé la automatización del buzón de nómina con Outlook, **Power Automate** y SharePoint.",
        en: "Implemented shared-mailbox automation with Outlook, **Power Automate** and SharePoint.",
      },
    ],
    metrics: [
      { value: "53", label: { es: "modelos de datos con alertas", en: "data models with alerts" } },
      { value: "425 h", label: { es: "de trabajo manual al año identificadas", en: "of manual work per year identified" } },
    ],
    scope: [
      {
        title: { es: "Control proactivo", en: "Proactive control" },
        items: [
          { es: "Modelado de datos y reglas de alerta en Power BI", en: "Data modeling and alert rules in Power BI" },
          { es: "Sustitución de revisiones manuales por monitoreo continuo", en: "Replacing manual reviews with continuous monitoring" },
        ],
      },
      {
        title: { es: "Automatización de planilla", en: "Payroll automation" },
        items: [
          { es: "Levantamiento y costeo de ciclos de planilla", en: "Mapping and costing payroll cycles" },
          { es: "Diseño y construcción del RPA", en: "RPA design and build" },
          { es: "Calculador de liquidaciones sobre exportaciones de SAP HCM", en: "Severance calculator on top of SAP HCM exports" },
        ],
      },
      {
        title: { es: "Gobierno del portafolio", en: "Portfolio governance" },
        items: [
          { es: "Inventario de procesos y priorización por ROI", en: "Process inventory and ROI-based prioritization" },
          { es: "Seguimiento en tablero Kanban", en: "Kanban tracking" },
        ],
      },
    ],
    skills: [
      "power-bi",
      "rpa",
      "python",
      "sap-hcm",
      "fastapi",
      "nextjs",
      "power-automate",
      "sharepoint",
      "data-modeling",
      "process-improvement",
    ],
  },
  {
    id: "ruta-digital",
    company: "Ruta Digital CR",
    companyNote: { es: "Agencia tecnológica · Fundador", en: "Tech agency · Founder" },
    title: { es: "Fundador & Desarrollador Digital", en: "Founder & Digital Developer" },
    start: "2025-11",
    end: null,
    location: { es: "Latinoamérica · Remoto", en: "Latin America · Remote" },
    markets: { es: "Clientes en LATAM", en: "Clients across LATAM" },
    industry: { es: "Software · SaaS", en: "Software · SaaS" },
    chapter: "builder",
    summary: {
      es: "Diseño y desarrollo de productos SaaS full-stack y soluciones digitales para clientes reales, con desarrollo asistido por IA.",
      en: "Design and development of full-stack SaaS products and digital solutions for real clients, powered by AI-assisted development.",
    },
    highlights: [
      {
        es: "Diseñé y entregué **más de 15 soluciones digitales** (sitios web, sistemas de reservas y de gestión), desde el levantamiento de requerimientos hasta producción.",
        en: "Designed and delivered **15+ digital solutions** (websites, booking and management systems), from requirements gathering to production deployment.",
      },
      {
        es: "Desarrollé productos SaaS propios con **Next.js, React, Firebase y Vercel**: un **Kitchen Display System (KDS)** multi-tenant para cadenas de restaurantes y **VetCore** para clínicas veterinarias.",
        en: "Built proprietary SaaS products with **Next.js, React, Firebase and Vercel**: a multi-tenant **Kitchen Display System (KDS)** for restaurant chains and **VetCore** for veterinary clinics.",
      },
      {
        es: "Construí **dashboards de inteligencia de negocio** a la medida para clientes, usando desarrollo asistido por IA para acortar los tiempos de entrega.",
        en: "Built custom **business intelligence dashboards** for clients, using AI-assisted development to shorten delivery.",
      },
    ],
    metrics: [
      { value: "15+", label: { es: "soluciones digitales entregadas", en: "digital solutions delivered" } },
      { value: "2", label: { es: "productos SaaS propios", en: "proprietary SaaS products" } },
    ],
    scope: [
      {
        title: { es: "Productos", en: "Products" },
        items: [
          { es: "KDS — pantallas de cocina multi-tenant para cadenas de restaurantes", en: "KDS — multi-tenant kitchen display system for restaurant chains" },
          { es: "VetCore — plataforma SaaS para clínicas veterinarias", en: "VetCore — SaaS platform for veterinary clinics" },
        ],
      },
      {
        title: { es: "Servicios", en: "Services" },
        items: [
          { es: "Sitios web, sistemas de reservas y de gestión", en: "Websites, booking and management systems" },
          { es: "Dashboards de BI a la medida", en: "Custom BI dashboards" },
          { es: "Del requerimiento al despliegue en producción", en: "From requirements to production deployment" },
        ],
      },
      {
        title: { es: "Forma de trabajo", en: "How I work" },
        items: [
          { es: "Next.js · React · Firebase · Vercel · GitHub", en: "Next.js · React · Firebase · Vercel · GitHub" },
          { es: "Desarrollo asistido por IA (Claude Code, Antigravity, Codex)", en: "AI-assisted development (Claude Code, Antigravity, Codex)" },
        ],
      },
    ],
    skills: [
      "nextjs",
      "react",
      "typescript",
      "javascript",
      "firebase",
      "vercel",
      "github",
      "vscode",
      "claude-code",
      "antigravity",
      "codex",
      "llm-assistants",
      "power-bi",
    ],
  },
  {
    id: "fifco",
    company: "FIFCO",
    companyNote: { es: "Florida Ice & Farm Co. · The HEINEKEN Company", en: "Florida Ice & Farm Co. · The HEINEKEN Company" },
    title: { es: "Analista de Revenue Management", en: "Revenue Management Analyst" },
    start: "2025-11",
    end: "2026-02",
    location: { es: "Costa Rica", en: "Costa Rica" },
    markets: { es: "Portafolio nacional de bebidas y alimentos", en: "National beverage & food portfolio" },
    industry: { es: "Consumo masivo · Bebidas", en: "FMCG · Beverages" },
    chapter: "revenue",
    summary: {
      es: "Aprobaciones comerciales y de precios, P&G y escaleras de precio para las 6 categorías del portafolio.",
      en: "Commercial and pricing approvals, P&L and price ladders across all 6 portfolio categories.",
    },
    highlights: [
      {
        es: "Gestioné los flujos de aprobación comercial y de precios en **Pricefx** para las **6 categorías** del portafolio.",
        en: "Managed commercial and pricing approval workflows in **Pricefx** across all **6 portfolio categories**.",
      },
      {
        es: "Elaboré y actualicé **estados de P&G** y escaleras de precios, asegurando coherencia con la estrategia comercial y los objetivos de margen.",
        en: "Prepared and updated **P&L statements** and price ladders, ensuring alignment with commercial strategy and margin targets.",
      },
      {
        es: "Diseñé y desarrollé un sistema de **inteligencia competitiva de precios** con **React y BigQuery**, reemplazando reportes estáticos en PowerPoint por dashboards interactivos en tiempo real para marcas como Imperial y Pilsen.",
        en: "Designed and built an end-to-end **competitive pricing intelligence** system with **React and BigQuery**, replacing static PowerPoint reports with real-time interactive dashboards for brands such as Imperial and Pilsen.",
      },
    ],
    metrics: [
      { value: "6", label: { es: "categorías de portafolio", en: "portfolio categories" } },
      { value: "Real-time", label: { es: "inteligencia de precios", en: "pricing intelligence" } },
    ],
    scope: [
      {
        title: { es: "Categorías gestionadas", en: "Categories managed" },
        items: [
          { es: "Cerveza", en: "Beer" },
          { es: "Bebidas alcohólicas saborizadas", en: "Flavored alcoholic beverages" },
          { es: "Vinos y destilados", en: "Wines and spirits" },
          { es: "Nutrición y refrescos", en: "Nutrition and soft drinks" },
        ],
      },
      {
        title: { es: "Revenue management", en: "Revenue management" },
        items: [
          { es: "Estrategias de ingresos para optimizar precio y rentabilidad", en: "Revenue strategies to optimize pricing and profitability" },
          { es: "Escaleras de precio alineadas a objetivos de margen", en: "Price ladders aligned with margin targets" },
        ],
      },
      {
        title: { es: "Pricing intelligence", en: "Pricing intelligence" },
        items: [
          { es: "Pipeline de datos en BigQuery", en: "BigQuery data pipeline" },
          { es: "Dashboards interactivos en React", en: "Interactive React dashboards" },
        ],
      },
    ],
    skills: [
      "revenue-management",
      "pricefx",
      "pnl",
      "competitive-intel",
      "dynamic-pricing",
      "sql-bigquery",
      "react",
      "excel",
    ],
  },
  {
    id: "grupo-anc",
    company: "Grupo ANC",
    companyNote: { es: "Renta de vehículos y movilidad", en: "Car rental & mobility" },
    title: { es: "Regional Revenue Manager", en: "Regional Revenue Manager" },
    start: "2024-03",
    end: "2025-11",
    location: { es: "Costa Rica · Regional", en: "Costa Rica · Regional" },
    markets: { es: "Costa Rica · Guatemala · Nicaragua · Perú", en: "Costa Rica · Guatemala · Nicaragua · Peru" },
    industry: { es: "Renta de vehículos", en: "Car rental" },
    chapter: "revenue",
    summary: {
      es: "Estrategia regional de ingresos para una flota de más de 500 vehículos en 4 países.",
      en: "Regional revenue strategy for a 500+ vehicle fleet across 4 countries.",
    },
    highlights: [
      {
        es: "Dirigí la estrategia de ingresos para una flota de **>500 vehículos en 4 países**, logrando **+35% en ingresos**, **+25% en utilización de flota** y **+14% de impacto en precios**.",
        en: "Led regional revenue strategy for a **>500 vehicle fleet across 4 countries**, delivering **+35% revenue**, **+25% fleet utilization** and **+14% pricing impact**.",
      },
      {
        es: "Diseñé **modelos de precios dinámicos** con pronóstico de demanda, estacionalidad y curvas de reserva.",
        en: "Designed **dynamic pricing models** using demand forecasting, seasonality and booking curves.",
      },
      {
        es: "Automaticé la inteligencia competitiva con una **herramienta en VBA** que captura tarifas de la competencia en tiempo real.",
        en: "Automated competitive intelligence with a **VBA tool** that captures competitor rates in real time.",
      },
      {
        es: "Estandaricé y automaticé el **reporte diario de operaciones regional** y lideré la implementación del **RMS**.",
        en: "Standardized and automated the **regional daily operations report** and led the **RMS** rollout.",
      },
    ],
    metrics: [
      { value: "+35%", label: { es: "ingresos", en: "revenue" } },
      { value: "+25%", label: { es: "utilización de flota", en: "fleet utilization" } },
      { value: "+14%", label: { es: "impacto en precios", en: "pricing impact" } },
      { value: "500+", label: { es: "vehículos · 4 países", en: "vehicles · 4 countries" } },
    ],
    scope: [
      {
        title: { es: "Revenue & flota", en: "Revenue & fleet" },
        items: [
          { es: "Renta diaria, renting de largo plazo, fleet management y cuentas corporativas", en: "Daily rentals, long-term renting, fleet management and corporate accounts" },
          { es: "Asignación de vehículos entre sucursales y contratos para minimizar inventario ocioso", en: "Vehicle allocation across branches and contracts to minimize idle inventory" },
        ],
      },
      {
        title: { es: "Pricing & tarifas", en: "Pricing & rates" },
        items: [
          { es: "Demanda, estacionalidad, eventos y tendencias de reserva", en: "Demand, seasonality, events and booking trends" },
          { es: "Monitoreo continuo de la competencia y ajuste de tarifas", en: "Continuous competitor monitoring and rate adjustments" },
        ],
      },
      {
        title: { es: "Análisis & pronóstico", en: "Analysis & forecasting" },
        items: [
          { es: "Pronósticos de demanda y proyecciones de ingresos por línea de negocio", en: "Demand forecasts and revenue projections by business line" },
          { es: "Datos históricos y en tiempo real", en: "Historical and real-time data" },
        ],
      },
      {
        title: { es: "Canales de distribución", en: "Distribution channels" },
        items: [
          { es: "OTAs, cuentas corporativas y contratos de fleet management", en: "OTAs, corporate accounts and fleet management contracts" },
          { es: "Precio, disponibilidad y promociones alineados al negocio", en: "Pricing, availability and promotions aligned with the business" },
        ],
      },
      {
        title: { es: "KPIs", en: "KPIs" },
        items: [
          { es: "RACD — ingreso por día-auto disponible", en: "RACD — Revenue per Available Car Day" },
          { es: "Tasa de utilización de flota", en: "Fleet Utilization Rate" },
          { es: "ADR — tarifa diaria promedio", en: "ADR — Average Daily Rate" },
        ],
      },
      {
        title: { es: "Segmentación & colaboración", en: "Segmentation & collaboration" },
        items: [
          { es: "Segmentos leisure, corporativo y largo plazo", en: "Leisure, corporate and long-term segments" },
          { es: "Trabajo con marketing, ventas y operaciones; insights para la alta gerencia", en: "Partnering with marketing, sales and operations; insights for senior management" },
          { es: "Implementación y optimización del RMS y herramientas de flota", en: "RMS and fleet tool implementation and optimization" },
        ],
      },
    ],
    skills: [
      "revenue-management",
      "dynamic-pricing",
      "forecasting",
      "competitive-intel",
      "fleet-optimization",
      "rms",
      "vba",
      "excel",
      "stakeholder-mgmt",
    ],
  },
  {
    id: "genpact-tax",
    company: "Genpact",
    companyNote: { es: "Cliente: Walmart LATAM", en: "Client: Walmart LATAM" },
    title: { es: "Analista Fiscal Senior", en: "Senior Tax Analyst" },
    start: "2022-02",
    end: "2024-03",
    location: { es: "Costa Rica", en: "Costa Rica" },
    markets: { es: "Entidades de México", en: "Mexican entities" },
    industry: { es: "BPO · Servicios financieros", en: "BPO · Financial services" },
    chapter: "finance",
    promotedFrom: "genpact-ar",
    summary: {
      es: "Impuestos, auditoría y transformación digital: automatización de reportes y mejora continua.",
      en: "Tax, audit and digital transformation: reporting automation and continuous improvement.",
    },
    highlights: [
      {
        es: "Automaticé flujos de reportes con **Power Automate**, eliminando el **60% del tiempo de procesamiento manual** en tableros para gerentes.",
        en: "Automated reporting workflows with **Power Automate**, cutting **60% of manual processing time** on manager dashboards.",
      },
      {
        es: "Desarrollé una suite de **macros VBA** para tareas repetitivas, reduciendo el **35% del tiempo de proceso** y mejorando la calidad.",
        en: "Developed a **VBA macro** suite for repetitive tasks, reducing **processing time by 35%** and improving quality.",
      },
      {
        es: "Diseñé tableros de desempeño financiero en **Power BI** adoptados como el **estándar de reporte**.",
        en: "Designed financial performance dashboards in **Power BI** adopted as the **standard reporting tool**.",
      },
      {
        es: "Impulsé la mejora continua como **Lean Digital Ambassador** y audité entidades de México para recuperar saldos en AR, AP y ajustes contables.",
        en: "Drove continuous improvement as **Lean Digital Ambassador** and audited Mexican entities to recover balances in AR, AP and accounting adjustments.",
      },
    ],
    metrics: [
      { value: "−60%", label: { es: "tiempo de procesamiento manual", en: "manual processing time" } },
      { value: "−35%", label: { es: "tiempo de proceso con VBA", en: "processing time with VBA" } },
    ],
    scope: [
      {
        title: { es: "Auditoría & recuperación", en: "Audit & recovery" },
        items: [
          { es: "Auditorías integrales de procesos de débito y crédito", en: "End-to-end audits of debit and credit processes" },
          { es: "Estrategias de recuperación de saldos y controles financieros", en: "Balance recovery strategies and financial controls" },
        ],
      },
      {
        title: { es: "Transformación digital", en: "Digital transformation" },
        items: [
          { es: "Lean Digital Ambassador (LDA) para México", en: "Lean Digital Ambassador (LDA) for Mexico" },
          { es: "Certificador autorizado de proyectos de mejora continua", en: "Authorized certifier for continuous improvement projects" },
        ],
      },
      {
        title: { es: "BI & datos", en: "BI & data" },
        items: [
          { es: "Dashboards semanales en Power BI para supervisores y gerentes", en: "Weekly Power BI dashboards for supervisors and managers" },
          { es: "Extracción, transformación y modelado con Power Query", en: "Extraction, transformation and modeling with Power Query" },
        ],
      },
      {
        title: { es: "Automatización", en: "Automation" },
        items: [
          { es: "Flujos en Power Automate para reducir carga manual", en: "Power Automate workflows to reduce manual workload" },
          { es: "Macros VBA robustas para tareas repetitivas", en: "Robust VBA macros for repetitive tasks" },
        ],
      },
      {
        title: { es: "Dominio fiscal", en: "Tax domain" },
        items: [
          { es: "Impuesto sobre la renta y legislación fiscal", en: "Income tax and tax law" },
          { es: "Impuesto corporativo, NIIF/IFRS y contabilidad", en: "Corporate tax, IFRS and accounting" },
        ],
      },
    ],
    skills: [
      "tax",
      "audit",
      "power-automate",
      "vba",
      "power-bi",
      "power-query",
      "excel",
      "lean-six-sigma",
      "digital-transformation",
      "process-improvement",
      "requirements",
    ],
  },
  {
    id: "genpact-ar",
    company: "Genpact",
    companyNote: { es: "Operaciones de Walmart LATAM", en: "Walmart LATAM operations" },
    title: { es: "Process Developer — Cuentas por Cobrar", en: "Process Developer — Accounts Receivable" },
    start: "2019-11",
    end: "2022-02",
    location: { es: "Costa Rica", en: "Costa Rica" },
    markets: { es: "Centroamérica · México · Chile · Argentina", en: "Central America · Mexico · Chile · Argentina" },
    industry: { es: "BPO · Retail", en: "BPO · Retail" },
    chapter: "finance",
    summary: {
      es: "Dueño de procesos de facturación y allowances de proveedores; migración de aplicación de pagos.",
      en: "Process owner for billing and vendor allowances; cash application migration.",
    },
    highlights: [
      {
        es: "Mantuve una **precisión de facturación del 99.8%** mensual y lideré la migración de aplicación de pagos de punta a punta con una **mejora del 45% en eficiencia**.",
        en: "Sustained **99.8% monthly billing accuracy** and led the end-to-end cash application migration with a **45% efficiency improvement**.",
      },
      {
        es: "**Dueño del proceso** de allowances de proveedores, cumplimiento de acuerdos comerciales y reportes de KPIs.",
        en: "**Process owner** for vendor allowances, commercial agreement compliance and KPI reporting.",
      },
    ],
    metrics: [
      { value: "99.8%", label: { es: "precisión de facturación", en: "billing accuracy" } },
      { value: "+45%", label: { es: "eficiencia en aplicación de pagos", en: "cash application efficiency" } },
    ],
    scope: [
      {
        title: { es: "Vendor allowances · Process owner", en: "Vendor allowances · Process owner" },
        items: [
          { es: "Gestión de acuerdos comerciales con proveedores", en: "Commercial agreement management with vendors" },
          { es: "Revisión detallada de acuerdos", en: "Detailed agreement review" },
          { es: "Reportes quincenales de desempeño", en: "Bi-weekly performance reporting" },
        ],
      },
      {
        title: { es: "Facturación · Process owner", en: "Billing · Process owner" },
        items: [
          { es: "Rentas fijas y variables, incluyendo excepciones", en: "Fixed and variable rents, including exceptions" },
          { es: "Notas de crédito y débito", en: "Credit and debit notes" },
          { es: "Gastos, intereses y energía", en: "Expenses, interest and energy" },
          { es: "Terceros: carnes, publicidad y comisiones", en: "Third parties: meat, advertising and commissions" },
          { es: "Datos maestros de proveedores", en: "Supplier master data" },
        ],
      },
      {
        title: { es: "Aplicación de pagos · Auditoría", en: "Cash application · Audit" },
        items: [
          { es: "Migración del proceso con mejora de eficiencia y control", en: "Process migration improving efficiency and control" },
        ],
      },
    ],
    skills: ["accounts-receivable", "billing", "commercial-agreements", "process-improvement", "excel"],
  },
  {
    id: "walmart",
    company: "Walmart LATAM",
    title: { es: "Process Developer — Cuentas por Cobrar", en: "Process Developer — Accounts Receivable" },
    start: "2018-12",
    end: "2019-10",
    location: { es: "Costa Rica", en: "Costa Rica" },
    markets: { es: "Centroamérica · México · Chile · Argentina", en: "Central America · Mexico · Chile · Argentina" },
    industry: { es: "Retail", en: "Retail" },
    chapter: "finance",
    summary: {
      es: "Cobranza del portafolio argentino y facturación multinacional.",
      en: "Argentina portfolio collections and multinational billing.",
    },
    highlights: [
      {
        es: "**Top 3 en cobranza** del portafolio de Argentina; dueño de la facturación para **Centroamérica, México, Chile y Argentina**.",
        en: "**Top 3 collector** for the Argentina portfolio; billing owner for **Central America, Mexico, Chile and Argentina**.",
      },
    ],
    metrics: [
      { value: "Top 3", label: { es: "cobranza · portafolio Argentina", en: "collector · Argentina portfolio" } },
      { value: "4", label: { es: "mercados facturados", en: "markets billed" } },
    ],
    scope: [
      {
        title: { es: "Cobranza · Argentina", en: "Collections · Argentina" },
        items: [
          { es: "Reconocido entre los 3 mejores cobradores del portafolio", en: "Ranked among the top 3 collectors in the portfolio" },
        ],
      },
      {
        title: { es: "Facturación · Process owner", en: "Billing · Process owner" },
        items: [
          { es: "Rentas fijas y variables, incluyendo excepciones", en: "Fixed and variable rents, including exceptions" },
          { es: "Notas de crédito y débito, energía e intereses", en: "Credit and debit notes, energy and interest" },
          { es: "Facturación a terceros y de gastos", en: "Third-party and expense billing" },
          { es: "Datos maestros de proveedores", en: "Supplier master data" },
        ],
      },
      {
        title: { es: "Revisión de acuerdos", en: "Agreement review" },
        items: [
          { es: "Acuerdos comerciales CAM · MX · CL · AR", en: "Commercial agreements CAM · MX · CL · AR" },
        ],
      },
    ],
    skills: ["accounts-receivable", "collections", "billing", "commercial-agreements", "excel"],
  },
  {
    id: "grupo-stt",
    company: "Grupo STT",
    title: { es: "Process Developer", en: "Process Developer" },
    start: "2018-03",
    end: "2018-11",
    location: { es: "Costa Rica", en: "Costa Rica" },
    markets: { es: "Centroamérica · México · Chile · Argentina", en: "Central America · Mexico · Chile · Argentina" },
    industry: { es: "BPO · Servicios financieros", en: "BPO · Financial services" },
    chapter: "finance",
    summary: {
      es: "Cuentas por cobrar y facturación multinacional.",
      en: "Accounts receivable and multinational billing.",
    },
    highlights: [
      {
        es: "Gestión de **cuentas por cobrar** y **facturación multinacional**.",
        en: "Managed **accounts receivable** and **multinational billing**.",
      },
    ],
    metrics: [{ value: "4", label: { es: "mercados en revisión de acuerdos", en: "markets in agreement review" } }],
    scope: [
      {
        title: { es: "Responsabilidades", en: "Responsibilities" },
        items: [
          { es: "Revisión de acuerdos comerciales CAM · MX · CL · AR", en: "Commercial agreement review CAM · MX · CL · AR" },
          { es: "Cobranza del portafolio de Argentina", en: "Argentina portfolio collections" },
          { es: "Ejecución de procesos de facturación", en: "Billing process execution" },
        ],
      },
    ],
    skills: ["accounts-receivable", "collections", "billing", "commercial-agreements"],
  },
  {
    id: "mundo-rep",
    company: "Mundo REP",
    title: { es: "Analista Financiero", en: "Financial Analyst" },
    start: "2016-12",
    end: "2017-11",
    location: { es: "Costa Rica", en: "Costa Rica" },
    markets: { es: "6 empresas afiliadas", en: "6 affiliated companies" },
    industry: { es: "Servicios financieros", en: "Financial services" },
    chapter: "finance",
    summary: {
      es: "Cierres contables, conciliaciones bancarias y facturación local.",
      en: "Accounting closes, bank reconciliations and local billing.",
    },
    highlights: [
      {
        es: "Gestión de **conciliaciones** contables, **cierres financieros** y facturación local.",
        en: "Managed accounting **closes**, bank **reconciliations** and local billing.",
      },
      {
        es: "Coordiné los **cierres mensuales de 6 empresas afiliadas**, asegurando exactitud y cumplimiento.",
        en: "Led **monthly closes for 6 affiliated companies**, ensuring accuracy and compliance.",
      },
    ],
    metrics: [{ value: "6", label: { es: "empresas con cierre mensual", en: "companies closed monthly" } }],
    scope: [
      {
        title: { es: "Control financiero", en: "Financial control" },
        items: [
          { es: "Monitoreo y conciliación de todas las cuentas bancarias", en: "Monitoring and reconciling all bank accounts" },
          { es: "Controles de caja chica", en: "Petty cash controls" },
          { es: "Control de inventarios", en: "Inventory control" },
        ],
      },
      {
        title: { es: "Operación", en: "Operations" },
        items: [
          { es: "Soporte a cuentas por cobrar y por pagar", en: "Accounts receivable and payable support" },
          { es: "Facturación oportuna y precisa", en: "Timely and accurate invoicing" },
          { es: "Reportes para la gerencia", en: "Management reporting" },
        ],
      },
    ],
    skills: ["accounting", "accounts-receivable", "billing", "excel"],
  },
];

export const roleById = new Map(roles.map((r) => [r.id, r]));
