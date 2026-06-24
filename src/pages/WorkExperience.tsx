import React, { useEffect, useState } from 'react';
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

const WorkExperience: React.FC = () => {
  const [timeLineData, setTimeLineData] = useState<TimelineItem[] | null>(null);

  useEffect(() => {
    async function fetchTimelineItem() {
      const data = await getTimeline();
      setTimeLineData(data);
    }
    fetchTimelineItem();
  }, []);

  if (!timeLineData) return <div className="timeline-loading"><div className="loading-spinner" /><p>Loading...</p></div>;

  let wi = 0;
  let ei = 0;

  return (
    <>
      <div className="timeline-container">
        <h2 className="timeline-title">Work Experience and Education Timeline</h2>
        <p className="timeline-subtitle">8+ Years of IT Experience - Senior DevOps and Cloud Engineer</p>
        <a href="https://linkedin.com/in/anilkumardevandla" target="_blank" rel="noopener noreferrer" className="linkedin-btn">
          <FaLinkedin style={{ marginRight: '8px', fontSize: '1.2rem' }} />
          View LinkedIn Profile
        </a>
      </div>
      <VerticalTimeline animate={true}>
        {timeLineData.map((item, index) => {
          const isWork = item.timelineType === 'Work' || item.timelineType === 'work';
          const color = isWork ? WORK_COLORS[wi++ % WORK_COLORS.length] : EDU_COLORS[ei++ % EDU_COLORS.length];
          return (
            <VerticalTimelineElement
              key={index}
              className={'vertical-timeline-element--' + (isWork ? 'work' : 'education')}
              contentStyle={{ background: '#1a1a1a', color: '#fff', border: '2px solid ' + color.bg, borderRadius: '12px' }}
              contentArrowStyle={{ borderRight: '7px solid ' + color.arrow }}
              date={item.dateRange}
              iconStyle={{ background: color.icon, color: '#fff' }}
              icon={isWork ? <WorkIcon /> : <SchoolIcon />}
            >
              <div className="timeline-card timeline-card--visible">
                <div className="timeline-card-header">
                  <h3 className="vertical-timeline-element-title">{isWork ? item.title : (item.websiteUrl ? <a href={item.websiteUrl} target="_blank" rel="noopener noreferrer" className="company-link">{item.name}</a> : item.name)}</h3>
                  <span className={'timeline-badge timeline-badge--' + (isWork ? 'work' : 'edu')}>{isWork ? 'Work' : 'Education'}</span>
                </div>
                {isWork && (
                  <h4 className="vertical-timeline-element-subtitle">
                    {item.websiteUrl ? <a href={item.websiteUrl} target="_blank" rel="noopener noreferrer" className="company-link">{item.name}</a> : item.name}
                  </h4>
                )}
                {!isWork && <h4 className="vertical-timeline-element-subtitle edu-subtitle">{item.title}</h4>}
                <div className="tech-stack-wrap">
                  {item.techStack.split(',').map((t, i) => (
                    <span key={i} className={'tech-chip' + (!isWork ? ' tech-chip--edu' : '')}>{t.trim()}</span>
                  ))}
                </div>
                <ul className="timeline-bullets">
                  {item.summaryPoints.map((pt, i) => (
                    <li key={i} className="timeline-bullet-item">
                      <span className="bullet-dot" style={{ background: color.bg }} />
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>
            </VerticalTimelineElement>
          );
        })}
        <VerticalTimelineElement iconStyle={{ background: 'rgb(16,204,82)', color: '#fff' }} icon={<StarIcon />} />
      </VerticalTimeline>
    </>
  );
};

export default WorkExperience;
