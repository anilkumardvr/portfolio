import React from 'react';
import './Recommendations.css';

const Recommendations: React.FC = () => {
  return (
    <div className="recommendations-container">
      <h1>Recommendations</h1>
      <div className="recommendation-card">
        <p>✨ Anil is a senior DevOps and platform engineer with strong hands-on experience in Kubernetes, AKS, Terraform, CI/CD, GitOps, observability, and cloud infrastructure.</p>
        <p>💼 His work focuses on building reliable developer platforms, reusable deployment patterns, infrastructure automation, and operational best practices that reduce manual toil.</p>
        <p>🌟 He brings practical experience across enterprise middleware modernization, Azure infrastructure, platform reliability, incident response, and automation-first delivery.</p>
      </div>
    </div>
  );
};

export default Recommendations;
