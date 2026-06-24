import React, { useEffect, useRef, useState } from 'react';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { MdOutlineWork as WorkIcon } from 'react-icons/md';
import { IoSchool as SchoolIcon } from 'react-icons/io5';
import { FaStar as StarIcon, FaLinkedin } from 'react-icons/fa';
import './WorkExperience.css';
import { TimelineItem } from '../types';
import { getTimeline } from '../queries/getTimeline';

const WORK_COLORS = [
  { bg: 'rgb(229,9,20)', arrow: 'rgb(229,9,20)', icon: 'rgb(229,9,20)' },
  { bg: 'rgb(33,150,243)', arrow: 'rgb(33,150,243)', icon: 'rgb(33,150,243)' },
  { bg: 'rgb(76,175,80)', arrow: 'rgb(76,175,80)', icon: 'rgb(76,175,80)' },
  { bg: 'rgb(156,39,176)', arrow: 'rgb(156,39,176)', icon: 'rgb(156,39,176)' },
  ];
const EDU_COLORS = [
  { bg: 'rgb(255,152,0)', arrow: 'rgb(255,152,0)', icon: 'rgb(255,152,0)' },
  { bg: 'rgb(0,188,212)', arrow: 'rgb(0,188,212)', icon: 'rgb(0,188,212)' },
  ];

// Hook: returns true once the element has entered the viewport
function useInView(ref: React.RefObject<HTMLElement | null>, threshold = 0.15) {
    const [inView, setInView] = useState(false);
    useEffect(() => {
          if (!ref.current) return;
          const observer = new IntersectionObserver(
                  ([entry]) => { if (entry.isIntersecting) { setInView(true); observer.disconnect(); } },
            { threshold }
                );
          observer.observe(ref.current);
          return () => observer.disconnect();
    }, [ref, threshold]);
    return inView;
}

// Animated card wrapper — fades + slides in when scrolled into view
const AnimatedCard: React.FC<{ children: React.ReactNode; delay?: number; direction?: 'left' | 'right' }> = ({
    children, delay = 0, direction = 'left',
}) => {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref as React.RefObject<HTMLElement | null>);
    return (
          <div
                  ref={ref}
                  className={`netflix-card-wrapper ${inView ? 'netflix-card-wrapper--visible' : ''}`}
                  style={{
                            transitionDelay: inView ? `${delay}ms` : '0ms',
                            '--slide-dir': direction === 'left' ? '-40px' : '40px',
                  } as React.CSSProperties}
                >
            {children}
          </div>div>
        );
};

const WorkExperience: React.FC = () => {
    const [timeLineData, setTimeLineData] = useState<TimelineItem[] | null>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const headerInView = useInView(headerRef as React.RefObject<HTMLElement | null>, 0.1);
  
    useEffect(() => {
          async function fetchTimelineItem() {
                  const data = await getTimeline();
                  setTimeLineData(data);
          }
          fetchTimelineItem();
    }, []);
  
    if (!timeLineData) return (
          <div className="timeline-loading">
                <div className="loading-spinner" />
                <p>Loading...</p>p>
          </div>div>
        );
  
    let wi = 0;
    let ei = 0;
  
    return (
          <>
            {/* ---- Header ---- */}
                <div ref={headerRef} className={`timeline-container ${headerInView ? 'timeline-container--visible' : ''}`}>
                        <h2 className="timeline-title">Work Experience and Education Timeline</h2>h2>
                        <p className="timeline-subtitle">8+ Years of IT Experience - Senior DevOps and Cloud Engineer</p>p>
                        <a
                                    href="https://linkedin.com/in/anilkumardevandla"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="linkedin-btn"
                                  >
                                  <FaLinkedin style={{ marginRight: '8px', fontSize: '1.2rem' }} />
                                  View LinkedIn Profile
                        </a>a>
                </div>div>
          
            {/* ---- Timeline ---- */}
                <VerticalTimeline animate={true}>
                  {timeLineData.map((item, index) => {
                      const isWork = item.timelineType === 'Work' || item.timelineType === 'work';
                      const color = isWork ? WORK_COLORS[wi++ % WORK_COLORS.length] : EDU_COLORS[ei++ % EDU_COLORS.length];
                      // Alternate slide direction for visual rhythm
                      const direction = index % 2 === 0 ? 'left' : 'right';
                      const staggerDelay = (index % 3) * 80; // slight stagger within a group
            
                      return (
                                    <VerticalTimelineElement
                                                    key={index}
                                                    className={'vertical-timeline-element--' + (isWork ? 'work' : 'education')}
                                                    contentStyle={{
                                                                      background: '#141414',
                                                                      color: '#fff',
                                                                      border: `2px solid ${color.bg}`,
                                                                      borderRadius: '12px',
                                                                      overflow: 'hidden',
                                                                      padding: 0,
                                                    }}
                                                    contentArrowStyle={{ borderRight: `7px solid ${color.arrow}` }}
                                                    date={item.dateRange}
                                                    iconStyle={{ background: color.icon, color: '#fff' }}
                                                    icon={isWork ? <WorkIcon /> : <SchoolIcon />}
                                                  >
                                                  <AnimatedCard delay={staggerDelay} direction={direction}>
                                                    {/* Netflix-style colour bar at top of card */}
                                                                  <div className="netflix-card-bar" style={{ background: color.bg }} />
                                                  
                                                                  <div className="netflix-card-body">
                                                                    {/* Header row */}
                                                                                    <div className="timeline-card-header">
                                                                                                        <h3 className="vertical-timeline-element-title">
                                                                                                          {isWork
                                                                                                                                    ? item.title
                                                                                                                                    : (item.websiteUrl
                                                                                                                                                                 ? <a href={item.websiteUrl} target="_blank" rel="noopener noreferrer" className="company-link">{item.name}</a>a>
                                                                                                                                                                 : item.name)}
                                                                                                          </h3>h3>
                                                                                                        <span className={'timeline-badge timeline-badge--' + (isWork ? 'work' : 'edu')}>
                                                                                                          {isWork ? 'Work' : 'Education'}
                                                                                                          </span>span>
                                                                                      </div>div>
                                                                  
                                                                    {isWork && (
                                                                        <h4 className="vertical-timeline-element-subtitle">
                                                                          {item.websiteUrl
                                                                                                    ? <a href={item.websiteUrl} target="_blank" rel="noopener noreferrer" className="company-link">{item.name}</a>a>
                                                                                                : item.name}
                                                                        </h4>h4>
                                                                                    )}
                                                                    {!isWork && <h4 className="vertical-timeline-element-subtitle edu-subtitle">{item.title}</h4>h4>}
                                                                  
                                                                    {/* Tech chips */}
                                                                                    <div className="tech-stack-wrap">
                                                                                      {item.techStack.split(',').map((t, i) => (
                                                                          <span
                                                                                                    key={i}
                                                                                                    className={'tech-chip' + (!isWork ? ' tech-chip--edu' : '')}
                                                                                                    style={{ animationDelay: `${i * 60}ms` }}
                                                                                                  >
                                                                            {t.trim()}
                                                                          </span>span>
                                                                        ))}
                                                                                      </div>div>
                                                                  
                                                                    {/* Bullet points */}
                                                                                    <ul className="timeline-bullets">
                                                                                      {item.summaryPoints.map((pt, i) => (
                                                                          <li
                                                                                                    key={i}
                                                                                                    className="timeline-bullet-item"
                                                                                                    style={{ animationDelay: `${i * 70}ms` }}
                                                                                                  >
                                                                                                  <span className="bullet-dot" style={{ background: color.bg }} />
                                                                            {pt}
                                                                          </li>li>
                                                                        ))}
                                                                                      </ul>ul>
                                                                  </div>div>
                                                  
                                                    {/* Netflix-style shimmer overlay (shows on hover via CSS) */}
                                                                  <div className="netflix-shimmer" />
                                                  </AnimatedCard>AnimatedCard>
                                    </VerticalTimelineElement>VerticalTimelineElement>
                                  );
          })}
                        <VerticalTimelineElement iconStyle={{ background: 'rgb(16,204,82)', color: '#fff' }} icon={<StarIcon />} />
                </VerticalTimeline>VerticalTimeline>
          </>>
        );
};

export default WorkExperience;</></div>
