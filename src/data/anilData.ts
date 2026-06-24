––––––––––export const anilProfile = {
    name: "Anil Kumar Devandla",
    role: "DevOps Engineer | Platform Engineer | Cloud Engineer | Kubernetes Specialist",
    location: "Toronto, Ontario, Canada",
    phone: "437-663-4554",
    email: "anilkumardevandla21@gmail.com",
    github: "https://github.com/anilkumardvr",
    linkedin: "https://linkedin.com/in/anilkumardevandla",
    resumeUrl: process.env.PUBLIC_URL + "/Anil_Kumar_Devandla_Resume.pdf",
    summary:
          "Senior DevOps Engineer with 8+ years of IT experience and 5+ years specializing in Cloud Infrastructure, Platform Engineering, Kubernetes, CI/CD Automation, Site Reliability Engineering, and Cloud-Native Technologies. Experienced in designing, deploying, automating, and operating scalable platforms across Azure environments while supporting modern application delivery, middleware platforms, developer enablement, and infrastructure modernization initiatives. Strong expertise in Kubernetes (AKS), Terraform, GitHub Actions, Jenkins, ArgoCD, Infrastructure as Code, observability platforms, security automation, and cloud-native architecture. Proven track record delivering enterprise-scale migrations, platform modernization projects, middleware deployments, automation frameworks, and production support for mission-critical systems. Passionate about platform engineering, developer productivity, cloud automation, AI-assisted engineering, and building reliable systems that scale.",
};

export const anilSkills = [
  { name: "AKS / Kubernetes", category: "Kubernetes & Containers", description: "Kubernetes (AKS), Docker, Helm, Gateway API, StatefulSets, Deployments, Services, Ingress Controllers, Namespace Management, Kubernetes Workload Identity, and Cluster Troubleshooting.", icon: "SiKubernetes" },
  { name: "Terraform", category: "Infrastructure as Code", description: "Terraform, ARM Templates, Infrastructure as Code (IaC), and Infrastructure Automation for cloud environment provisioning and standardization.", icon: "SiTerraform" },
  { name: "GitHub Actions", category: "CI/CD & Automation", description: "GitHub Actions, GitHub Enterprise, Reusable Workflows, Pipeline Automation, Release Engineering, and Self-Hosted Runner Concepts.", icon: "FaGithub" },
  { name: "Jenkins", category: "CI/CD & Automation", description: "Jenkins administration, pipeline automation, release workflows, and CI/CD platform integration.", icon: "FaJenkins" },
  { name: "ArgoCD / GitOps", category: "Platform Engineering & GitOps", description: "GitOps, ArgoCD, ApplicationSets, Golden Paths, Self-Service Tooling, Developer Experience (DevEx), and standardized deployment patterns.", icon: "SiArgo" },
  { name: "Azure", category: "Cloud Platforms", description: "Microsoft Azure, Azure Key Vault, Azure Monitor, Log Analytics, RBAC, Workload Identity, Hybrid Cloud Architecture, and Multi-Cloud Infrastructure.", icon: "FaCloud" },
  { name: "AWS / GCP", category: "Cloud Platforms", description: "Amazon Web Services (AWS – Exposure) and Google Cloud Platform (GCP – Exposure) including cloud infrastructure concepts.", icon: "FaAws" },
  { name: "Observability", category: "Monitoring & Observability", description: "Prometheus, Grafana, Azure Monitor, Elasticsearch, Log Analytics, Datadog (Exposure), Alerting, Incident Response, Root Cause Analysis, and Runbooks.", icon: "FaChartLine" },
  { name: "Security & Identity", category: "Security & Identity", description: "Azure Key Vault, RBAC, IAM Concepts, Secrets Management, TLS/SSL, Access Control, Workload Identity, and DevSecOps Practices.", icon: "FaShieldAlt" },
  { name: "Middleware Platforms", category: "Middleware & Data Platforms", description: "RabbitMQ, ActiveMQ Artemis, MinIO, Couchbase, Memcached, Event-Driven Architecture, and Data Platform Infrastructure.", icon: "FaServer" },
  { name: "Python / Bash / PowerShell", category: "Programming & Scripting", description: "Python, Bash, PowerShell, YAML, JSON for automation workflows, troubleshooting scripts, and platform automation.", icon: "FaTerminal" },
  { name: "AI & GitHub Copilot", category: "AI & Modern Engineering", description: "GitHub Copilot, AI-Assisted Development, LLM Concepts, AI Developer Tooling, Automation Workflows, and AI Infrastructure Enablement.", icon: "FaBrain" },
  { name: "Azure DevOps", category: "CI/CD & Automation", description: "Azure DevOps pipelines, release engineering, and platform integration for enterprise software delivery.", icon: "FaCloud" },
  { name: "Internal Developer Platforms", category: "Platform Engineering & GitOps", description: "Internal Developer Platforms (IDP), Platform Engineering, Self-Service Tooling, Developer Experience (DevEx), and Golden Paths for engineering teams.", icon: "FaCode" },
  ];

export const anilTimeline = [
  {
        name: "Kyndryl",
        websiteUrl: "https://www.kyndryl.com",
        timelineType: "Work",
        title: "Senior DevOps Engineer",
        techStack: "AKS, Kubernetes, GitHub Actions, Azure DevOps, Jenkins, Terraform, ArgoCD, Helm, RabbitMQ, ActiveMQ Artemis, Couchbase, MinIO, Memcached, Prometheus, Grafana, Azure Monitor, Log Analytics, Azure Key Vault, Python, Bash",
        summaryPoints: [
                "Leading cloud modernization and platform engineering initiatives for enterprise workloads running on Azure Kubernetes Service (AKS).",
                "Designed and deployed middleware platforms including RabbitMQ, ActiveMQ Artemis, MinIO, Couchbase, and Memcached in Kubernetes environments.",
                "Built secure cloud-native architectures using Azure Key Vault, Workload Identity, RBAC, and Infrastructure as Code.",
                "Automated infrastructure provisioning and deployment workflows using Terraform, GitHub Actions, Jenkins, Bash, and Python.",
                "Implemented GitOps deployment patterns using ArgoCD and Helm for standardized, repeatable application delivery.",
                "Created reusable deployment templates, operational runbooks, and troubleshooting guides for engineering teams.",
                "Supported production environments through incident management, root cause analysis, and proactive monitoring.",
                "Built observability solutions using Prometheus, Grafana, Azure Monitor, and centralized logging platforms.",
                "Worked closely with development teams to improve CI/CD adoption, deployment reliability, and developer productivity.",
                "Supported platform migrations from legacy infrastructure into cloud-native Azure environments.",
                "Leveraged AI-assisted engineering tools (GitHub Copilot) to improve automation, troubleshooting, and documentation workflows."
              ],
        dateRange: "2025 – Present"
  },
  {
        name: "Previous DevOps Roles",
        websiteUrl: "",
        timelineType: "Work",
        title: "DevOps Engineer",
        techStack: "Azure, Kubernetes, Jenkins, Terraform, CI/CD, Infrastructure as Code, Monitoring, Alerting, Incident Response",
        summaryPoints: [
                "Managed cloud infrastructure and application deployment pipelines across Azure and hybrid environments.",
                "Automated build, release, and deployment processes using Jenkins and Infrastructure as Code.",
                "Supported Kubernetes-based application deployments and operational excellence initiatives.",
                "Collaborated with development, QA, security, and infrastructure teams to improve software delivery.",
                "Implemented monitoring, alerting, and incident response procedures.",
                "Participated in infrastructure modernization and cloud migration programs."
              ],
        dateRange: "2017 – 2025"
  },
  {
        name: "Northeastern University",
        websiteUrl: "https://www.northeastern.edu",
        timelineType: "Education",
        title: "Master of Science (M.S.) – Project Management",
        techStack: "Project Management, Agile, Delivery, Leadership",
        summaryPoints: ["Graduate studies in Project Management with focus on Agile methodologies, delivery practices, and team leadership. Toronto campus."],
        dateRange: "Toronto, Canada"
  }
  ];

export const anilProjects = [
  {
        title: "JetStream Migration & Modernization Program",
        description: "Migrated legacy on-premise middleware platforms into Azure Kubernetes Service. Designed deployment architecture for RabbitMQ, ActiveMQ Artemis, MinIO, Couchbase, and Memcached. Implemented secure secret management using Azure Key Vault and Workload Identity. Built scalable and repeatable deployment frameworks using Helm and Infrastructure as Code. Reduced operational complexity through automation and standardized deployment patterns.",
        techUsed: "AKS, Kubernetes, Helm, Azure Key Vault, Workload Identity, RabbitMQ, ActiveMQ Artemis, MinIO, Couchbase, Memcached, Terraform, YAML",
        image: { url: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=900&q=80" }
  },
  {
        title: "Platform Engineering & Developer Enablement",
        description: "Implemented GitOps workflows using ArgoCD to standardize deployment processes across multiple engineering teams. Created reusable templates, automation scripts, and developer onboarding documentation. Established golden paths and self-service tooling to improve developer experience and productivity.",
        techUsed: "ArgoCD, Helm, GitHub Actions, Kubernetes, GitOps, CI/CD, Internal Developer Platforms, Self-Service Tooling",
        image: { url: "https://images.unsplash.com/photo-1556075798-4825dfaaf498?auto=format&fit=crop&w=900&q=80" }
  },
  {
        title: "Cloud-Native Infrastructure Automation",
        description: "Automated provisioning and configuration of cloud resources using Terraform. Developed CI/CD pipelines using GitHub Actions and Jenkins. Improved deployment consistency, reliability, and recovery processes across Azure environments.",
        techUsed: "Terraform, Azure, AKS, GitHub Actions, Jenkins, Azure Key Vault, RBAC, Workload Identity, ARM Templates",
        image: { url: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=900&q=80" }
  },
  {
        title: "Observability & Site Reliability Engineering",
        description: "Implemented comprehensive monitoring, alerting, incident response, RCA, and runbooks using Prometheus, Grafana, Azure Monitor, Elasticsearch, and Log Analytics. Improved production reliability and mean time to recovery (MTTR).",
        techUsed: "Prometheus, Grafana, Azure Monitor, Elasticsearch, Log Analytics, Datadog, SRE, Incident Management, Root Cause Analysis",
        image: { url: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80" }
  }
  ];

export const anilCertifications = [
    "Terraform Certification",
    "Microsoft Azure Fundamentals (AZ-900)",
    "Certified Kubernetes Administrator (CKA) – In Progress",
    "Cloud & DevOps Certifications – Ongoing"
  ];

export const anilProfileBanner = {
    backgroundImage: {
          url: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExOTZ5eWwwbjRpdWM1amxyd3VueHhteTVzajVjeGZtZGJ1dDc4MXMyNCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9dg/16u7Ifl2T4zYfQ932F/giphy.gif"
    },
    headline: "Anil Kumar Devandla - Senior DevOps Engineer | Platform Engineer | Kubernetes Specialist",
    resumeLink: { url: process.env.PUBLIC_URL + "/Anil_Kumar_Devandla_Resume.pdf" },
    linkedinLink: "https://linkedin.com/in/anilkumardevandla",
    profileSummary: anilProfile.summary
};
