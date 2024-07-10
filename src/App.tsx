import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import Navigation from './components/Navigation';
import AICopilot from './components/intelligence/AICopilot';
import KubernetesPods from './components/kubernetes/KubernetesPods';
import KubernetesDeployments from './components/kubernetes/KubernetesDeployments';

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Government Enterprise Platform</h1>
          <Navigation />
        </header>
        <main>
          <Routes>
            <Route
              path="/"
              element={<h2>Welcome to the Government Enterprise Platform</h2>}
            />
            <Route path="/ai-copilot" element={<AICopilot />} />
            <Route path="/kubernetes-pods" element={<KubernetesPods />} />
            <Route
              path="/kubernetes-deployments"
              element={<KubernetesDeployments />}
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
