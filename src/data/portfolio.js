
export const portfolioData = {
  driver: {
    name: 'EZHILMARAN E',
    role: 'Aspiring Java Developer',
    subtitle: 'FINAL YEAR B.TECH — INFORMATION TECHNOLOGY',
    college: 'Bannari Amman Institute of Technology, Erode',
    degree: 'B.Tech - Information Technology',
    interests: ['Backend Development', 'Full Stack Development', 'Problem Solving'],
    goal: 'To become a skilled software developer and create meaningful, scalable solutions.',
    tagline: 'Aspiring Java Developer | Problem Solver | Lifelong Learner',
    motto: 'SAME PASSION, DIFFERENT TRACK',
    bio: 'Passionate about building scalable solutions, solving real world problems, and continuously learning new technologies.',
    stats: {
      dsa: '240+',
      projects: '2+',
      cgpa: '7.64',
      learning: '∞',
    },
  },
  education: [
    {
      period: '2023 - 2027',
      degree: 'B.Tech - Information Technology',
      institution: 'Bannari Amman Institute of Technology, Erode',
      score: '7.64',
      scoreLabel: 'CGPA',
      status: 'Current',
    },
    {
      period: '2021 - 2023',
      degree: 'Higher Secondary Education (HSC)',
      institution: "St. Joseph's Higher Secondary School",
      score: '80.5%',
      scoreLabel: 'Percentage',
      status: 'Completed',
    },
    {
      period: '2019 - 2021',
      degree: 'Secondary School Education (SSLC)',
      institution: 'Fatima Matric Higher Secondary School',
      score: 'PASS',
      scoreLabel: 'Result',
      status: 'Completed',
    },
  ],
  skills: {
    programming: {
      title: 'Programming Languages',
      skills: [
        { name: 'Java', percentage: 90 },
        { name: 'C', percentage: 75 },
        { name: 'Python', percentage: 70 },
      ],
    },
    web: {
      title: 'Web Technologies',
      skills: [
        { name: 'HTML', percentage: 90 },
        { name: 'CSS', percentage: 85 },
        { name: 'React', percentage: 80 },
        { name: 'Node.js', percentage: 75 },
        { name: 'Express.js', percentage: 75 },
      ],
    },
    coreCs: {
      title: 'Core Computer Science',
      skills: [
        { name: 'DSA', percentage: 85 },
        { name: 'OOP', percentage: 80 },
        { name: 'DBMS', percentage: 80 },
      ],
    },
    databases: {
      title: 'Databases',
      skills: [
        { name: 'MySQL', percentage: 80 },
        { name: 'MongoDB', percentage: 75 },
      ],
    },
    tools: ['Git', 'GitHub', 'Postman', 'Figma', 'VS Code', 'IntelliJ IDEA'],
  },
  projects: [
    {
      id: 'dpc-tool',
      number: '01',
      title: 'Digital Processing Compliance Tool (DPC Tool)',
      shortDescription:
        'A web-based compliance monitoring system to track digital processing activities and ensure organizational policy adherence.',
      tags: ['React', 'Node.js', 'Express.js', 'MongoDB', 'JWT', 'Tailwind CSS'],
      githubUrl: 'https://github.com/Ezhilmaran06',
      liveDemoUrl: '',
      image: '/images/projects/dpc-tool-mockup.png',
      details: {
        overview:
          'The Digital Processing Compliance Tool (DPC Tool) is an enterprise-grade compliance monitoring platform engineered to oversee, audit, and validate digital processing activities against organizational policies and security protocols.',
        problem:
          'Modern enterprises grapple with fragmented digital processing workflows, non-standardized audit documentation, and manual compliance tracking which increases operational overhead and regulatory risk.',
        solution:
          'Constructed a centralized monitoring architecture that evaluates policy adherence in real time, automates audit trail logging, and provides intuitive telemetry dashboards with instant violation notifications.',
        features: [
          'Secure authentication with encrypted JWT token sessions',
          'Granular Role-Based Access Control (RBAC) separating employee and auditor privileges',
          'Automated policy engine flagging out-of-compliance processing events',
          'Immutable audit trail logs with timestamped operational telemetry',
          'Real-time analytical dashboard with processing volume and compliance rating metrics',
          'Exportable audit reports formatted for executive review',
        ],
        techStack: [
          { category: 'Frontend', technologies: 'React.js, Tailwind CSS, Lucide Icons, Responsive Layouts' },
          { category: 'Backend', technologies: 'Node.js, Express.js RESTful Architecture' },
          { category: 'Database', technologies: 'MongoDB with Mongoose ODM & indexing' },
          { category: 'Security', technologies: 'JSON Web Tokens (JWT), Bcrypt password hashing' },
        ],
        myContribution:
          'Engineered full-stack responsive dashboard, designed RESTful APIs for compliance event ingestion, authored role-based middleware, and implemented data visualization components for telemetry monitoring.',
        screenshots: ['/images/screens/09_project_details.png', '/images/projects/dpc-tool-mockup.png'],
        futureScope:
          'Integrating automated AI compliance anomaly detectors and webhook integrations with enterprise Slack/Teams channels.',
      },
    },
    {
      id: 'finance-dashboard',
      number: '02',
      title: 'Personal Finance Dashboard',
      shortDescription:
        'Interactive dashboard for tracking income, expenses, savings goals, and financial health insights with visual analytics.',
      tags: ['React', 'Node.js', 'Express.js', 'MongoDB', 'JWT', 'Chart.js'],
      githubUrl: 'https://github.com/Ezhilmaran06',
      liveDemoUrl: '',
      image: '/images/screens/08_projects.png',
      details: {
        overview:
          'A comprehensive personal wealth telemetry dashboard that centralizes transactions, automates expenditure tagging, tracks monthly savings targets, and projects cash-flow health.',
        problem:
          'Users face difficulties maintaining financial discipline due to tedious manual recording across disparate banking apps and lack of predictive visual budgeting analytics.',
        solution:
          'Created a responsive, interactive dashboard that computes dynamic savings rates, visualizes spending distributions via interactive charts, and enforces budget thresholds.',
        features: [
          'Automated expense categorization and custom recurring payment tags',
          'Interactive visual analytics including monthly expenditure breakdowns and trends',
          'Dynamic savings target meters with milestone progress indicators',
          'Sub-50ms API response times through MongoDB aggregation query optimization',
          'Multi-account ledger isolation with secure JWT session authentication',
        ],
        techStack: [
          { category: 'Frontend', technologies: 'React.js, Chart.js, Vanilla CSS Glassmorphism' },
          { category: 'Backend', technologies: 'Node.js, Express.js REST APIs' },
          { category: 'Database', technologies: 'MongoDB with indexed transactional collections' },
          { category: 'Authentication', technologies: 'JWT, Secure Cookies, CORS Policies' },
        ],
        myContribution:
          'Architected complete database schema, built visual charting widgets using Chart.js, configured aggregation pipelines for financial summaries, and refined mobile responsiveness.',
        screenshots: ['/images/screens/08_projects.png'],
        futureScope:
          'Open Banking API integration for automated sync and machine learning-powered predictive budgeting advice.',
      },
    },
    {
      id: 'upcoming-projects',
      number: '03',
      title: 'More Projects Coming Soon',
      shortDescription:
        'Currently engineering high-throughput backend services and distributed system solutions in Java and Spring Boot.',
      tags: ['Java', 'Spring Boot', 'Microservices', 'Docker', 'PostgreSQL'],
      githubUrl: 'https://github.com/Ezhilmaran06',
      liveDemoUrl: '',
      image: '/images/screens/08_projects.png',
      details: {
        overview:
          'New backend engineering and cloud-native microservices currently under active development, focusing on distributed caching, concurrency patterns, and event-driven architecture in Java.',
        problem: 'Designing high-scale, low-latency transaction processing backends under heavy concurrent workloads.',
        solution: 'Applying idiomatic Java multithreading, Spring Boot microservices, and Dockerized deployment workflows.',
        features: [
          'High-throughput Java concurrency architectures',
          'Spring Security & OAuth2 integrations',
          'Containerized microservices orchestration',
          'Clean architecture and Domain-Driven Design (DDD)',
        ],
        techStack: [
          { category: 'Backend', technologies: 'Java, Spring Boot, Spring Security' },
          { category: 'Database', technologies: 'PostgreSQL, Redis caching' },
          { category: 'DevOps', technologies: 'Docker, Git, Postman' },
        ],
        myContribution: 'Full-cycle architectural design, unit testing, and performance profiling.',
        screenshots: ['/images/screens/08_projects.png'],
        futureScope: 'Production cloud deployment on AWS / GCP with CI/CD automation.',
      },
    },
  ],
  experience: {
    status:
      'No professional experience yet, but actively building skills through projects, internships and continuous learning.',
    badge: 'OPEN FOR INTERNSHIP OPPORTUNITIES',
    quote:
      'Passionate about building scalable solutions, solving real world problems, and continuously learning new technologies.',
    tagline: 'EVERY OPPORTUNITY IS A NEW TRACK',
  },
  achievements: [
    {
      id: 'leetcode',
      icon: 'trophy',
      metric: '240+',
      title: 'DSA Problems on LeetCode',
      subtext: 'Top 40% Global Standing',
    },
    {
      id: 'projects',
      icon: 'star',
      metric: '2+',
      title: 'Projects Completed',
      subtext: 'Production-ready full-stack applications',
    },
    {
      id: 'cgpa',
      icon: 'chart',
      metric: '7.64',
      title: 'Academic CGPA',
      subtext: 'Bannari Amman Institute of Technology',
    },
    {
      id: 'problem-solving',
      icon: 'target',
      metric: 'Problem Solving',
      title: 'Enthusiast',
      subtext: 'Algorithms, Data Structures & Logic',
    },
    {
      id: 'learner',
      icon: 'timer',
      metric: 'Consistent',
      title: 'Learner',
      subtext: 'Daily coding & technical development',
    },
    {
      id: 'open-source',
      icon: 'users',
      metric: 'Open Source',
      title: 'Contributor',
      subtext: 'Collaborative code & community repos',
    },
  ],
  certifications: [
    {
      id: 'java-infosys',
      title: 'Java Programming',
      issuer: 'Infosys Springboard',
      year: '2024',
      credentialUrl: '#',
      previewImage: '/images/screens/12_certifications.png',
    },
    {
      id: 'react-coursera',
      title: 'React Basics',
      issuer: 'Coursera',
      year: '2024',
      credentialUrl: '#',
      previewImage: '/images/screens/12_certifications.png',
    },
    {
      id: 'git-udemy',
      title: 'Git & GitHub',
      issuer: 'Udemy',
      year: '2023',
      credentialUrl: '#',
      previewImage: '/images/screens/12_certifications.png',
    },
  ],
  codingProfiles: {
    github: {
      handle: 'Ezhilmaran06',
      url: 'https://github.com/Ezhilmaran06',
      repositories: 15,
      contributions: '200+',
    },
    leetcode: {
      handle: 'ezhilmaran06',
      url: 'https://leetcode.com',
      problemsSolved: 240,
      globalRanking: 'Top 40%',
    },
  },
  contact: {
    phone: '+91 6381080892',
    email: 'ezhilmaran026@gmail.com',
    academicEmail: 'ezhilmaran.it23@bitsathy.ac.in',
    linkedin: 'linkedin.com/in/ezhilmaran-e-667444394',
    linkedinUrl: 'https://www.linkedin.com/in/ezhilmaran-e-667444394/',
    github: 'github.com/Ezhilmaran06',
    githubUrl: 'https://github.com/Ezhilmaran06',
  },
};
