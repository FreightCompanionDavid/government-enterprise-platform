import React from 'react';
import { Link } from 'react-router-dom';

const KubernetesPods: React.FC = () => {
  return (
    <div>
      <h2>Kubernetes Pods</h2>
      <ul>
        <li>
          <Link to="/kubernetes-pods/pod-1">Pod 1</Link>
        </li>
        <li>
          <Link to="/kubernetes-pods/pod-2">Pod 2</Link>
        </li>
        <li>
          <Link to="/kubernetes-pods/pod-3">Pod 3</Link>
        </li>
      </ul>
    </div>
  );
};

export default KubernetesPods;
