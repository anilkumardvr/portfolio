import React, { useEffect, useRef, useState } from 'react';
import './Blogs.css';
import { FaFeatherAlt } from 'react-icons/fa';

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

const Blogs: React.FC = () => {
  const { ref: headerRef, visible: headerVisible } = useInView(0.15);
  const { ref: panelRef, visible: panelVisible } = useInView(0.15);

  return (
    <div className="blogs-container">
      <div ref={headerRef} className={`blogs-page-header ${headerVisible ? 'blogs-reveal--visible' : ''}`}>
        <div className="blogs-page-bar" />
        <h2 className="blogs-page-title">Stories &amp; Writing</h2>
        <p className="blogs-page-sub">Thoughts, tutorials, and lessons from building infrastructure &amp; platforms</p>
      </div>

      <div ref={panelRef} className={`blogs-empty-card ${panelVisible ? 'blogs-empty-card--visible' : ''}`}>
        <div className="blogs-letterbox blogs-letterbox--top" />
        <div className="blogs-letterbox blogs-letterbox--bot" />
        <div className="blogs-empty-glow" />
        <div className="blogs-empty-inner">
          <div className="blogs-empty-icon">
            <FaFeatherAlt />
          </div>
          <span className="blogs-empty-badge">
            <span className="blogs-empty-dot" />
            Coming Soon
          </span>
          <h3 className="blogs-empty-title">No Stories Published Yet</h3>
          <p className="blogs-empty-text">
            I&apos;m working on writing about the infrastructure, automation, and platform
            engineering problems I solve day to day. New posts will land here soon.
          </p>
          <div className="blogs-cursor-line">
            <span className="blogs-typing-text">Writing next post</span>
            <span className="blogs-cursor" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blogs;
