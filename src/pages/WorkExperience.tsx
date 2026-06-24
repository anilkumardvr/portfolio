import React, { useEffect, useState, useRef } from 'react';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { MdOutlineWork as WorkIcon } from 'react-icons/md';
import { IoSchool as SchoolIcon } from 'react-icons/io5';
import { FaStar as StarIcon, FaLinkedin, FaExternalLinkAlt } from 'react-icons/fa';
import './WorkExperience.css';
import { TimelineItem } from '../types';
import { getTimeline } from '../queries/getTimeline';

const WORK_COLORS = [
  { bg: 'rgb(229, 9, 20)', arrow: 'rgb(229, 9, 20)' },
  { bg: 'rgb(33, 150, 243)', arrow: 'rgb(33, 150, 243)' },
  { bg: 'rgb(76, 175, 80)', arrow: 'rgb(76, 175, 80)' },
  { bg: 'rgb(156, 39, 176)', arrow: 'rgb(156, 39, 176)' },
  ];
const EDU_COLORS = [
  { bg: 'rgb(255, 152, 0)', arrow: 'rgb(255, 152, 0)' },
  { bg: 'rgb(0, 188, 212)', arrow: 'rgb(0, 188, 212)' },
  ];

const WorkExperience: React.FC = () => {
    const [timeLineData, setTimeLineData] = useState<TimelineItem[] | null>(null);
    const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());
    const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
          async function fetchTimelineItem() {
                  const data = await getTimeline();
                  setTimeLineData(data);
          }
          fetchTimelineItem();
    }, []);

    useEffect(() => {
          if (!timeLineData) return;
          const observers: IntersectionObserver[] = [];
          itemRefs.current.forEach((ref, idx) => {
                  if (!ref) return;
                  const observer = new IntersectionObserver(
                            ([entry]) => {
                                        if (entry.isIntersecting) {
                                                      setVisibleItems(prev => {
                                                                      const next = new Set(prev);
                                                                      next.add(idx);
                                                                      return next;
                                                      });
                                        }
                            },
                    { threshold: 0.1 }
                          );
                  observer.observe(ref);
                  observers.push(observer);
          });
          return () => observers.forEach(o => o.disconnect());
    }, [timeLineData]);

    if (!timeLineData) return (
          <div className="timeline-loading">
                <div className="loading-spinner" />
                <p>Loading timeline...</p>p>
          </div>div>
        );
  
    let workIdx = 0;
    let eduIdx = 0;
  
    return (
          <>
                <div className="timeline-container">
                        <h2 className="timeline-title">Work Experience &amp; Education Timeline</h2>h2>
                        <p className="timeline-subtitle">8+ Years of IT Experience | Senior DevOps &amp; Cloud Engineer</p>p>
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
                <VerticalTimeline animate={true}>
                  {timeLineData.map((item, index) => {
                      const isWork = item.timelineType === 'Work' || item.timelineType === 'work';
                      const color = isWork
                                    ? WORK_COLORS[workIdx++ % WORK_COLORS.length]
                                    : EDU_COLORS[eduIdx++ % EDU_COLORS.length];
            
                      return (
                                    <VerticalTimelineElement
                                                    key={index}
                                                    className={`vertical-timeline-element--${isWork ? 'work' : 'education'}`}
                                                    contentStyle={{
                                                                      background: '#1a1a1a',
                                                                      color: '#fff',
                                                                      border: `2px solid ${color.bg}`,
                                                                      borderRadius: '12px',
                                                                      boxShadow: `0 4px 24px ${color.bg}33`,
                                                    }}
                                                    contentArrowStyle={{ borderRight: `7px solid ${color.arrow}` }}
                                                    date={item.dateRange}
                                                    iconStyle={{ background: color.bg, color: '#fff' }}
                                                    icon={isWork ? <WorkIcon /> : <SchoolIcon />}
                                                  >
                                                  <div
                                                                    ref={el => { itemRefs.current[index] = el; }}
                                                                    className={`timeline-card ${visibleItems.has(index) ? 'timeline-card--visible' : ''}`}
                                                                  >
                                                    {isWork ? (
                                                                                      <>
                                                                                                          <div className="timeline-card-header">
                                                                                                                                <h3 className="vertical-timeline-element-title">{item.title}</h3>h3>
                                                                                                                                <span className="timeline-badge timeline-badge--work">Work</span>span>
                                                                                                            </div>div>
                                                                                                          <h4 className="vertical-timeline-element-subtitle">
                                                                                                            {item.websiteUrl ? (
                                                                                                                <a href={item.websiteUrl} target="_blank" rel="noopener noreferrer" className="company-link">
                                                                                                                  {item.name} <FaExternalLinkAlt style={{ fontSize: '0.7rem', verticalAlign: 'middle' }} />
                                                                                                                  </a>a>
                                                                                                              ) : (
                                                                                                                item.name
                                                                                                              )}
                                                                                                            </h4>h4>
                                                                                                          <div className="tech-stack-wrap">
                                                                                                            {item.techStack.split(',').map((tech, i) => (
                                                                                                                <span key={i} className="tech-chip" style={{ animationDelay: `${i * 0.05}s` }}>
                                                                                                                  {tech.trim()}
                                                                                                                  </span>span>
                                                                                                              ))}
                                                                                                            </div>div>
                                                                                                          <ul className="timeline-bullets">
                                                                                                            {item.summaryPoints.map((point, i) => (
                                                                                                                <li key={i} className="timeline-bullet-item" style={{ animationDelay: `${i * 0.08}s` }}>
                                                                                                                                          <span className="bullet-dot" style={{ background: color.bg }} />
                                                                                                                  {point}
                                                                                                                  </li>li>
                                                                                                              ))}
                                                                                                            </ul>ul>
                                                                                        </>>
                                                                                    ) : (
                                                                                      <>
                                                                                                          <div className="timeline-card-header">
                                                                                                                                <h3 className="vertical-timeline-element-title">
                                                                                                                                  {item.websiteUrl ? (
                                                                                                                  <a href={item.websiteUrl} target="_blank" rel="noopener noreferrer" className="company-link">
                                                                                                                    {item.name} <FaExternalLinkAlt style={{ fontSize: '0.7rem', verticalAlign: 'middle' }} />
                                                                                                                    </a>a>
                                                                                                                ) : (
                                                                                                                  item.name
                                                                                                                )}
                                                                                                                                  </h3>h3>
                                                                                                                                <span className="timeline-badge timeline-badge--edu">Education</span>span>
                                                                                                            </div>div>
                                                                                                          <h4 className="vertical-timeline-element-subtitle edu-subtitle">{item.title}</h4>h4>
                                                                                        {item.techStack && (
                                                                                                              <div className="tech-stack-wrap">
                                                                                                                {item.techStack.split(',').map((tech, i) => (
                                                                                                                                          <span key={i} className="tech-chip tech-chip--edu" style={{ animationDelay: `${i * 0.05}s` }}>
                                                                                                                                            {tech.trim()}
                                                                                                                                            </span>span>
                                                                                                                                        ))}
                                                                                                                </div>div>
                                                                                                          )}
                                                                                                          <ul className="timeline-bullets">
                                                                                                            {item.summaryPoints.map((point, i) => (
                                                                                                                <li key={i} className="timeline-bullet-item" style={{ animationDelay: `${i * 0.08}s` }}>
                                                                                                                                          <span className="bullet-dot" style={{ background: color.bg }} />
                                                                                                                  {point}
                                                                                                                  </li>li>
                                                                                                              ))}
                                                                                                            </ul>ul>
                                                                                        </>>
                                                                                    )}
                                                  </div>div>
                                    </VerticalTimelineElement>VerticalTimelineElement>
                                  );
          })}
                        <VerticalTimelineElement
                                    iconStyle={{ background: 'rgb(16, 204, 82)', color: '#fff' }}
                                    icon={<StarIcon />}
                                  />
                </VerticalTimeline>VerticalTimeline>
          </>>
        );
};

export default WorkExperience;</></></></div>
