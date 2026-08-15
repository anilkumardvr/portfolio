import React, { useEffect, useState } from 'react';
import './VisitorCounter.css';

const NAMESPACE = 'anilkumardvr-netflix-portfolio';
const KEY = 'profile-views';
const HIDE_DELAY_MS = 4000;

const VisitorCounter: React.FC = () => {
    const [count, setCount] = useState<number | null>(null);
    const [visible, setVisible] = useState(true);

    useEffect(() => {
          const alreadyCounted = sessionStorage.getItem('portfolio-visit-counted');
          const endpoint = alreadyCounted
            ? `https://abacus.jasoncameron.dev/get/${NAMESPACE}/${KEY}`
                  : `https://abacus.jasoncameron.dev/hit/${NAMESPACE}/${KEY}`;

                  fetch(endpoint)
            .then((res) => res.json())
            .then((data) => {
                      if (typeof data.value === 'number') {
                                  setCount(data.value);
                      }
                      sessionStorage.setItem('portfolio-visit-counted', 'true');
            })
            .catch(() => setCount(null));
    }, []);

    useEffect(() => {
          if (count === null) {
                  return;
          }
          const timer = setTimeout(() => setVisible(false), HIDE_DELAY_MS);
          return () => clearTimeout(timer);
    }, [count]);

    if (count === null) {
          return null;
    }

    return (
          <div className={`visitor-counter ${visible ? '' : 'visitor-counter--hidden'}`} title="Total portfolio views">
      <span className="visitor-counter__text">
        {count.toLocaleString()} {count === 1 ? 'viewer has' : 'viewers have'} watched this profile
      </span>
          </div>
        );
};

export default VisitorCounter;
