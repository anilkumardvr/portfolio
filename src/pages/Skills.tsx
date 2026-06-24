import React, { useEffect, useRef, useState } from 'react';
import './Skills.css';
import { getSkills } from '../queries/getSkills';

import { FaReact, FaNodeJs, FaAws, FaDocker, FaGitAlt, FaJava, FaGithub, FaJenkins, FaCloud, FaShieldAlt, FaServer, FaTerminal, FaBrain, FaCode, FaChartLine } from 'react-icons/fa';
import { SiRubyonrails, SiTypescript, SiPostgresql, SiMysql, SiKubernetes, SiGooglecloud, SiSpringboot, SiPhp, SiNetlify, SiHeroku, SiHtml5, SiCss3, SiRabbitmq, SiImessage, SiTerraform, SiArgo } from 'react-icons/si';
import { Skill } from '../types';

const iconMap: { [key: string]: JSX.Element } = {
  SiRubyonrails: <SiRubyonrails />,
  FaNodeJs: <FaNodeJs />,
  SiSpringboot: <SiSpringboot />,
  FaJava: <FaJava />,
  SiPhp: <SiPhp />,
  FaReact: <FaReact />,
  SiTypescript: <SiTypescript />,
  FaAws: <FaAws />,
  FaDocker: <FaDocker />,
  SiPostgresql: <SiPostgresql />,
  SiMysql: <SiMysql />,
  SiKubernetes: <SiKubernetes />,
  SiGooglecloud: <SiGooglecloud />,
  SiHeroku: <SiHeroku />,
  SiNetlify: <SiNetlify />,
  SiRabbitmq: <SiRabbitmq />,
  SiImessage: <SiImessage />,
  FaGithub: <FaGithub />,
  FaJenkins: <FaJenkins />,
  FaCloud: <FaCloud />,
  FaShieldAlt: <FaShieldAlt />,
  FaServer: <FaServer />,
  FaTerminal: <FaTerminal />,
  FaBrain: <FaBrain />,
  FaCode: <FaCode />,
  FaChartLine: <FaChartLine />,
  SiTerraform: <SiTerraform />,
  SiArgo: <SiArgo />,
};

function useInView(threshold = 0.15) {
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

interface SkillCardProps { skill: Skill; idx: number; catDelay: number; }

const SkillCard: React.FC<SkillCardProps> = ({ skill, idx, catDelay }) => {
  const { ref, visible } = useInView(0.1);
  return (
    <div
      ref={ref}
      className={`nf-skill-card ${visible ? 'nf-skill-card--visible' : ''}`}
      style={{ '--card-delay': `${catDelay + idx * 0.07}s` } as React.CSSProperties}
    >
      <div className="nf-skill-letterbox nf-skill-letterbox--top" />
      <div className="nf-skill-letterbox nf-skill-letterbox--bot" />
      <div className="nf-skill-spotlight" />
      <div className="nf-skill-accent" />
      <div className="nf-skill-inner">
        <div className="nf-skill-icon">{iconMap[skill.icon] || <FaReact />}</div>
        <h3 className="nf-skill-name">{skill.name}</h3>
        <p className="nf-skill-desc">{skill.description}</p>
      </div>
    </div>
  );
};

interface CategoryBlockProps { category: string; skills: Skill[]; catIdx: number; }

const CategoryBlock: React.FC<CategoryBlockProps> = ({ category, skills, catIdx }) => {
  const { ref, visible } = useInView(0.1);
  return (
    <div ref={ref} className={`nf-skill-category ${visible ? 'nf-skill-category--visible' : ''}`} style={{ '--cat-delay': `${catIdx * 0.12}s` } as React.CSSProperties}>
      <div className="nf-cat-header">
        <div className="nf-cat-bar" />
        <h3 className="nf-cat-title">{category}</h3>
      </div>
      <div className="nf-skills-grid">
        {skills.map((skill: Skill, idx: number) => (
          <SkillCard key={idx} skill={skill} idx={idx} catDelay={catIdx * 0.12} />
        ))}
      </div>
    </div>
  );
};

const Skills: React.FC = () => {
  const [skillsData, setSkillsData] = useState<Skill[]>([]);

  useEffect(() => {
    async function fetchSkills() {
      const data = await getSkills();
      setSkillsData(data);
    }
    fetchSkills();
  }, []);

  if (skillsData.length === 0) return (
    <div className="nf-skills-loading">
      <div className="nf-loading-n">N</div>
      <div className="nf-loading-bar"><div className="nf-loading-fill" /></div>
    </div>
  );

  const skillsByCategory = skillsData.reduce((acc: any, skill: any) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill);
    return acc;
  }, {});

  return (
    <div className="nf-skills-container">
      <div className="nf-skills-page-header">
        <div className="nf-skills-page-bar" />
        <h2 className="nf-skills-page-title">Technical Skills</h2>
        <p className="nf-skills-page-sub">Tools and technologies I work with</p>
      </div>
      {Object.keys(skillsByCategory).map((category: string, catIdx: number) => (
        <CategoryBlock key={catIdx} category={category} skills={skillsByCategory[category]} catIdx={catIdx} />
      ))}
    </div>
  );
};

export default Skills;
