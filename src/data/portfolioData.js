// ============================================================
// portfolioData.js — ALL content for the portfolio lives here.
// Components only read from this file.
// ============================================================

export const personalInfo = {
  name: "Prathvi S Jathan",
  brandName: "Prathvi S Jathan",
  role: "Data Analyst",
  city: "Udupi, India",
  timezone: "Asia/Kolkata", // IANA timezone used by the live clock in the HUD
  email: "prathvisjathan@gmail.com",
  phone: "+91 8792284660",
  availability: "Open to Data Analyst roles & internships",
};

export const academy = {
  name: "TAP Academy",
  url: "https://thetapacademy.com/",
};

export const socialLinks = {
  github: "https://github.com/Prathvi-Jathan",
  linkedin: "https://www.linkedin.com/in/prathvi-s-jathan-437314313",
  instagram: "",
};

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#projects" },
  { label: "Journey", href: "#journey" },
  { label: "Contact", href: "#contact" },
];

export const heroContent = {
  eyebrow: "PORTFOLIO — 2026",
  intro: "I turn raw data into meaningful insights through data analysis, visualization, and storytelling.",
  statusLines: [
    "Analyzing data with Python & SQL",
    "Creating dashboards with Power BI",
    "Turning data into actionable insights",
  ],
  ctaPrimary: { label: "View projects", href: "#projects" },
  ctaSecondary: { label: "Get in touch", href: "#contact" },
};

export const aboutContent = {
  label: "01 / About",
  heading: "Turning raw data into actionable insights.",
  paragraph:
    "I am a Data Analyst focused on transforming complex data into clear, impactful visual stories and business insights. I work with Python, SQL, Power BI, Tableau, and Excel to build intuitive dashboards and drive data-informed decisions. I am sharpening my skills through the placement training program at TAP Academy.",
  stats: [
    { value: 2, suffix: "+", label: "Projects Completed" },
    { value: 4, suffix: "+", label: "Technologies Learnt" },
    { value: 2, suffix: "", label: "Internships Completed" },
  ],
};

export const skillGroups = [
  {
    title: "Programming & Querying",
    items: ["Python", "SQL", "Pandas", "NumPy"],
  },
  {
    title: "Data Analysis",
    items: ["Data Cleaning", "Exploratory Data Analysis", "Statistical Analysis", "Data Modeling"],
  },
  {
    title: "Visualization & BI",
    items: ["Power BI", "Tableau", "Dashboard Development", "Data Storytelling"],
  },
  {
    title: "Spreadsheet & Tools",
    items: ["Microsoft Excel", "Git", "GitHub", "VS Code"],
  },
];

export const projects = [
  {
    id: "project-1",
    number: "01",
    title: "VocalBridge – AI-Powered Multilingual Voice Dubbing",
    description:
      "Converts speech from one language into another while preserving the original speaker's voice using speech recognition, language translation, and voice synthesis.",
    tags: ["Python", "Voice Cloning", "FFmpeg"],
    year: "2025",
    liveUrl: "https://github.com/Prathvi-Jathan/AI-Powered-Voice-Dubbing",
    githubUrl: "https://github.com/Prathvi-Jathan/AI-Powered-Voice-Dubbing",
  },
  {
    id: "project-2",
    number: "02",
    title: "Neighborhood Problem Reporting & Resolution",
    description:
      "Community issue reporting and resolution platform with incident tracking, status workflows, and SQL analytics.",
    tags: ["Django", "SQL", "Bootstrap"],
    year: "2026",
    liveUrl: "https://github.com/Prathvi-Jathan",
    githubUrl: "https://github.com/Prathvi-Jathan",
  },
];

export const experience = [
  {
    period: "2026 — Present",
    role: "Data Analytics Training",
    org: "TAP Academy",
    description:
      "Developing practical skills in Python, SQL, Excel, Power BI, Tableau, and data visualization.",
  },
  {
    period: "2026",
    role: "Full-Stack Web Developer",
    org: "VrishankSoft OPC Ltd.",
    description:
      "Developed a Neighborhood Problem Reporting and Resolution website using HTML, CSS, Bootstrap, Django, and SQL.",
  },
];

export const contactContent = {
  label: "04 / Contact",
  heading: "Let's build something.",
  note: "Have a data project, question, or opportunity? Send a message — I reply promptly.",
};

export const footerContent = {
  tagline: "Designed & built by hand.",
};

// EmailJS — values come from .env.local (variables must start with VITE_)
export const emailjsConfig = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID || "YOUR_EMAILJS_SERVICE_ID",
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "YOUR_EMAILJS_TEMPLATE_ID",
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "YOUR_EMAILJS_PUBLIC_KEY",
};

