import React from 'react';
import { Link } from 'react-router-dom';

const KubernetesDeployments: React.FC = () => {
  return (
    <div>
      <h2>Kubernetes Deployments</h2>
      <ul>
        <li>
          <Link to="/kubernetes-deployments/nginx">Nginx Deployment</Link>
        </li>
        <li>
          <Link to="/kubernetes-deployments/mysql">MySQL Deployment</Link>
        </li>
        <li>
          <Link to="/kubernetes-deployments/redis">Redis Deployment</Link>
        </li>
      </ul>
    </div>
  );
};

export default KubernetesDeployments;
