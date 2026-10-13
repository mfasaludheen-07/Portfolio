/**
 * Portfolio Configuration File
 * -------------------------------------------------------------
 * Edit this file to customize all personal details, links,
 * timeline milestones, projects, and skills displayed on the website.
 *
 * Missing or placeholder values (e.g. "[YOUR_...]") are automatically
 * detected and handled gracefully without leaving broken links or buttons.
 */

export const portfolioConfig = {
  // 1. Personal & Contact Information
  personal: {
    name: "Muhammed Fasaludheen C.A",
    initials: "MF",
    role: "Cybersecurity Enthusiast & Web Developer",
    location: "[YOUR_LOCATION]",
    email: "[YOUR_EMAIL]",
    intro:
      "I explore cybersecurity and build useful web experiences, with a focus on learning, problem-solving, and secure development.",
    aboutHeading: "Building with curiosity, engineering with security in mind",
    aboutBio:
      "I am an enthusiastic learner dedicated to exploring the intersection of modern web development and cybersecurity. From structuring clean, responsive frontends to investigating how software systems defend against vulnerabilities, I focus on hands-on experimentation, disciplined problem-solving, and continuous learning."
  },

  // 2. Profiles & External Links
  // Leave empty ("") or keep placeholder to hide the corresponding button/icon.
  social: {
    github: "https://github.com/mfasaludheen-07",
    linkedin: "https://www.linkedin.com/in/muhammad-fasaludheen-c-a-",
    instagram: "[OPTIONAL_INSTAGRAM_URL]",
    // Path to your local resume PDF (e.g. "assets/resume.pdf") or remote URL:
    resume: "[LOCAL_RESUME_PDF_PATH]"
  },

  // 3. Career & Learning Timeline
  // Centered heading: "My career & experience" ("experience" in purple)
  timeline: [
    {
      role: "Learning & Building",
      year: "NOW",
      description:
        "Exploring web security, developing personal projects, and documenting hands-on learning."
    },
    {
      role: "CNC Machine Operator",
      year: "2024 - 2026",
      description:
        "Operating precision CNC machinery, executing technical specifications, maintaining operational safety standards, and ensuring strict component quality control."
    },
    {
      role: "Web Development Fundamentals",
      year: "2024",
      description:
        "Creating responsive frontend interfaces and backend prototypes with HTML, CSS, JavaScript, PHP, and MySQL."
    },
    {
      role: "Systems & Security Foundations",
      year: "2023",
      description:
        "Studying networking essentials, Linux command line workflows, and introductory cybersecurity methodologies."
    }
  ],

  // 4. Projects Showcase
  // Heading: "My Work" ("Work" in purple)
  // Displayed in the horizontal scrolling track on desktop and responsive stacked cards on mobile.
  projects: [
    {
      id: "fixmydevice",
      number: "01",
      title: "FixMyDevice",
      category: "Web Application & Service Tracking",
      summary:
        "Electronic-device complaint submission and service tracking platform engineered to streamline fault intake and diagnostics.",
      fullDescription:
        "FixMyDevice is a practical web application designed to help users log electronic hardware faults, track technician triage in real time, and monitor repair milestones. Built with structured workflows, validation, and transparent customer updates.",
      tools: ["HTML5", "CSS3", "JavaScript", "PHP", "MySQL"],
      features: [
        "Structured hardware complaint logging",
        "Step-by-step diagnostic status progression",
        "Searchable ticket registry and history",
        "Responsive, accessible repair portal"
      ],
      image: "assets/projects/fixmydevice.svg",
      imageAlt: "FixMyDevice complaint submission and service tracking dashboard preview",
      isPlaceholder: false,
      // Provide valid URLs when ready (or leave empty to cleanly hide the action buttons):
      liveUrl: "",
      sourceUrl: ""
    }
  ],

  // 5. Tools & Interests ("Tools I Use & Explore")
  tools: [
    { name: "HTML", icon: "assets/icons/html.svg", category: "Markup" },
    { name: "CSS", icon: "assets/icons/css.svg", category: "Styling" },
    { name: "JavaScript", icon: "assets/icons/javascript.svg", category: "Language" },
    { name: "PHP", icon: "assets/icons/php.svg", category: "Backend" },
    { name: "MySQL", icon: "assets/icons/mysql.svg", category: "Database" },
    { name: "Python", icon: "assets/icons/python.svg", category: "Scripting" },
    { name: "Git", icon: "assets/icons/git.svg", category: "Version Control" },
    { name: "GitHub", icon: "assets/icons/github.svg", category: "Collaboration" },
    { name: "Linux", icon: "assets/icons/linux.svg", category: "Environment" }
  ]
};

/**
 * Utility check: returns true only when a configured string has a real value
 * that is not empty, whitespace, or a bracketed placeholder like "[YOUR_NAME]".
 */
export function isConfigured(value) {
  if (!value || typeof value !== "string") return false;
  const trimmed = value.trim();
  if (!trimmed) return false;
  if (trimmed.startsWith("[") && trimmed.endsWith("]")) return false;
  return true;
}

/**
 * Validates a web URL (http, https, or relative document path like assets/resume.pdf).
 */
export function isValidUrl(url) {
  if (!isConfigured(url)) return false;
  const trimmed = url.trim();
  if (trimmed === "#" || trimmed.startsWith("javascript:")) return false;
  return (
    trimmed.startsWith("http://") ||
    trimmed.startsWith("https://") ||
    trimmed.startsWith("www.") ||
    trimmed.startsWith("/") ||
    trimmed.startsWith("./") ||
    trimmed.startsWith("assets/") ||
    trimmed.endsWith(".pdf")
  );
}

/**
 * Validates an email address.
 */
export function isValidEmail(email) {
  if (!isConfigured(email)) return false;
  const trimmed = email.trim();
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed);
}
