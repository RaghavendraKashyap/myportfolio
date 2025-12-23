import { Experience, Project, Skill, SocialLink, Certification, ContactMessage } from '../types';

export const HERO_DATA = {
  name: "Raghavendra Kashyap",
  role: "Raghavendra/Cloud Engineer",
  tagline: "Designing cloud infrastructure built to scale and endure.",
  bio: "AWS & Azure specialist focused on automation, cost optimization, and highly available architectures.",
};

export const SKILLS_DATA: Skill[] = [
  { name: 'AWS', category: 'Cloud', icon: 'Cloud' },
  { name: 'Azure', category: 'Cloud', icon: 'CloudLightning' },
  { name: 'Google Cloud', category: 'Cloud', icon: 'Globe' },
  { name: 'Terraform', category: 'DevOps', icon: 'Box' },
  { name: 'Docker', category: 'DevOps', icon: 'Container' },
  { name: 'Kubernetes', category: 'DevOps', icon: 'Ship' },
  { name: 'Ansible', category: 'DevOps', icon: 'Terminal' },
  { name: 'Python', category: 'Languages', icon: 'Code' },
  { name: 'Go', category: 'Languages', icon: 'Cpu' },
  { name: 'TypeScript', category: 'Languages', icon: 'Code' },
  { name: 'Linux', category: 'Tools', icon: 'Server' },
  { name: 'Grafana', category: 'Tools', icon: 'Activity' },
];

export const CERTIFICATIONS_DATA: Certification[] = [
  {
    id: '1',
    title: 'AWS Solutions Architect Professional',
    issuer: 'Amazon Web Services',
    date: 'Issued Dec 2023',
    image: 'https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg',
    credentialUrl: 'https://aws.amazon.com/certification/'
  },
  {
    id: '2',
    title: 'Certified Kubernetes Administrator (CKA)',
    issuer: 'The Linux Foundation',
    date: 'Issued Aug 2023',
    image: 'https://upload.wikimedia.org/wikipedia/commons/3/39/Kubernetes_logo_without_workmark.svg',
    credentialUrl: 'https://www.cncf.io/certification/cka/'
  },
  {
    id: '3',
    title: 'Azure Solutions Architect Expert',
    issuer: 'Microsoft',
    date: 'Issued Jan 2023',
    image: 'https://upload.wikimedia.org/wikipedia/commons/f/f0/Microsoft_Azure_logo.svg',
    credentialUrl: 'https://learn.microsoft.com/en-us/credentials/certifications/azure-solutions-architect/'
  },
  {
    id: '4',
    title: 'HashiCorp Certified: Terraform Associate',
    issuer: 'HashiCorp',
    date: 'Issued Nov 2022',
    image: 'https://upload.wikimedia.org/wikipedia/commons/0/04/HashiCorp_Icon_Black.svg', // Placeholder
    credentialUrl: 'https://www.hashicorp.com/certification/terraform-associate'
  }
];

export const EXPERIENCE_DATA: Experience[] = [
  {
    id: '1',
    role: 'Senior Cloud Engineer',
    company: 'TechFlow Solutions',
    duration: '2022 - Present',
    description: [
      'Architected multi-region AWS infrastructure reducing latency by 40%.',
      'Implemented IaC using Terraform for 100% reproducible environments.',
      'Led the migration of legacy monoliths to Azure Kubernetes Service (AKS).',
    ],
  },
  {
    id: '2',
    role: 'DevOps Engineer',
    company: 'DataStream Corp',
    duration: '2020 - 2022',
    description: [
      'Automated CI/CD pipelines using GitHub Actions, cutting deployment time by 60%.',
      'Managed a fleet of 500+ EC2 instances using Ansible.',
      'Optimized cloud costs, saving the company $15k monthly.',
    ],
  },
  {
    id: '3',
    role: 'System Administrator',
    company: 'Nexus Networks',
    duration: '2018 - 2020',
    description: [
      'Maintained 99.99% uptime for critical on-premise servers.',
      'Scripted daily backups and automated health checks in Python.',
    ],
  },
];

export const PROJECTS_DATA: Project[] = [
  {
    id: '1',
    title: 'Serverless Data Lake',
    description: 'A fully automated data ingestion pipeline using AWS Lambda, S3, and Glue. Processes 1TB of data daily with zero server maintenance.',
    tags: ['AWS', 'Lambda', 'Python', 'Big Data'],
    // Image: Abstract futuristic server/data visualization
    imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop',
    githubUrl: 'https://github.com/raghavendra/datalake',
  },
  {
    id: '2',
    title: 'Multi-Cloud K8s Cluster',
    description: 'Terraform modules to spin up an interconnected Kubernetes cluster spanning AWS EKS and Azure AKS with unified monitoring.',
    tags: ['Kubernetes', 'Terraform', 'Go', 'Grafana'],
    // Image: Network mesh/connections
    imageUrl: 'https://images.unsplash.com/photo-1558494949-ef526b0042a0?q=80&w=800&auto=format&fit=crop',
    githubUrl: 'https://github.com/raghavendra/k8s-mesh',
    demoUrl: 'https://demo.k8s.io',
  },
  {
    id: '3',
    title: 'Auto-Scaling Microservices',
    description: 'A demo e-commerce backend built with Node.js that auto-scales based on CPU and Request metrics using custom CloudWatch alarms.',
    tags: ['Node.js', 'Docker', 'AWS AutoScaling'],
    // Image: Dashboard/Metrics or Code
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop',
    githubUrl: 'https://github.com/raghavendra/autoscale',
  },
];

export const SOCIAL_LINKS: SocialLink[] = [
  { platform: 'GitHub', url: 'https://github.com/RaghavendraKashyap', icon: 'Github' },
  { platform: 'LinkedIn', url: 'https://www.linkedin.com/in/raghavendrakashyap/', icon: 'Linkedin' },
  { platform: 'Twitter', url: 'https://twitter.com/raghavendra_cloud', icon: 'Twitter' },
  { platform: 'Email', url: 'mailto:contact@raghavendra.cloud', icon: 'Mail' },
];

export const CONTACT_MESSAGES_DATA: ContactMessage[] = [
    { 
        id: '1', 
        name: 'Sarah Recruiter', 
        email: 'sarah@techjobs.com', 
        message: 'Hi, I saw your portfolio and I am impressed. Are you open to new roles?', 
        date: new Date().toISOString() 
    }
];