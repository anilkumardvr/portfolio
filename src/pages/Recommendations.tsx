import { useEffect, useRef, useState, CSSProperties } from 'react';
import './Recommendations.css';
import { SiPython, SiCplusplus, SiGo, SiRust } from 'react-icons/si';
import { FaBrain, FaSitemap, FaShieldAlt, FaRobot } from 'react-icons/fa';

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

const recommendations = [
  { icon: <SiPython />, title: 'Python', match: 98, because: 'Because you automate with Terraform & Bash', description: 'Level up scripting and automation for infrastructure tooling, CI/CD pipelines, and platform utilities.' },
  { icon: <FaBrain />, title: 'Artificial Intelligence & ML', match: 96, because: 'Because you build observability & automation platforms', description: 'Apply machine learning to anomaly detection, capacity planning, and intelligent alerting.' },
  { icon: <SiGo />, title: 'Go (Golang)', match: 94, because: 'Because you work with Kubernetes & GitOps', description: 'Build fast, native cloud tooling, custom Kubernetes operators, and controllers.' },
  { icon: <FaSitemap />, title: 'System Design', match: 95, because: 'Because you architect platform infrastructure', description: 'Design resilient, scalable, distributed systems for high-availability platforms.' },
  { icon: <FaShieldAlt />, title: 'Cloud Security', match: 92, because: 'Because you manage Azure & GCP infrastructure', description: 'Harden CI/CD pipelines, secrets management, and cloud-native infrastructure against threats.' },
  { icon: <SiCplusplus />, title: 'C++', match: 90, because: 'Because you value performance-critical systems', description: 'Strengthen low-level, memory-safe programming fundamentals for systems engineering.' },
  { icon: <SiRust />, title: 'Rust', match: 88, because: 'Because you build reliable infrastructure tools', description: 'Explore memory-safe, high-performance tooling for modern cloud-native platforms.' },
  { icon: <FaRobot />, title: 'Generative AI Engineering', match: 97, because: 'Because you build developer platforms', description: 'Design and ship LLM-powered developer tools, copilots, and platform automations.' },
];

function RecCard({ item, idx }: { item: (typeof recommendations)[number]; idx: number }) {
  const { ref, visible } = useInView(0.15);
  return (
    <div
      ref={ref}
      className={`rec-card ${visible ? 'rec-card--visible' : ''}`}
      style={{ '--i': idx } as CSSProperties}
    >
      <div className="rec-letterbox rec-letterbox--top" />
      <div className="rec-letterbox rec-letterbox--bot" />
      <div className="rec-accent" />
      <div className="rec-spotlight" />
      <div className="rec-card-inner">
        <div className="rec-card-top">
          <div className="rec-icon">{item.icon}</div>
          <span className="rec-match">{item.match}% Match</span>
        </div>
        <h3 className="rec-card-title">{item.title}</h3>
        <p className="rec-because">{item.because}</p>
        <p className="rec-desc">{item.description}</p>
      </div>
    </div>
  );
}

export default function Recommendations() {
  const { ref: headerRef, visible: headerVisible } = useInView(0.15);

  return (
    <div className="rec-container">
      <div ref={headerRef} className={`rec-header ${headerVisible ? 'rec-header--visible' : ''}`}>
        <div className="rec-bar" />
        <h1 className="rec-title">Recommended For You</h1>
        <p className="rec-subtitle">Skills and technologies next on my learning roadmap</p>
      </div>

      <div className="rec-grid">
        {recommendations.map((item, idx) => (
          <RecCard key={item.title} item={item} idx={idx} />
        ))}
      </div>
    </div>
  );
}
