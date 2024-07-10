import React from 'react';
import { Link } from 'react-router-dom';

const Navigation: React.FC = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/ai-copilot">AI Copilot</Link>
        </li>
        <li>
          <Link to="/kubernetes-pods">Kubernetes Pods</Link>
        </li>
        <li>
          <Link to="/kubernetes-deployments">Kubernetes Deployments</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
