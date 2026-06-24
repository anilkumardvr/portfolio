export const anilProfile = {
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
            title: "DevOps / Cloud Engineer",
            techStack: "GKE, AKS, Kubernetes, GitHub Actions, Azure DevOps, Jenkins, ArgoCD, Terraform, Helm, RabbitMQ, ActiveMQ Artemis, Couchbase, MinIO, Memcached, Prometheus, Grafana, Azure Monitor, Log Analytics, Azure Key Vault, Workload Identity, Python, Bash",
            summaryPoints: [
                      "Designed and managed GKE (GCP) clusters for containerized applications including node pools, autoscaling, networking, and workload distribution.",
                      "Led Kubernetes migration and modernization initiatives deploying enterprise applications and middleware to Azure Kubernetes Service (AKS).",
                      "Designed and maintained CI/CD pipelines using GitHub Actions, Jenkins, and Azure DevOps to automate build, test, security scanning, and deployment workflows.",
                      "Created and maintained Infrastructure as Code (IaC) using Terraform with reusable modules for Kubernetes clusters, networking, storage, and identity management.",
                      "Deployed and administered highly available distributed systems: RabbitMQ, ActiveMQ Artemis, Couchbase, MinIO, and Memcached on Kubernetes.",
                      "Implemented secure cloud-native architectures using Azure Key Vault, Kubernetes Workload Identity, and Secrets Store CSI Driver.",
                      "Configured Gateway API resources, health checks, routing policies, and secure ingress patterns for enterprise workloads.",
                      "Built and optimized observability solutions using Prometheus, Grafana, Azure Monitor, and Log Analytics to improve system visibility and incident response.",
                      "Implemented GitOps deployment patterns using ArgoCD and Helm for standardized, repeatable application delivery across environments.",
                      "Developed reusable Terraform modules, Helm charts, GitHub workflow templates, and operational runbooks to improve engineering velocity.",
                      "Automated environment provisioning across development, testing, and production using Bash and Python scripts integrated into CI/CD workflows.",
                      "Performed root cause analysis, Kubernetes troubleshooting (networking, storage, pod scheduling), and preventive improvements to increase platform reliability.",
                      "Collaborated with development teams supporting applications built in Node.js, TypeScript, and Golang.",
                      "Leveraged AI-assisted engineering tools (GitHub Copilot) to accelerate automation, troubleshooting, and documentation workflows."
                    ],
            dateRange: "April 2026 – Present"
    },
    {
            name: "First National Financial",
            websiteUrl: "https://www.firstnational.ca",
            timelineType: "Work",
            title: "DevOps / Cloud Engineer",
            techStack: "AKS, GKE, Kubernetes, Terraform, Azure, GitHub Actions, Jenkins, ArgoCD, Docker, Helm, Prometheus, Grafana, Azure Monitor, Elasticsearch, Log Analytics, Velero, Python, Bash",
            summaryPoints: [
                      "Designed and operated Azure Kubernetes Service (AKS) environments supporting enterprise applications, distributed systems, and data-intensive workloads.",
                      "Worked on monitoring, troubleshooting, and optimizing GKE (GCP) workloads by integrating logging, monitoring, and CI/CD pipelines to improve application reliability.",
                      "Created and maintained Infrastructure as Code (IaC) using Terraform with reusable modules for Kubernetes clusters, networking, storage, and identity management.",
                      "Designed, built, and maintained Azure cloud infrastructure supporting enterprise applications and production environments.",
                      "Built reusable CI/CD pipelines and automated deployment workflows using GitHub Actions, Jenkins, and Azure DevOps across multiple application environments.",
                      "Supported application modernization by migrating VM-based workloads to Kubernetes-based environments.",
                      "Implemented monitoring, logging, and alerting solutions using Azure Monitor, Prometheus, Grafana, Elasticsearch, and Log Analytics.",
                      "Implemented backup, restore, and disaster recovery strategies using Velero to improve business continuity.",
                      "Worked with GitOps deployment methodologies using ArgoCD and standardized Helm chart templates.",
                      "Collaborated with development teams supporting applications built in Node.js, TypeScript, and Golang.",
                      "Performed production support, troubleshooting, root cause analysis, and preventive improvements to increase platform stability.",
                      "Improved operational efficiency by developing standardized deployment patterns, automation frameworks, and reusable infrastructure components."
                    ],
            dateRange: "February 2023 – April 2026"
    },
    {
            name: "ADP",
            websiteUrl: "https://www.adp.com",
            timelineType: "Work",
            title: "Infrastructure Engineer",
            techStack: "Linux (RHEL, Ubuntu), Windows Server, IIS, Cloud Storage, Monitoring, Backup Automation, CI/CD, Bash, Python",
            summaryPoints: [
                      "Administered Linux servers (RHEL and Ubuntu), including user management, package management, system hardening, and troubleshooting.",
                      "Managed Windows Server environments, including IIS hosting, services, and application deployments.",
                      "Troubleshot Linux/Unix servers and application infrastructure, resolving system issues and improving platform stability.",
                      "Provided hands-on support for cloud storage, backup automation, and efficient use of object storage solutions.",
                      "Monitored web and mobile applications, maintaining system performance and uptime for production environments.",
                      "Performed root cause analysis, infrastructure optimization, and preventive improvements to increase platform reliability.",
                      "Collaborated with development, QA, and infrastructure teams to build scalable, secure solutions.",
                      "Collaborated with cross-functional teams to improve operational efficiency, documentation, and knowledge transfer."
                    ],
            dateRange: "October 2019 – February 2023"
    },
    {
            name: "Gemini Consulting",
            websiteUrl: "",
            timelineType: "Work",
            title: "Infrastructure Engineer",
            techStack: "Linux, Unix, AWS (EC2, Auto Scaling, Load Balancers), Nagios, Firewall, Bash",
            summaryPoints: [
                      "Administered Linux and Unix servers, performing installation, configuration, and ongoing monitoring.",
                      "Configured Nagios monitoring and alerting for infrastructure performance management.",
                      "Implemented AWS infrastructure solutions including EC2, Auto Scaling, and Load Balancers.",
                      "Maintained system security using firewall configurations and compliance monitoring tools.",
                      "Collaborated with cross-functional teams and communicated project updates to stakeholders to ensure successful delivery."
                    ],
            dateRange: "December 2017 – October 2019"
    },
    {
            name: "Northeastern University",
            websiteUrl: "https://www.northeastern.edu",
            timelineType: "Education",
            title: "Master of Science – Agile Project Management",
            techStack: "Agile, Project Management, Leadership, Delivery, Scrum",
            summaryPoints: [
                      "Graduate studies in Project Management with a focus on Agile methodologies, delivery practices, and team leadership.",
                      "Toronto campus — developed strong skills in stakeholder management, iterative delivery, and cross-functional collaboration."
                    ],
            dateRange: "Toronto, Canada"
    },
    {
            name: "Acharya Nagarjuna University",
            websiteUrl: "",
            timelineType: "Education",
            title: "Bachelor of Technology – Computer Science",
            techStack: "Computer Science, Networking, Programming, Systems",
            summaryPoints: [
                      "Undergraduate degree in Computer Science with foundational studies in networking, programming, operating systems, and distributed systems.",
                      "Andhra Pradesh, India."
                    ],
            dateRange: "Andhra Pradesh, India"
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
      "Google Cloud Certified – Professional Cloud DevOps Engineer",
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
      profileSummary: "Google Cloud Certified – Professional Cloud DevOps Engineer | Senior DevOps Engineer with 8+ years of experience across Azure, GCP, and cloud-native platforms. Specializing in Kubernetes (AKS/GKE), Terraform, CI/CD, Platform Engineering, and SRE.",
};
