import React, { useEffect, useRef, useState } from 'react';
import './Projects.css';
import { FaReact, FaNodeJs, FaAws, FaDatabase, FaDocker, FaAngular, FaGithub, FaGitlab, FaGoogle, FaJava, FaJenkins, FaMicrosoft, FaPython, FaVuejs } from 'react-icons/fa';
import { SiRubyonrails, SiPostgresql, SiMongodb, SiMaterialdesign, SiHtml5, SiCss3, SiJquery, SiAwsamplify, SiFirebase, SiTerraform, SiArgo, SiKubernetes } from 'react-icons/si';
import { Project } from '../types';
import { getProjects } from '../queries/getProjects';
import { GrDeploy, GrKubernetes } from "react-icons/gr";

const techIcons: { [key: string]: JSX.Element } = {
  "ReactJS": <FaReact />,
  "NodeJS": <FaNodeJs />,
  "AWS": <FaAws />,
  "PostgreSQL": <SiPostgresql />,
  "MongoDB": <SiMongodb />,
  "Ruby On Rails": <SiRubyonrails />,
  "Material UI": <SiMaterialdesign />,
  "HTML5": <SiHtml5 />,
  "CSS3": <SiCss3 />,
  "jQuery": <SiJquery />,
  "AWS-ECS": <SiAwsamplify />,
  'Cognito': <FaAws />,
  'Lambda': <FaAws />,
  'ECS': <FaAws />,
  'Jenkins': <FaJenkins />,
  'Docker': <FaDocker />,
  'GraphQL': <FaDatabase />,
  'CI/CD': <FaGitlab />,
  'GitLab': <FaGitlab />,
  'GitHub': <FaGithub />,
  'GitHub Actions': <FaGithub />,
  'Heroku': <GrDeploy />,
  'Netlify': <GrDeploy />,
  'Firebase': <SiFirebase />,
  'GCP': <FaGoogle />,
  'Azure': <FaMicrosoft />,
  'Kubernetes': <GrKubernetes />,
  'AKS': <GrKubernetes />,
  'GKE': <GrKubernetes />,
  'Terraform': <SiTerraform />,
  'ArgoCD': <SiArgo />,
  'Helm': <GrKubernetes />,
  'Java': <FaJava />,
  'Spring Boot': <FaJava />,
  'Python': <FaPython />,
  'Node.js': <FaNodeJs />,
  'Azure Key Vault': <FaMicrosoft />,
  'Workload Identity': <FaMicrosoft />,
  'ARM Templates': <FaMicrosoft />,
  'RBAC': <FaMicrosoft />,
  'Prometheus': <FaDatabase />,
  'Grafana': <FaDatabase />,
  'Azure Monitor': <FaMicrosoft />,
  'Elasticsearch': <FaDatabase />,
  'Log Analytics': <FaMicrosoft />,
  'Datadog': <FaDatabase />,
  'SRE': <FaDatabase />,
  'Incident Management': <FaDatabase />,
  'Root Cause Analysis': <FaDatabase />,
  'RabbitMQ': <FaDatabase />,
  'ActiveMQ Artemis': <FaDatabase />,
  'MinIO': <FaDatabase />,
  'Couchbase': <FaDatabase />,
  'Memcached': <FaDatabase />,
  'YAML': <FaDatabase />,
  'Bash': <FaDatabase />,
  'GitOps': <FaGithub />,
  'Internal Developer Platforms': <FaDatabase />,
  'Self-Service Tooling': <FaDatabase />,
};

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

interface ProjectCardProps { project: Project; index: number; }

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  const { ref, visible } = useInView(0.08);
  const delay = index * 0.13;
  return (
    <div
      ref={ref}
      className={`nf-project-card ${visible ? 'nf-project-card--visible' : ''}`}
      style={{ '--proj-delay': `${delay}s` } as React.CSSProperties}
    >
      <div className="nf-proj-letterbox nf-proj-letterbox--top" />
      <div className="nf-proj-letterbox nf-proj-letterbox--bot" />
      <div className="nf-proj-spotlight" />
      <div className="nf-proj-img-wrap">
        <img src={project.image.url} alt={project.title} className="nf-proj-img" />
        <div className="nf-proj-img-overlay" />
      </div>
      <div className="nf-proj-body">
        <div className="nf-proj-accent" />
        <h3 className="nf-proj-title">{project.title}</h3>
        <p className="nf-proj-desc">{project.description}</p>
        <div className="nf-proj-tech">
          {project.techUsed.split(', ').map((tech, i) => (
            <span key={i} className="nf-proj-badge" style={{ '--badge-delay': `${delay + 0.2 + i * 0.04}s` } as React.CSSProperties}>
              <span className="nf-proj-badge-icon">{techIcons[tech] || null}</span>
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

const Projects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    async function fetchProjects() {
      const data = await getProjects();
      setProjects(data);
    }
    fetchProjects();
  }, []);

  if (projects.length === 0) return (
    <div className="nf-proj-loading">
      <div className="nf-loading-n">N</div>
      <div className="nf-loading-bar"><div className="nf-loading-fill" /></div>
    </div>
  );

  return (
    <div className="nf-projects-container">
      <div className="nf-proj-page-header">
        <div className="nf-proj-page-bar" />
        <h2 className="nf-proj-page-title">Projects</h2>
        <p className="nf-proj-page-sub">Key engineering work and initiatives</p>
      </div>
      <div className="nf-projects-grid">
        {projects.map((project, index) => (
          <ProjectCard key={index} project={project} index={index} />
        ))}
      </div>
    </div>
  );
};

export default Projects;
