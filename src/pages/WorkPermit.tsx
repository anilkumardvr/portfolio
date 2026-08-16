import { useEffect, useRef, useState, CSSProperties } from 'react';
import './WorkPermit.css';
import { FaIdCard, FaMapMarkerAlt, FaBuilding, FaBriefcase, FaCheckCircle, FaStamp } from 'react-icons/fa';

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

const stats = [
  { icon: <FaIdCard />, label: 'Status', value: 'Open Work Permit Holder' },
  { icon: <FaMapMarkerAlt />, label: 'Location', value: 'Toronto, Ontario, Canada' },
  { icon: <FaBuilding />, label: 'Employer Requirement', value: 'No sponsorship required' },
  { icon: <FaBriefcase />, label: 'Role Availability', value: 'Contract, full-time, hybrid, remote, or onsite' },
];

const checklist = [
  'No LMIA required',
  'No employer sponsorship needed',
  'Immediately available to start',
  'Full mobility — open to any employer across Canada',
];

export default function WorkPermit() {
  const { ref: cardRef, visible: cardVisible } = useInView(0.1);

  return (
    <div className="work-permit-container">
      <div className="wp-glow" />

      <div ref={cardRef} className={`permit-card ${cardVisible ? 'permit-card--visible' : ''}`}>
        <div className="wp-stamp" aria-hidden="true">
          <FaStamp className="wp-stamp-icon" />
          <span>Authorized</span>
          <span>To Work</span>
        </div>

        <div className="wp-badge">
          <span className="wp-badge-dot" />
          Canada · Open Work Permit
        </div>

        <h2>Work Authorization</h2>
        <div className="wp-title-bar" />

        <p className="permit-summary">
          I am currently residing in Canada and hold an Open Work Permit. I am legally authorized
          to work for eligible employers across Canada without employer sponsorship or LMIA support.
        </p>

        <div className="permit-grid">
          {stats.map((stat, idx) => (
            <div key={stat.label} className="wp-stat-card" style={{ '--i': idx } as CSSProperties}>
              <div className="wp-stat-letterbox wp-stat-letterbox--top" />
              <div className="wp-stat-letterbox wp-stat-letterbox--bot" />
              <div className="wp-stat-accent" />
              <div className="wp-stat-spotlight" />
              <div className="wp-stat-inner">
                <div className="wp-stat-icon">{stat.icon}</div>
                <span>{stat.label}</span>
                <strong>{stat.value}</strong>
              </div>
            </div>
          ))}
        </div>

        <div className="wp-checklist">
          {checklist.map((item, idx) => (
            <div key={item} className="wp-check-item" style={{ '--i': idx } as CSSProperties}>
              <FaCheckCircle className="wp-check-icon" />
              <span>{item}</span>
            </div>
          ))}
        </div>

        <p className="note">
          Open to DevOps, Cloud Engineering, Platform Engineering, SRE, and Infrastructure
          Automation opportunities across Canada.
        </p>
      </div>
    </div>
  );
}
