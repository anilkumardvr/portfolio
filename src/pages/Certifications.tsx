import React, { useEffect, useRef, useState } from 'react';
import './Certifications.css';
import { FaExternalLinkAlt, FaCertificate, FaCheckCircle, FaBookOpen } from 'react-icons/fa';
import { SiGooglecloud, SiTerraform, SiMicrosoftazure, SiKubernetes } from 'react-icons/si';
import { Certification } from '../types';
import { getCertifications } from '../queries/getCertifications';

const iconData: { [key: string]: React.JSX.Element } = {
  google: <SiGooglecloud />,
  terraform: <SiTerraform />,
  azure: <SiMicrosoftazure />,
  kubernetes: <SiKubernetes />,
  learning: <FaBookOpen />,
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

interface CountUpProps { end: number; visible: boolean; }

const CountUp: React.FC<CountUpProps> = ({ end, visible }) => {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!visible) return;
    if (end === 0) { setValue(0); return; }
    let frame = 0;
    const totalFrames = 24;
    let raf: number;
    const step = () => {
      frame++;
      setValue(Math.round((end * frame) / totalFrames));
      if (frame < totalFrames) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [visible, end]);
  return <>{value}</>;
};

interface CertCardProps { cert: Certification; idx: number; }

const CertCard: React.FC<CertCardProps> = ({ cert, idx }) => {
  const { ref, visible } = useInView(0.1);
  const isInProgress = cert.status === 'in-progress';

  return (
    <div
      ref={ref}
      className={`cert-card ${visible ? 'cert-card--visible' : ''}`}
      data-accent={cert.iconName}
      style={{ '--card-delay': `${idx * 0.1}s` } as React.CSSProperties}
    >
      <div className="cert-letterbox cert-letterbox--top" />
      <div className="cert-letterbox cert-letterbox--bot" />
      <div className="cert-accent" />
      <div className="cert-spotlight" />
      <div className="cert-inner">
        <div className="cert-top-row">
          <div className="cert-icon-badge">{iconData[cert.iconName] || <FaCertificate />}</div>
          <span className={`cert-status-pill ${isInProgress ? 'cert-status-pill--progress' : 'cert-status-pill--done'}`}>
            {isInProgress ? (<><span className="cert-pulse-dot" />In Progress</>) : (<><FaCheckCircle /> Verified</>)}
          </span>
        </div>
        <h3 className="cert-title">{cert.title}</h3>
        <p className="cert-issuer">{cert.issuer}</p>
        {cert.issuedDate && <span className="cert-date">Issued {cert.issuedDate}</span>}
        {isInProgress && (
          <div className="cert-progress-track"><div className="cert-progress-fill" /></div>
        )}
        {cert.link && (
          <a href={cert.link} target="_blank" rel="noopener noreferrer" className="cert-link-btn">
            View Credential <FaExternalLinkAlt />
          </a>
        )}
      </div>
    </div>
  );
};

interface CertificationsBodyProps { certifications: Certification[]; }

const CertificationsBody: React.FC<CertificationsBodyProps> = ({ certifications }) => {
  const { ref: statsRef, visible: statsVisible } = useInView(0.2);
  const verifiedCount = certifications.filter((c) => c.status !== 'in-progress').length;
  const progressCount = certifications.filter((c) => c.status === 'in-progress').length;

  return (
    <div className="certifications-container">
      <div className="cert-page-header">
        <div className="cert-page-bar" />
        <h2 className="cert-page-title">Certifications &amp; Credentials</h2>
        <p className="cert-page-sub">Professional certifications and continuous learning in cloud &amp; DevOps</p>
      </div>

      <div className="cert-stats-row" ref={statsRef}>
        <div className="cert-stat">
          <span className="cert-stat-number"><CountUp end={verifiedCount} visible={statsVisible} /></span>
          <span className="cert-stat-label">Verified</span>
        </div>
        <div className="cert-stat-divider" />
        <div className="cert-stat">
          <span className="cert-stat-number"><CountUp end={progressCount} visible={statsVisible} /></span>
          <span className="cert-stat-label">In Progress</span>
        </div>
      </div>

      <div className="certifications-grid">
        {certifications.map((cert, index) => (
          <CertCard key={index} cert={cert} idx={index} />
        ))}
      </div>
    </div>
  );
};

const Certifications: React.FC = () => {
  const [certifications, setCertifications] = useState<Certification[]>([]);

  useEffect(() => {
    async function fetchCertifications() {
      const data = await getCertifications();
      setCertifications(data);
    }
    fetchCertifications();
  }, []);

  if (certifications.length === 0) return (
    <div className="cert-loading">
      <div className="cert-loading-n">N</div>
      <div className="cert-loading-bar"><div className="cert-loading-fill" /></div>
    </div>
  );

  return <CertificationsBody certifications={certifications} />;
};

export default Certifications;
