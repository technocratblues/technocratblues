// Brand
export const BRAND = {
  name: 'Technocrat Blues',
  nameColored: { base: 'Technocrat', accent: ' Blues' },
  tagline: 'Engineering & Technology Consulting',
  company: 'Technocrat Blues Pvt Ltd',
  address: {
    line1: 'Baner, Pune, Maharashtra — 411045',
    line2: 'India',
    short: 'Baner, Pune, Maharashtra — 411045, India',
  },
  copyright: `Copyright © ${new Date().getFullYear()} Technocrat Blues Pvt Ltd — All Rights Reserved`,
};

import logoImg from './assets/img/logo.jpg';

export const LOGO = {
  src: logoImg,
  alt: 'Technocrat Blues',
};

export const NAV_LINKS = [
  { label: 'Home',     href: '#home' },
  { label: 'About',    href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Clients',  href: '#clients' },
  { label: 'Careers',  href: '/careers', isRoute: true },
];

// Hero
export const HERO_HEADLINE = {
  line1: 'Technology that',
  line2: 'moves business',
  line3: 'forward',
  description:
    'We turn ambitious ideas into dependable digital products, engineered to scale and built to endure',
};

// Services
export const SERVICES = [
  {
    title: 'Web & Mobile Application Development',
    desc: 'Modern, intuitive applications built for real users and evolving business needs',
  },
  {
    title: 'Digital Product Engineering & Architecture',
    desc: 'Thoughtful architecture and end-to-end engineering for products made to last',
  },
  {
    title: 'Scalable Technology Solutions',
    desc: 'Flexible technology foundations that perform today and grow with tomorrow',
  },
  {
    title: 'Reliable, Client-Centric Delivery',
    desc: 'Clear communication, disciplined execution, and outcomes centered on your goals',
  },
];


// About
export const ABOUT_VALUES = [
  { label: 'Product Mindset', desc: 'We think in outcomes, not just outputs — every line of code serves a purpose' },
  { label: 'Ownership',       desc: 'We treat your product like our own, with full accountability end to end' },
  { label: 'Speed & Craft',   desc: 'We move fast without cutting corners — quality and velocity, together' },
];

// Contact
export const CONTACT_FORM = {
  scriptUrl: import.meta.env.VITE_CONTACT_SCRIPT_URL,
};

export const CONTACT_DOMAINS = [
  'Web Development',
  'Mobile Development',
  'AI / ML Integration',
  'Product Architecture',
  'Tech Consulting',
  'Other',
];

// Social / External Links
export const SOCIAL_LINKS = {
  github:   'https://github.com/technocratblues',
  linkedin: 'https://www.linkedin.com/company/technocrat-blues/posts/',
};

// Capability Card Details
export const CAPABILITY_DETAILS = {
  'Application Development': {
    emoji: '📱',
    tagline: 'Ideas turned into products people actually use',
    highlights: [
      'Web and mobile apps built for real workflows',
      'Clean interfaces, reliable backends',
      'Delivered iteratively, improved continuously',
    ],
    color: { from: '#7078D0', to: '#6B91FF' },
    accentBg: 'rgba(112, 120, 208, 0.07)',
  },
  'Product Engineering': {
    emoji: '⚙️',
    tagline: 'Built right, not just built fast',
    highlights: [
      'Thoughtful architecture from the ground up',
      'Code that is maintainable, testable, extensible',
      'Engineering decisions made with longevity in mind',
    ],
    color: { from: '#9B88F0', to: '#C4A8FF' },
    accentBg: 'rgba(155, 136, 240, 0.07)',
  },
  'Scalable Tech': {
    emoji: '📈',
    tagline: 'Systems that grow with your business',
    highlights: [
      'Foundations designed to handle more over time',
      'Modern cloud-friendly infrastructure choices',
      'Performance and reliability baked in early',
    ],
    color: { from: '#5B8DEF', to: '#38BDF8' },
    accentBg: 'rgba(91, 141, 239, 0.07)',
  },
  'Client-Centric': {
    emoji: '🤝',
    tagline: 'Your goals drive every decision we make',
    highlights: [
      'Close collaboration throughout the process',
      'Clear communication, no surprises',
      'Outcomes that align with your business',
    ],
    color: { from: '#7078D0', to: '#6B91FF' },
    accentBg: 'rgba(112, 120, 208, 0.07)',
  },
};

// ── Careers Page ─────────────────────────────────────────────────────────────
// CAREERS_LISTINGS — add/remove job objects here to control what appears on /careers.
// Each entry needs a unique `slug` that becomes the URL anchor: /careers#<slug>
//
// skill groups: each group has a `label` (section heading) and `items[]` (skill rows).
// This is intentionally generic — groups can be Frontend/Backend, iOS/Android, etc.
export const CAREERS_LISTINGS = [
  {
    // ── Full Stack Developer ──────────────────────────────────────────────
    slug:        'full-stack-developer',
    active:      true,
    badge:       'We Are Hiring',
    role:        'Full Stack Developer',
    type:        'Full-time',
    location:    'Remote / Baner, Pune',
    experience:  '3–6 Years',
    description:
      'We are looking for a passionate Full Stack Developer who loves building scalable, high-performance web applications and great user experiences.',

    skillGroups: [
      {
        label: 'Frontend',
        icon: 'monitor',
        items: [
          { title: 'React',        desc: 'Build dynamic and responsive user interfaces' },
          { title: 'TypeScript',   desc: 'Write safe, scalable and maintainable code' },
          { title: 'Tailwind CSS', desc: 'Create beautiful, modern and consistent UI with ease' },
        ],
      },
      {
        label: 'Backend',
        icon: 'server',
        items: [
          { title: 'Spring Boot', desc: 'Develop robust and scalable RESTful APIs' },
          { title: 'Java',        desc: 'Build secure, reliable and high-performance applications' },
          { title: 'PostgreSQL',  desc: 'Design and optimize reliable and efficient databases' },
        ],
      },
    ],

    whyJoinUs: [
      'Work on impactful and challenging projects',
      'Collaborate with a talented and supportive team',
      'Continuous learning and growth opportunities',
      'Flexible work environment',
      'Competitive salary and benefits',
    ],

    apply: {
      email:   'careers@technocratblues.com',
      tagline: "Let's build the future together!",
      mailto:  'mailto:careers@technocratblues.com',
    },
  },

  {
    // ── Mobile Developer ──────────────────────────────────────────────────
    slug:        'mobile-developer',
    active:      false,           // ← set true to re-enable this listing
    badge:       'We Are Hiring',
    role:        'Mobile Developer',
    type:        'Full-time',
    location:    'Remote / Baner, Pune',
    experience:  '2–5 Years',
    description:
      'We are looking for a talented Mobile Developer to craft beautiful, performant cross-platform apps that delight users on every screen.',

    skillGroups: [
      {
        label: 'Cross-Platform',
        icon: 'mobile',
        items: [
          { title: 'React Native', desc: 'Build cross-platform apps with a single codebase' },
          { title: 'TypeScript',   desc: 'Type-safe, maintainable mobile codebases' },
          { title: 'Expo',         desc: 'Rapid development and OTA updates made simple' },
        ],
      },
      {
        label: 'Native & Backend',
        icon: 'server',
        items: [
          { title: 'Android / Kotlin', desc: 'Write idiomatic Android code with modern Kotlin' },
          { title: 'REST / GraphQL',   desc: 'Consume and design robust API contracts' },
          { title: 'Firebase',         desc: 'Real-time data, auth, and cloud functions' },
        ],
      },
    ],

    whyJoinUs: [
      'Ship apps used by thousands of real users',
      'Work closely with designers and product leads',
      'Freedom to influence technical direction',
      'Flexible hours and remote-friendly culture',
      'Competitive compensation package',
    ],

    apply: {
      email:   'careers@technocratblues.com',
      tagline: "Let's build the future together!",
      mailto:  'mailto:careers@technocratblues.com',
    },
  },
];

// ── Careers page metadata (hero section above the listings) ──────────────────
export const CAREERS_META = {
  badge:       'Join Our Team',
  headline:    'Open Positions',
  subheadline: 'We are always looking for talented people to help us build the future.',
};

// Legacy alias — keeps any old import working without a breaking change
export const CAREERS_PAGE = CAREERS_LISTINGS[0];


// ── Hero Stats Strip
export const STAT_CONFIG = [
  {
    key:   'innovation',
    value: 'Innovation-Driven',
    label: 'Focused on the future',
    icon:  'trending-up',
    color: '#7078D0',
    glow:  'rgba(112,120,208,0.18)',
    bar:   1.0,
  },
  {
    key:   'reliable',
    value: 'Reliable',
    label: 'by default',
    icon:  'shield',
    color: '#5B8DEF',
    glow:  'rgba(91,141,239,0.18)',
    bar:   1.0,
  },
  {
    key:   'agile',
    value: 'Agile',
    label: 'Fast, adaptive, efficient',
    icon:  'users',
    color: '#F59E0B',
    glow:  'rgba(245,158,11,0.18)',
    bar:   1.0,
  },
];