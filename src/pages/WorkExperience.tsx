import React, { useEffect, useRef, useState } from 'react';
import { MdOutlineWork as WorkIcon } from 'react-icons/md';
import { IoSchool as SchoolIcon } from 'react-icons/io5';
import { FaLinkedin, FaExternalLinkAlt } from 'react-icons/fa';
import './WorkExperience.css';
import { TimelineItem } from '../types';
import { getTimeline } from '../queries/getTimeline';

/* ─── colour palette per work-entry index ─── */
const WORK_COLORS = ['#e50914', '#2196f3', '#4caf50', '#9c27b0'];
const EDU_COLORS  = ['#ff9800', '#00bcd4'];

/* ─── IntersectionObserver hook ─── */
function useInView(ref: React.RefObject<HTMLElement | null>, threshold = 0.12) {
    const [inView, setInView] = useState(false);
    useEffect(() => {
          if (!ref.current) return;
          const io = new IntersectionObserver(
                  ([e]) => { if (e.isIntersecting) { setInView(true); io.disconnect(); } },
            { threshold }
                );
          io.observe(ref.current);
          return () => io.disconnect();
    }, [ref, threshold]);
    return inView;
}

/* ─── Single experience card ─── */
interface CardProps {
    item: TimelineItem;
    index: number;
    color: string;
    isWork: boolean;
}

const ExperienceCard: React.FC<CardProps> = ({ item, index, color, isWork }) => {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref as React.RefObject<HTMLElement | null>);
    const fromLeft = index % 2 === 0;

    return (
          <div
                  ref={ref}
                  className={`nf-card ${inView ? 'nf-card--visible' : ''} ${fromLeft ? 'nf-card--from-left' : 'nf-card--from-right'}`}
                  style={{ '--accent': color } as React.CSSProperties}
                >
            {/* ── Letterbox top bar (sweeps in like Netflix title card) ── */}
                <div className="nf-letterbox nf-letterbox--top" />
                <div className="nf-letterbox nf-letterbox--bottom" />
          
            {/* ── Left accent strip ── */}
                <div className="nf-accent-strip" />
          
            {/* ── Card content ── */}
                <div className="nf-card-inner">
                
                  {/* COMPANY + TENURE HERO ROW */}
                        <div className="nf-hero">
                                  <div className="nf-hero-icon">
                                    {isWork ? <WorkIcon /> : <SchoolIcon />}
                                  </div>div>
                                  <div className="nf-hero-text">
                                              <div className="nf-company-row">
                                                {item.websiteUrl ? (
                                  <a href={item.websiteUrl} target="_blank" rel="noopener noreferrer" className="nf-company-name">
                                    {item.name}
                                                    <FaExternalLinkAlt className="nf-ext-icon" />
                                  </a>a>
                                ) : (
                                  <span className="nf-company-name">{item.name}</span>span>
                                                            )}
                                                            <span className={`nf-type-badge ${isWork ? 'nf-type-badge--work' : 'nf-type-badge--edu'}`}>
                                                              {isWork ? 'WORK' : 'EDU'}
                                                            </span>span>
                                              </div>div>
                                              <div className="nf-role">{item.title}</div>div>
                                              <div className="nf-tenure">
                                                            <span className="nf-tenure-dot" />
                                                {item.dateRange}
                                              </div>div>
                                  </div>div>
                        </div>div>
                
                  {/* DIVIDER */}
                        <div className="nf-divider" />
                
                  {/* TECH CHIPS */}
                        <div className="nf-chips">
                          {item.techStack.split(',').map((t, i) => (
                              <span
                                              key={i}
                                              className={`nf-chip ${isWork ? '' : 'nf-chip--edu'}`}
                                              style={{ animationDelay: `${0.4 + i * 0.045}s` }}
                                            >
                                {t.trim()}
                              </span>span>
                            ))}
                        </div>div>
                
                  {/* BULLETS */}
                        <ul className="nf-bullets">
                          {item.summaryPoints.map((pt, i) => (
                              <li
                                              key={i}
                                              className="nf-bullet"
                                              style={{ animationDelay: `${0.55 + i * 0.07}s` }}
                                            >
                                            <span className="nf-bullet-bar" />
                                {pt}
                              </li>li>
                            ))}
                        </ul>ul>
                </div>div>
          
            {/* ── Spotlight sweep overlay ── */}
                <div className="nf-spotlight" />
          </div>div>
        );
};

/* ─── Main component ─── */
const WorkExperience: React.FC = () => {
    const [data, setData] = useState<TimelineItem[] | null>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const headerInView = useInView(headerRef as React.RefObject<HTMLElement | null>, 0.05);
  
    useEffect(() => {
          getTimeline().then(setData);
    }, []);
  
    if (!data) return (
          <div className="nf-loading">
                <div className="nf-loading-logo">N</div>div>
                <div className="nf-loading-bar"><div className="nf-loading-fill" /></div>div>
          </div>div>
        );
  
    let wi = 0;
    let ei = 0;
  
    return (
          <div className="nf-page">
          
            {/* ── HERO HEADER ── */}
                <div ref={headerRef} className={`nf-header ${headerInView ? 'nf-header--visible' : ''}`}>
                        <div className="nf-header-eyebrow">CAREER TIMELINE</div>div>
                        <h1 className="nf-header-title">Work Experience<br />&amp; Education</h1>h1>
                        <p className="nf-header-sub">8+ Years of IT Experience · Senior DevOps &amp; Cloud Engineer</p>p>
                        <a
                                    href="https://linkedin.com/in/anilkumardevandla"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="nf-linkedin-btn"
                                  >
                                  <FaLinkedin />
                                  View LinkedIn Profile
                        </a>a>
                </div>div>
          
            {/* ── TIMELINE TRACK ── */}
                <div className="nf-timeline">
                        <div className="nf-track-line" />
                
                  {data.map((item, index) => {
                      const isWork = item.timelineType === 'Work' || item.timelineType === 'work';
                      const color  = isWork ? WORK_COLORS[wi++ % WORK_COLORS.length] : EDU_COLORS[ei++ % EDU_COLORS.length];
                      return (
                                    <div key={index} className="nf-track-row">
                                      {/* Timeline node */}
                                                  <div className="nf-node-wrap">
                                                                  <div className="nf-node" style={{ background: color, boxShadow: `0 0 0 4px ${color}33` }}>
                                                                    {isWork ? <WorkIcon /> : <SchoolIcon />}
                                                                  </div>div>
                                                                  <div className="nf-node-pulse" style={{ borderColor: color }} />
                                                  </div>div>
                                    
                                      {/* Card */}
                                                  <ExperienceCard item={item} index={index} color={color} isWork={isWork} />
                                    </div>div>
                                  );
          })}
                </div>div>
          </div>div>
        );
};

export default WorkExperience;</div>
