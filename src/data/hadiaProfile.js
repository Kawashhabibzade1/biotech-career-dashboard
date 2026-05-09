// Hadia Awan — Full CV Profile (extracted from Europass CV)
export const hadiaProfile = {
  name: "Hadia Awan",
  title: "Embryologist & Biotechnology Professional",
  email: "hadiaawan64@gmail.com",
  nationality: "Pakistani",
  dob: "28/12/1999",
  currentLocation: "Bristol, United Kingdom",
  targetLocation: "Germany",
  visa: "Pakistani national — will require work visa/sponsorship for Germany",

  summary:
    "Embryologist with 3+ years of hands-on experience in IVF laboratories and advanced reproductive technologies. Currently pursuing MSc in Reproduction and Development at the University of Bristol (UK). Expert in oocyte handling, IVM, IVF, embryo culture, embryo grading, and cryopreservation. Published researcher with NGS and CRISPR experience.",

  education: [
    {
      degree: "MSc Reproduction and Development",
      institution: "University of Bristol",
      country: "United Kingdom",
      period: "09/2025 – Current",
      focus: ["Human reproductive biology", "Assisted reproductive technologies (ART)", "Embryo development", "Clinical embryology"],
    },
    {
      degree: "Exchange Student (Agriculture, Food and Biotechnology)",
      institution: "University of Kentucky",
      country: "United States",
      period: "03/2022 – 06/2022",
    },
    {
      degree: "BS Biotechnology",
      institution: "Government College University Faisalabad",
      country: "Pakistan",
      period: "09/2018 – 08/2022",
      grade: "3.85 GPA",
    },
  ],

  workExperience: [
    {
      title: "Scientific Project Manager & Embryology Lead",
      company: "Dayzee Private Limited",
      location: "Bahawalpur, Pakistan",
      period: "02/2025 – Current",
      highlights: [
        "Led operational setup of large-scale IVEP laboratory",
        "Coordinated embryo production workflows using Vytelle-powered IVEP system",
        "Bovine IVM, IVF, IVC, embryo grading",
        "Embryo cryopreservation — vitrification & freezing",
        "Team management (embryologists, technicians, field staff)",
      ],
    },
    {
      title: "IVF Lab Manager",
      company: "Fongrow Cattle Breed Improvement & Research Centre",
      location: "Khanewal, Pakistan",
      period: "04/2024 – 02/2025",
      highlights: [
        "Established new IVF laboratory from ground up",
        "Developed and implemented SOPs for oocyte handling, IVM, IVF, embryo culture, cryopreservation",
        "Oocyte searching, grading, embryo culture, blastocyst assessment",
        "Trained junior embryologists in quality control",
        "Lab inventory and consumable management",
      ],
    },
    {
      title: "Bovine Embryologist",
      company: "Royal Cell Biotechnology",
      location: "Pakistan",
      period: "07/2022 – 03/2024",
      highlights: [
        "Follicular aspiration, oocyte searching and grading",
        "Semen handling and preparation for IVF",
        "IVM, IVF, IVC procedures",
        "Slow-freezing/vitrification of embryos",
        "Quality control and lab cleanliness",
      ],
    },
    {
      title: "Student Researcher",
      company: "University of Kentucky",
      location: "Lexington, USA",
      period: "03/2022 – 06/2022",
      highlights: [
        "Studied effect of AGL15 on Arabidopsis Thaliana using NGS",
        "Tissue culture, DNA/RNA extractions, cDNA synthesis",
        "Chromatin Immunoassay, ChIP-on-chip analysis, RT-qPCR setup",
        "Statistical analysis of research data",
      ],
    },
    {
      title: "Biotechnology Intern",
      company: "National Institute of Genomics and Advanced Biotechnology (NIGAB)",
      location: "Pakistan",
      period: "09/2021 – 10/2021",
      highlights: [
        "Yield enhancement of wheat using CRISPR/Cas9 editing",
        "Media preparation, cell culturing, RNA extraction, cDNA synthesis, PCR",
        "Data analysis on experiments",
      ],
    },
  ],

  publications: [
    {
      title:
        "Revisting AGAMOUS-Like15, a Key Somatic Embryogenesis Regulator, using Next Generation Sequencing Analysis in Arabidopsis",
      journal: "International Journal of Molecular Sciences",
      year: 2022,
    },
  ],

  awards: [
    "Empower HER Award — National Incubation Centre (2024)",
    "StartUp Hackathon — Singapore Fintech Festival / Bank of Punjab (2023)",
    "Global UGRAD Scholarship — U.S. Department of State (2022)",
    "Active Peace Leader Award — Volunteer Force Pakistan (2021)",
    "Merit Certificate — Government of Punjab (2018)",
  ],

  skills: {
    // Tier 1 — Core IVF/Embryology (highest weight in scoring)
    tier1: [
      "Oocyte identification, handling & grading",
      "In-vitro fertilization (IVF) laboratory procedures",
      "Embryo culture & blastocyst development monitoring",
      "Embryo morphological assessment & grading",
      "Embryo cryopreservation (vitrification & freezing)",
      "Cryopreservation through Vitrification",
      "IVF laboratory quality control & aseptic techniques",
      "Laboratory inventory & consumable management",
      "Embryology data tracking & performance monitoring",
      "In-vitro Maturation (IVM)",
      "Semen handling & preparation",
      "SOP development & implementation",
    ],
    // Tier 2 — Molecular Biology
    tier2: [
      "Molecular biology techniques (DNA/RNA extraction, RT-qPCR)",
      "Genomics research & Next-Generation Sequencing (NGS)",
      "CRISPR/Cas9 gene editing",
      "Tissue culture & cell culturing",
      "cDNA synthesis",
      "Chromatin Immunoassay (ChIP)",
      "Statistical data analysis",
    ],
    // Tier 3 — Soft/Management
    tier3: [
      "Team management & leadership",
      "Laboratory setup & project management",
      "Scientific writing & publication",
      "Training and mentoring",
      "Entrepreneurship",
    ],
  },

  languages: [
    { language: "English", level: "Fluent (professional)" },
    { language: "Urdu", level: "Native" },
    { language: "German", level: "None (target to learn)" },
  ],

  // Keywords recruiters search for — tailored for German biotech market
  recruiterKeywords: [
    "Embryologist",
    "IVF Laboratory Scientist",
    "Clinical Embryologist",
    "Reproductive Biology",
    "ART Specialist",
    "Cryopreservation",
    "Vitrification",
    "Oocyte Handling",
    "Embryo Culture",
    "NGS Scientist",
    "Molecular Biologist",
    "Biotech Research Scientist",
    "Life Science",
    "Cell Biology",
    "Laboratory Manager",
  ],

  // Career paths sorted by fit
  careerPaths: [
    { path: "Clinical Embryologist (Human IVF)", fit: 95, description: "Direct match — ART clinics in Germany" },
    { path: "Reproductive Biology R&D", fit: 88, description: "Pharma/biotech R&D (Ferring, Merck)" },
    { path: "IVF Product Specialist / Application Scientist", fit: 82, description: "IVF product companies (Vitrolife, CooperSurgical)" },
    { path: "Molecular Biology / Genomics Research", fit: 70, description: "NGS & CRISPR experience leveraged" },
    { path: "Preimplantation Genetic Testing (PGT)", fit: 68, description: "Combines embryology + genomics" },
    { path: "QA/QC Laboratory Scientist", fit: 55, description: "SOP and quality control background" },
    { path: "Bioprocess / Cell Culture Scientist", fit: 50, description: "Cell culture skills applicable" },
  ],

  missingSkills: [
    "German language (major gap for clinical roles)",
    "GMP / GLP certification",
    "Human ART clinical experience (currently bovine)",
    "Regulatory Affairs knowledge",
    "Bioinformatics / data analysis tools (Python/R)",
    "HPLC / analytical chemistry",
    "EU work authorization (visa required)",
  ],
};
