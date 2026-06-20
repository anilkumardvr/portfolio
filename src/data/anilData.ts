export const anilProfile = {
  name: "Anil Kumar Devandla",
  role: "Senior DevOps Engineer | SRE | Kubernetes | Terraform | CI/CD | Cloud Infrastructure | Platform Engineering",
  location: "Toronto, ON, Canada",
  phone: "437-663-4554",
  email: "anilkumardevandla21@gmail.com",
  github: "https://github.com/anilkumardvr",
  linkedin: "https://linkedin.com/in/anilkumardevandla",
  resumeUrl: process.env.PUBLIC_URL + "/Anil_Kumar_Devandla_Resume.pdf",
  summary:
    "Senior Platform Engineer with 7+ years of experience designing, automating, and operating enterprise-scale cloud infrastructure, CI/CD platforms, and Kubernetes environments. Proven expertise in developer platforms, GitOps workflows, reusable deployment patterns, and infrastructure automation. Strong hands-on experience with Azure, Kubernetes (AKS), Terraform, Jenkins, GitHub Actions, Helm, ArgoCD, and distributed systems.",
};

export const anilSkills = [
  { name: "AKS / Kubernetes", category: "Kubernetes & Container Orchestration", description: "AKS, Docker, Helm, Workload Identity, Gateway API, StatefulSets, Deployments, Services, namespaces, and cluster troubleshooting.", icon: "SiKubernetes" },
  { name: "Terraform", category: "Infrastructure as Code", description: "Reusable IaC, infrastructure provisioning, ARM Templates, automation modules, and cloud environment standardization.", icon: "SiTerraform" },
  { name: "GitHub Actions", category: "CI/CD Platform Engineering", description: "Reusable workflows, pipeline automation, release engineering, golden paths, self-service deployment patterns, and CI/CD platforms.", icon: "FaGithub" },
  { name: "Jenkins", category: "CI/CD Platform Engineering", description: "Jenkins administration, pipeline automation, release workflows, and platform integration.", icon: "FaJenkins" },
  { name: "ArgoCD / GitOps", category: "Platform Engineering & GitOps", description: "GitOps deployment patterns, ArgoCD, ApplicationSets, Helm templates, developer experience, and standardized deployment patterns.", icon: "SiArgo" },
  { name: "Azure", category: "Cloud Platforms", description: "Microsoft Azure, Azure Key Vault, Azure Monitor, Log Analytics, RBAC, workload identity, and cloud infrastructure.", icon: "FaCloud" },
  { name: "AWS", category: "Cloud Platforms", description: "AWS exposure including EC2, Auto Scaling, Load Balancers, and cloud infrastructure concepts.", icon: "FaAws" },
  { name: "Observability", category: "Monitoring & Observability", description: "Prometheus, Grafana, Azure Monitor, Datadog concepts, Elasticsearch, Log Analytics, alerting, incident response, RCA, and runbooks.", icon: "FaChartLine" },
  { name: "Security & Identity", category: "Security & Identity", description: "Azure Key Vault, RBAC, IAM concepts, secrets management, TLS/SSL, access control, and workload identity.", icon: "FaShieldAlt" },
  { name: "Automation", category: "Programming & Automation", description: "Python, Bash, PowerShell, YAML, JSON, AI-assisted development, troubleshooting scripts, and platform automation workflows.", icon: "FaTerminal" },
];

export const anilTimeline = [
  {
    name: "Kyndryl",
    websiteUrl: "https://www.kyndryl.com",
    timelineType: "Work",
    title: "Platform Engineer",
    techStack: "AKS, Kubernetes, GitHub Actions, Azure DevOps, Jenkins, Terraform, ArgoCD, Helm, RabbitMQ, ActiveMQ Artemis, Couchbase, MinIO, Memcached, Prometheus, Grafana, Azure Monitor, Log Analytics, Azure Key Vault",
    summaryPoints: [
      "Designed and operated Kubernetes-based platform infrastructure supporting enterprise middleware and distributed applications.",
      "Built reusable CI/CD workflows and deployment automation using GitHub Actions, Azure DevOps, Jenkins, and Infrastructure as Code practices.",
      "Implemented GitOps deployment patterns using ArgoCD and standardized Helm-based deployment templates.",
      "Managed highly available middleware platforms including RabbitMQ, ActiveMQ Artemis, Couchbase, MinIO, and Memcached.",
      "Automated infrastructure provisioning, secrets management, and workload identity integrations using Terraform and Azure Key Vault.",
      "Improved platform reliability through incident response, root cause analysis, monitoring, and proactive infrastructure optimization."
    ],
    dateRange: "April 2026 – Present"
  },
  {
    name: "First National Financial",
    websiteUrl: "https://www.firstnational.ca",
    timelineType: "Work",
    title: "Azure Cloud Infrastructure Engineer",
    techStack: "Azure, AKS, Kubernetes, Terraform, GitOps, CI/CD, Azure Monitor, Prometheus, Grafana, Elasticsearch, Log Analytics, Velero",
    summaryPoints: [
      "Designed and maintained Kubernetes-based cloud platforms supporting application modernization initiatives and developer enablement.",
      "Built reusable CI/CD pipelines and standardized deployment patterns to accelerate software delivery across multiple environments.",
      "Managed Kubernetes resources including namespaces, ingress configurations, secrets, ConfigMaps, and workload identity integrations.",
      "Implemented GitOps deployment patterns and automated infrastructure provisioning using Terraform.",
      "Implemented observability solutions using Azure Monitor, Prometheus, Grafana, Elasticsearch, and Log Analytics.",
      "Implemented backup and disaster recovery strategies using Velero."
    ],
    dateRange: "February 2023 – April 2026"
  },
  {
    name: "ADP",
    websiteUrl: "https://www.adp.com",
    timelineType: "Work",
    title: "DevOps Engineer / Azure Engineer",
    techStack: "Linux, RHEL, Ubuntu, Windows Server, IIS, Cloud Storage, Backup Automation, Monitoring, Troubleshooting",
    summaryPoints: [
      "Administered Linux servers including user management, package management, system hardening, and troubleshooting.",
      "Managed Windows Server environments including IIS hosting, services, and application deployments.",
      "Troubleshot Linux/Unix servers and application infrastructure, resolving system issues and improving stability.",
      "Provided hands-on support for cloud storage, backup automation, and efficient object storage usage.",
      "Collaborated with cross-functional teams to improve operational efficiency, documentation, and knowledge transfer."
    ],
    dateRange: "October 2019 – February 2023"
  },
  {
    name: "Gemini Consulting",
    websiteUrl: "https://www.geminiconsulting.com",
    timelineType: "Work",
    title: "Software Engineer",
    techStack: "Linux, Unix, Nagios, AWS EC2, Auto Scaling, Load Balancers, Firewalls, Compliance Monitoring",
    summaryPoints: [
      "Administered Linux and Unix servers, performing installation, configuration, and monitoring.",
      "Configured Nagios monitoring and alerting for infrastructure performance management.",
      "Implemented AWS infrastructure solutions including EC2, Auto Scaling, and Load Balancers.",
      "Maintained system security using firewall configurations and compliance monitoring tools.",
      "Collaborated with cross-functional teams and communicated project updates to stakeholders."
    ],
    dateRange: "December 2017 – October 2019"
  },
  {
    name: "Northeastern University",
    websiteUrl: "https://www.northeastern.edu",
    timelineType: "Education",
    title: "Master of Science in Agile Project Management",
    techStack: "Agile, Project Management, Delivery, Leadership",
    summaryPoints: ["Graduate studies focused on Agile project management, delivery practices, and team collaboration."],
    dateRange: "Toronto, Canada"
  },
  {
    name: "Acharya Nagarjuna University",
    websiteUrl: "https://nagarjunauniversity.ac.in",
    timelineType: "Education",
    title: "Bachelor of Technology in Computer Science",
    techStack: "Computer Science, Software Engineering, Infrastructure",
    summaryPoints: ["Bachelor's degree foundation in computer science and software engineering."],
    dateRange: "Andhra Pradesh, India"
  }
];

export const anilProjects = [
  {
    title: "AKS Middleware Modernization",
    description: "Migrated and standardized enterprise middleware workloads on AKS, including RabbitMQ, ActiveMQ Artemis, Couchbase, MinIO, and Memcached. Built reusable manifests, services, routes, health checks, storage, and validation patterns.",
    techUsed: "AKS, Kubernetes, Helm, YAML, Azure Key Vault, Workload Identity, Gateway API, StatefulSets",
    image: { url: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=900&q=80" }
  },
  {
    title: "GitOps Deployment Patterns",
    description: "Implemented GitOps deployment patterns using ArgoCD and Helm-based templates to standardize application delivery and improve developer experience.",
    techUsed: "ArgoCD, Helm, GitHub Actions, Kubernetes, GitOps, CI/CD",
    image: { url: "https://images.unsplash.com/photo-1556075798-4825dfaaf498?auto=format&fit=crop&w=900&q=80" }
  },
  {
    title: "Cloud Infrastructure Automation",
    description: "Automated infrastructure provisioning, secrets management, workload identity, and platform components using Terraform, Azure Key Vault, and reusable deployment patterns.",
    techUsed: "Terraform, Azure, AKS, Azure Key Vault, RBAC, Workload Identity",
    image: { url: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=900&q=80" }
  },
  {
    title: "Observability and Reliability",
    description: "Implemented monitoring, alerting, incident response, RCA, and runbooks using Prometheus, Grafana, Azure Monitor, Elasticsearch, and Log Analytics.",
    techUsed: "Prometheus, Grafana, Azure Monitor, Elasticsearch, Log Analytics, SRE",
    image: { url: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80" }
  }
];

export const anilCertifications = [
  "Microsoft Azure Fundamentals (AZ-900)",
  "Microsoft Azure Administrator Associate",
  "Certified Kubernetes Administrator (CKA)"
];

export const anilProfileBanner = {
  backgroundImage: {
    url: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExOTZ5eWwwbjRpdWM1amxyd3VueHhteTVzajVjeGZtZGJ1dDc4MXMyNCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9dg/16u7Ifl2T4zYfQ932F/giphy.gif"
  },
  headline: "Anil Kumar Devandla - Senior DevOps Engineer",
  resumeLink: { url: process.env.PUBLIC_URL + "/Anil_Kumar_Devandla_Resume.pdf" },
  linkedinLink: "https://linkedin.com/in/anilkumardevandla",
  profileSummary: anilProfile.summary
};
