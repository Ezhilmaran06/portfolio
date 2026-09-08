
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
      projects: '4',
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
      sector: 'SECTOR 01',
      callsign: 'COMPLIANCE ENGINE',
      title: 'Digital Processing Compliance Tool',
      shortTitle: 'DPC TOOL',
      category: 'COMPLIANCE / ENTERPRISE WEB APPLICATION',
      type: 'ENTERPRISE WEB APP',
      shortDescription:
        'A web-based compliance monitoring and management platform designed to centralize policies, monitor compliance activities, manage violations, track workflows, and maintain audit visibility through dashboards and reporting.',
      tags: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'JWT', 'Tailwind CSS'],
      githubUrl: 'https://github.com/Ezhilmaran06/digital_processing_Compliance',
      liveDemoUrl: null,
      image: '/images/projects/dpc-tool-mockup.png',
      telemetry: {
        system: 'ENTERPRISE WEB APP',
        status: 'ENGINEERED',
        modules: 'POLICY / AUDIT / WORKFLOW',
      },
      keyFeatures: [
        'Secure authentication with 4-tier Role-Based Access Control (Employee, Manager, Admin, Auditor)',
        'Change request approval lifecycle (Employee creates → Manager approves → Auditor verifies)',
        'Immutable security audit logging with exportable CSV telemetry reports',
        'Real-time analytical KPI dashboards and compliance rating trackers',
        'Centralized policy governance and proactive violation alerts',
      ],
      myContribution:
        'Designed and developed the full-stack MERN compliance platform, implemented 4-tier RBAC authentication middleware, authored RESTful APIs for change requests and immutable audit trails, and built responsive analytics dashboards.',
      details: {
        overview:
          'The Digital Processing Compliance Tool (ChangeFlow) is a production-ready enterprise compliance platform engineered to oversee, audit, and validate digital processing activities against organizational policies and security protocols. It centralizes policy management, tracks change request lifecycles, and maintains an immutable audit trail for full regulatory governance.',
        problem:
          'Modern enterprises suffer from fragmented change-request communications, non-standardized audit documentation, and manual compliance tracking that introduce regulatory exposure, security oversights, and operational bottlenecks.',
        solution:
          'Engineered a centralized MERN web platform that formalizes compliance approval workflows across employee, manager, admin, and auditor tiers, maintains tamper-proof immutable audit logs, and delivers instant status visibility through telemetry dashboards.',
        features: [
          {
            id: '01',
            title: 'ROLE-BASED ACCESS CONTROL (RBAC)',
            desc: 'Secure authentication with role validation separating Employee, Manager, Admin, and Auditor privileges.',
          },
          {
            id: '02',
            title: 'APPROVAL LIFECYCLE ENGINE',
            desc: 'Automated state machine tracking requests: Employee creates → Manager approves/rejects → Auditor verifies.',
          },
          {
            id: '03',
            title: 'IMMUTABLE AUDIT LOGGING',
            desc: 'Security-grade timestamped audit trail capturing every state change with instant CSV report export.',
          },
          {
            id: '04',
            title: 'REAL-TIME ANALYTICS DASHBOARD',
            desc: 'Interactive KPI cards tracking total, pending, approved, and rejected compliance requests.',
          },
          {
            id: '05',
            title: 'POLICY GOVERNANCE CONTROLS',
            desc: 'Centralized administrative controls for organizational policy compliance and violation monitoring.',
          },
        ],
        techStack: [
          { category: 'Frontend', technologies: 'React.js, Tailwind CSS, Lucide Icons, Responsive Layouts' },
          { category: 'Backend', technologies: 'Node.js, Express.js RESTful Architecture' },
          { category: 'Database', technologies: 'MongoDB with Mongoose ODM & Indexing' },
          { category: 'Security', technologies: 'JSON Web Tokens (JWT), Bcrypt Password Hashing, CORS Whitelist' },
        ],
        architecture: [
          { step: 'CLIENT LAYER', detail: 'React.js & Tailwind CSS responsive dashboard interfaces' },
          { step: 'API GATEWAY', detail: 'Express.js REST router with JWT authentication & RBAC middleware' },
          { step: 'BUSINESS LOGIC', detail: 'Change request lifecycle state machine & compliance policy engine' },
          { step: 'DATA & AUDIT LAYER', detail: 'MongoDB collections with immutable audit logs and indexed queries' },
        ],
        myContribution:
          'Full-stack engineering of the application: designed the MongoDB schemas for change requests and audit logs, implemented JWT token authentication with RBAC middleware, built role-specific dashboard views, and integrated real-time KPI metrics.',
        challenges:
          'Enforcing strict multi-level role authorization across stateful change-request transitions while ensuring the audit trail remains strictly immutable and protected against retroactive modification.',
        screenshots: ['/images/projects/dpc-tool-mockup.png', '/assets/portfolio/08-projects.webp'],
        futureScope:
          'Integration of automated AI-driven compliance anomaly detectors and enterprise webhook notifications for Slack and Microsoft Teams.',
      },
    },
    {
      id: 'fleetflow',
      number: '02',
      sector: 'SECTOR 02',
      callsign: 'FLEET COMMAND',
      title: 'FleetFlow — Transport Management System',
      shortTitle: 'FLEETFLOW',
      category: 'FLEET / LOGISTICS / TRANSPORT MANAGEMENT',
      type: 'TRANSPORT OS',
      shortDescription:
        'A modern fleet and transport management platform designed to manage vehicles, drivers, trips, dispatch operations, deliveries, and logistics workflows through a centralized operational interface.',
      tags: ['React 18', 'Node.js', 'Express.js', 'MongoDB', 'Mongoose', 'Recharts', 'Bootstrap 5', 'Multer', 'JWT'],
      githubUrl: 'https://github.com/Ezhilmaran06/fleetflow_transport_management',
      liveDemoUrl: null,
      image: '/assets/portfolio/08-projects.webp',
      telemetry: {
        system: 'TRANSPORT OS',
        domain: 'LOGISTICS',
        modules: 'FLEET / DISPATCH / DELIVERY',
      },
      keyFeatures: [
        'Real-time vehicle telematics, odometer tracking, and maintenance schedules',
        'Intelligent dispatch, route planning, driver assignments, and trip telemetry',
        'Safety compliance, driver logs, inspection workflows, and document vault via Multer',
        'Multi-role operational dashboards for Admins, Dispatchers, Drivers, and Maintenance',
        'Operational analytics, fuel economy metrics, turnaround telemetry, and audit logs via Recharts',
      ],
      myContribution:
        'Architected enterprise logistics workflows, developed RESTful backend controllers for trips, vehicles, drivers, and fuel tracking, integrated Multer for secure compliance document storage, and built telematics analytics with Recharts.',
      details: {
        overview:
          'FleetFlow is an enterprise-grade Fleet and Transport Management System built on the MERN stack. It empowers logistics coordinators, dispatchers, drivers, and maintenance managers with a unified command center to streamline vehicle allocation, optimize delivery dispatches, enforce regulatory safety compliance, and maximize fleet uptime.',
        problem:
          'Logistics organizations struggle with fragmented vehicle tracking, manual paper dispatch slips, missed maintenance intervals, unmonitored fuel expenses, and expiring driver certifications that create operational bottlenecks and safety liabilities.',
        solution:
          'Engineered a centralized transport operating platform that synchronizes vehicle lifecycle data, automates dispatch-to-delivery workflows, monitors fuel efficiency and maintenance schedules, and maintains a secure document vault with automated expiration alerts.',
        features: [
          {
            id: '01',
            title: 'FLEET TELEMATICS & VEHICLE REPOSITORY',
            desc: 'Real-time vehicle status tracking, odometer logs, maintenance scheduling, and fuel consumption records.',
          },
          {
            id: '02',
            title: 'INTELLIGENT DISPATCH & ROUTING',
            desc: 'Load planning, automated driver-to-vehicle assignments, turn-by-turn route tracking, and delivery milestones.',
          },
          {
            id: '03',
            title: 'SAFETY & COMPLIANCE VAULT',
            desc: 'Driver inspection workflows, incident logging, and digital document uploads with expiration tracking via Multer.',
          },
          {
            id: '04',
            title: 'ROLE-TAILORED OPERATIONAL DASHBOARDS',
            desc: 'Dedicated control interfaces and permission sets for Admins, Dispatchers, Fleet Drivers, and Technicians.',
          },
          {
            id: '05',
            title: 'LOGISTICS ANALYTICS & AUDIT TRAIL',
            desc: 'Dynamic performance graphs, fuel economy telemetry, turnaround metrics, and system-wide audit logging powered by Recharts.',
          },
        ],
        techStack: [
          { category: 'Frontend', technologies: 'React 18 (Vite), Bootstrap 5, Lucide Icons, Recharts, Framer Motion, Axios' },
          { category: 'Backend', technologies: 'Node.js, Express.js REST API, Morgan Logging' },
          { category: 'Database', technologies: 'MongoDB with Mongoose ODM (20+ Models for Vehicles, Trips, Fuel, Drivers)' },
          { category: 'Security & Media', technologies: 'JWT Authentication, Bcrypt.js, Helmet, Rate Limiting, Multer File Uploads' },
        ],
        architecture: [
          { step: 'OPERATIONS CLIENT', detail: 'React 18 + Vite frontend with Recharts telemetry dashboards' },
          { step: 'API GATEWAY & SECURITY', detail: 'Express API protected with Helmet, rate limiting, and JWT authentication' },
          { step: 'SERVICE CONTROLLERS', detail: 'Dedicated micro-controllers for Fleet, Dispatch, Fuel, Safety, and Trips' },
          { step: 'MEDIA & DATABASE LAYER', detail: 'Multer document vault and MongoDB cluster with indexed relational schemas' },
        ],
        myContribution:
          'Engineered the backend architecture supporting 20+ specialized domain models (Vehicles, Drivers, Trips, FuelRecords, Incidents), built RESTful API controllers with validation and pagination, integrated document upload handling, and created telemetry reporting charts.',
        challenges:
          'Synchronizing complex state transitions across tightly coupled operational entities (e.g., updating vehicle availability, odometer readings, and driver schedules simultaneously upon trip completion) without data race conditions.',
        screenshots: ['/assets/portfolio/08-projects.webp', '/assets/portfolio/09-project-details.webp'],
        futureScope:
          'Live GPS sensor integration, automated IoT fuel sensor feeds, and predictive machine learning models for preventative vehicle maintenance.',
      },
    },
    {
      id: 'event-voting',
      number: '03',
      sector: 'SECTOR 03',
      callsign: 'EVENT CONTROL',
      title: 'Event Organization & Voting Management System',
      shortTitle: 'EVENT & VOTING SYSTEM',
      category: 'EVENT MANAGEMENT / VOTING SYSTEM',
      type: 'EVENT & VOTING PLATFORM',
      shortDescription:
        'A secure web-based platform for organizing events and managing voting-related workflows through a centralized platform, ensuring secure voter verification and transparent, real-time election telemetry.',
      tags: ['React', 'Node.js', 'Express.js', 'MySQL', 'MongoDB', 'Nodemailer', 'OTP Auth', 'Recharts', 'Sequelize'],
      githubUrl: 'https://github.com/Ezhilmaran06/Event_Voting_Management_System',
      liveDemoUrl: null,
      image: '/assets/portfolio/08-projects.webp',
      telemetry: {
        system: 'EVENT + VOTING',
        workflow: 'ORGANIZE → PARTICIPATE → VOTE → RESULT',
        modules: 'EVENTS / VOTING / AUDIENCE',
      },
      keyFeatures: [
        'Comprehensive event lifecycle creation, scheduling, and configuration',
        'Candidate and participant registration with profile management and showcase',
        'Single-vote integrity enforcement backed by database unique constraints',
        'Secure voter authentication using email OTP generation via Nodemailer',
        'Real-time outcome telemetry and live tally analytics rendered with Recharts',
        'Dedicated role separation for Event Administrators and Audience Voters',
      ],
      myContribution:
        'Designed and implemented the dual-portal event and voting architecture, integrated email OTP verification for voter authentication, engineered database unique constraints to guarantee one-vote-per-user integrity, and built real-time visual tally dashboards.',
      details: {
        overview:
          'Event Organization & Voting Management System is a secure, web-based platform engineered for institutions, clubs, and organizations to coordinate events and conduct transparent, tamper-proof digital elections. It bridges the gap between event administration and democratic participant voting with verifiable integrity.',
        problem:
          'Traditional voting and event polling suffer from ballot tampering, proxy voting, double voting, slow manual ballot counting, and fragmented attendee registration.',
        solution:
          'Engineered a secure full-stack voting system combining email OTP voter verification, database-level unique voting constraints to mathematically prevent duplicate votes, and an instant tallying engine that outputs real-time graphical election outcomes.',
        features: [
          {
            id: '01',
            title: 'EVENT ADMINISTRATION ENGINE',
            desc: 'Administrators create, schedule, and manage events, set voting windows, and monitor participation.',
          },
          {
            id: '02',
            title: 'CANDIDATE & PARTICIPANT REGISTRATION',
            desc: 'Structured candidate registration with nomination profiles, bios, and eligibility verification.',
          },
          {
            id: '03',
            title: 'SECURE EMAIL OTP VERIFICATION',
            desc: 'Dynamic one-time password generation and delivery via Nodemailer ensuring authentic voter identities.',
          },
          {
            id: '04',
            title: 'GUARANTEED SINGLE-VOTE INTEGRITY',
            desc: 'Database-enforced unique constraints eliminating double voting and preventing ballot tampering.',
          },
          {
            id: '05',
            title: 'LIVE ELECTION TELEMETRY & TALLYING',
            desc: 'Real-time analytical vote tally dashboards using Recharts to present instant transparent outcome charts.',
          },
        ],
        techStack: [
          { category: 'Frontend', technologies: 'React, Recharts Analytics, Lucide Icons, Axios, React Router' },
          { category: 'Backend', technologies: 'Node.js, Express.js REST API' },
          { category: 'Databases', technologies: 'MySQL (mysql2 / Sequelize) & MongoDB Mongoose models' },
          { category: 'Authentication & Mail', technologies: 'Email OTP Generator, Nodemailer Transport, Session Management' },
        ],
        architecture: [
          { step: 'VOTER / ADMIN PORTAL', detail: 'React-driven responsive interfaces for voters and administrators' },
          { step: 'AUTH & OTP SERVICE', detail: 'Express authentication service with Nodemailer-driven OTP verification' },
          { step: 'BALLOT CONTROLLER', detail: 'Transactional vote processing with duplicate ballot rejection algorithms' },
          { step: 'RELATIONAL DATA STORE', detail: 'MySQL database with unique composite keys enforcing one vote per user per event' },
        ],
        myContribution:
          'Architected the end-to-end voting and event management workflows, implemented email OTP generation and validation using Nodemailer, created relational database migrations with unique ballot constraints, and built real-time vote distribution graphs.',
        challenges:
          'Ensuring zero double-voting concurrency exploits during peak election traffic by implementing atomic database-level unique indexing and transactional ballot submission.',
        screenshots: ['/assets/portfolio/08-projects.webp', '/assets/portfolio/09-project-details.webp'],
        futureScope:
          'Decentralized blockchain ledger integration for cryptographic ballot verification and anonymous zero-knowledge proof voting.',
      },
    },
    {
      id: 'personal-finance',
      number: '04',
      sector: 'SECTOR 04',
      callsign: 'FINANCE TELEMETRY',
      title: 'Personal Finance Dashboard',
      shortTitle: 'FINANCE TELEMETRY',
      category: 'FINTECH / PERSONAL FINANCE',
      type: 'PERSONAL FINANCE',
      shortDescription:
        'A personal finance management dashboard designed to help users track income, expenses, savings, financial activity, and spending patterns through an interactive visual telemetry interface.',
      tags: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'JWT', 'Chart.js / Recharts', 'FastAPI'],
      githubUrl: 'https://github.com/Ezhilmaran06/personal_finance_dashboard',
      liveDemoUrl: null,
      image: '/assets/portfolio/08-projects.webp',
      telemetry: {
        system: 'PERSONAL FINANCE',
        telemetry: 'INCOME / EXPENSE / SAVINGS',
        modules: 'BUDGET / GOALS / INVESTMENTS',
      },
      keyFeatures: [
        'Comprehensive income and expense logging with multi-category classification',
        'Dynamic budget threshold monitoring, envelope limits, and visual warning gauges',
        'Savings goal progress tracking with milestone calculation and visual target meters',
        'Multi-asset financial tracking across investments, loans, and net worth telemetry',
        'Interactive visual telemetry dashboards displaying cash-flow velocity and spending distributions',
      ],
      myContribution:
        'Architected double-entry transaction and ledger data models, built secure RESTful endpoints for income, expenses, budgets, loans, and goals, and implemented responsive financial visualization charts.',
      details: {
        overview:
          'Personal Finance Dashboard is an interactive financial telemetry workstation designed to provide users with complete visibility over their personal cash flow. It aggregates income streams, itemizes expenses across custom categories, tracks progress toward savings targets, and visualizes financial health through responsive analytical charts.',
        problem:
          'Individuals often struggle with budget overruns, impulsive expenditures, and missed financial targets due to fragmented accounting across accounts and a lack of unified visual cash-flow telemetry.',
        solution:
          'Engineered a centralized fintech dashboard that automates expense classification, enforces user-defined budget thresholds, tracks progress toward savings goals, and renders visual analytics depicting income velocity and expense distributions.',
        features: [
          {
            id: '01',
            title: 'INCOME & EXPENSE TELEMETRY',
            desc: 'Granular transaction logging, categorical tagging, and recurring payment tracking.',
          },
          {
            id: '02',
            title: 'BUDGET ENVELOPE CONTROLS',
            desc: 'Customizable category budget limits with visual threshold gauges and overrun warnings.',
          },
          {
            id: '03',
            title: 'SAVINGS & GOAL PROGRESSION',
            desc: 'Milestone tracking for short-term and long-term financial objectives with target ETA estimators.',
          },
          {
            id: '04',
            title: 'MULTI-ASSET LEDGER (LOANS & INVESTMENTS)',
            desc: 'Holistic portfolio tracking accounting for liabilities, investments, and net worth balance.',
          },
          {
            id: '05',
            title: 'INTERACTIVE FINANCIAL CHARTS',
            desc: 'Visual analytics displaying monthly spending velocity, expense breakdowns, and savings trajectories.',
          },
        ],
        techStack: [
          { category: 'Frontend', technologies: 'React.js, Recharts / Chart.js, Lucide Icons, Axios, React Router' },
          { category: 'Backend', technologies: 'Node.js, Express.js REST API & Python FastAPI micro-services' },
          { category: 'Database', technologies: 'MongoDB with Mongoose ODM (Budget, Expense, Goal, Income, Investment, Loan models)' },
          { category: 'Security', technologies: 'JWT Authentication, Bcrypt Password Hashing, CORS Protection' },
        ],
        architecture: [
          { step: 'DASHBOARD CLIENT', detail: 'React-based interactive telemetry interface with dynamic cash-flow charts' },
          { step: 'AUTHENTICATION & API', detail: 'JWT-secured RESTful endpoints with user-scoped transaction isolation' },
          { step: 'FINANCIAL SERVICES', detail: 'Ledger processing services for budget calculation and savings goal progress' },
          { step: 'DATA REPOSITORY', detail: 'MongoDB database housing indexed schemas for transactions, budgets, and investments' },
        ],
        myContribution:
          'Designed and developed the application architecture: structured schemas for double-entry financial tracking (Incomes, Expenses, Budgets, Goals, Investments, Loans), implemented secure JWT authentication, and developed responsive telemetry chart components.',
        challenges:
          'Efficiently computing aggregated financial metrics across multiple transaction collections (income, expenses, loans, investments) with sub-second response times for smooth visual chart rendering.',
        screenshots: ['/assets/portfolio/08-projects.webp', '/assets/portfolio/09-project-details.webp'],
        futureScope:
          'Bank account integration via open-banking APIs, automated bank statement PDF parsing, and predictive AI budgeting insights.',
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
      metric: '4',
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
      previewImage: '/assets/portfolio/12-certifications.webp',
    },
    {
      id: 'react-coursera',
      title: 'React Basics',
      issuer: 'Coursera',
      year: '2024',
      credentialUrl: '#',
      previewImage: '/assets/portfolio/12-certifications.webp',
    },
    {
      id: 'git-udemy',
      title: 'Git & GitHub',
      issuer: 'Udemy',
      year: '2023',
      credentialUrl: '#',
      previewImage: '/assets/portfolio/12-certifications.webp',
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
