import React, { useEffect, useState } from 'react';
import './VisitorCounter.css';

const NAMESPACE = 'anilkumardvr-netflix-portfolio';
const KEY = 'profile-views';

const VisitorCounter: React.FC = () => {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    const alreadyCounted = sessionStorage.getItem('portfolio-visit-counted');
    const endpoint = alreadyCounted
    ? `https://api.countapi.xyz/get/${NAMESPACE}/${KEY}`
      : `https://api.countapi.xyz/hit/${NAMESPACE}/${KEY}`;

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

  if (count === null) {
    return null;
  }

  return (
    <div className="visitor-counter" title="Total portfolio views">
    <span className="visitor-counter__icon" aria-hidden="true">🎬</span>
    <span className="visitor-counter__text">
      {count.toLocaleString()} viewers have watched this profile
    </span>
    </div>
    );
};

export default VisitorCounter;
