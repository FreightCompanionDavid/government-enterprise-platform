// Import required dependencies
import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import './index.css';

// Create the main App component
function App() {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [visualizationData, setVisualizationData] = useState({
    // TODO: Replace with actual data when available
    policies: [
      { id: 1, name: 'Environmental Policy', x: 0, y: 1, z: 0 },
      { id: 2, name: 'Economic Policy', x: 1, y: 0, z: 1 },
      { id: 3, name: 'Social Policy', x: -1, y: 1, z: -1 },
    ],
    dataPoints: [
      { id: 1, name: 'GDP Growth', x: 0.5, y: 0.5, z: 0.5 },
      { id: 2, name: 'Unemployment Rate', x: -0.5, y: 0.5, z: -0.5 },
      { id: 3, name: 'Carbon Emissions', x: 0, y: -1, z: 0 },
    ],
    mlModels: [
      { id: 1, name: 'Economic Forecast Model', x: 1, y: 1, z: 1 },
      { id: 2, name: 'Climate Change Model', x: -1, y: -1, z: 1 },
      { id: 3, name: 'Population Growth Model', x: 1, y: -1, z: -1 },
    ],
  });

  useEffect(() => {
    // Initialize the 3D visualization
    initVisualization(visualizationData);
  }, [visualizationData]);

  const handleMenuClick = (section) => {
    setActiveSection(section);
  };

  return (
    <div className="gep-container">
      <div className="sidebar" role="navigation" aria-label="Main Menu">
        <h2>Government Enterprise Platform</h2>
        {['dashboard', 'policies', 'data-lake', 'ml-pipeline', 'ai-copilot', 'security'].map((section) => (
          <div
            key={section}
            className="menu-item"
            onClick={() => handleMenuClick(section)}
            tabIndex={0}
            role="button"
            aria-label={section.charAt(0).toUpperCase() + section.slice(1)}
          >
            {section.charAt(0).toUpperCase() + section.slice(1)}
          </div>
        ))}
      </div>
      <div className="main-content">
        <div className="top-bar">
          <h1>Government Enterprise Platform</h1>
          <button className="gep-button" id="generateInsights" aria-label="Generate Insights">Generate Insights</button>
        </div>
        <div className="visualization-container" role="region" aria-label="Interactive 3D Visualization">
          <canvas id="visualizationCanvas" aria-label="3D visualization of government data"></canvas>
          <div id="info" aria-live="polite">GOVERNMENT ENTERPRISE PLATFORM VISUALIZATION</div>
          <div id="dataInfo" aria-live="polite">Data Info: Interact with the visualization to see details</div>
          <button id="toggleOverlay" aria-label="Open Control Panel">Open Control Panel</button>
          <div id="overlay" role="dialog" aria-labelledby="overlayTitle">
            <h2 id="overlayTitle">Control Panel</h2>
            <select id="dataType" aria-label="Select data type">
              <option value="policy">Add Policy</option>
              <option value="dataPoint">Add Data Point</option>
              <option value="mlModel">Add ML Model</option>
            </select>
            <input type="text" id="xCoord" placeholder="X Coordinate" aria-label="Enter X coordinate" />
            <input type="text" id="yCoord" placeholder="Y Coordinate" aria-label="Enter Y coordinate" />
            <input type="text" id="zCoord" placeholder="Z Coordinate" aria-label="Enter Z coordinate" />
            <input type="text" id="additionalInfo" placeholder="Additional Info" aria-label="Enter additional information" />
            <button id="addData" aria-label="Add Data">Add Data</button>
          </div>
        </div>
        <div className="active-section">
          {renderActiveSection(activeSection)}
        </div>
      </div>
    </div>
  );
}

function renderActiveSection(section) {
  const components = {
    dashboard: DashboardComponent,
    policies: PoliciesComponent,
    'data-lake': DataLakeComponent,
    'ml-pipeline': MLPipelineComponent,
    'ai-copilot': AICopilotComponent,
    security: SecurityCenterComponent,
  };
  const Component = components[section] || DashboardComponent;
  return <Component />;
}

// Placeholder components for each section
const DashboardComponent = () => <div>Dashboard Content</div>;
const PoliciesComponent = () => <div>Policies Content</div>;
const DataLakeComponent = () => <div>Data Lake Content</div>;
const MLPipelineComponent = () => <div>ML Pipeline Content</div>;
const AICopilotComponent = () => <div>AI Copilot Content</div>;
const SecurityCenterComponent = () => <div>Security Center Content</div>;

// Initialize the 3D visualization
function initVisualization(data) {
  let scene, camera, renderer, controls, particles;

  function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const canvas = document.getElementById('visualizationCanvas');
    if (!canvas) {
      console.error('Canvas element not found');
      return;
    }
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);

    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.enableZoom = true;

    // Create particle system
    const particleGeometry = new THREE.BufferGeometry();
    const particleCount = 5000;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 10;
      colors[i] = Math.random();
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.05,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      transparent: true,
    });

    particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(5, 3, 5);
    scene.add(pointLight);

    camera.position.z = 5;

    window.addEventListener('resize', onWindowResize, false);
  }

  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }

  function animate() {
    requestAnimationFrame(animate);
    controls.update();
    particles.rotation.x += 0.001;
    particles.rotation.y += 0.002;
    renderer.render(scene, camera);
  }

  function createObjects(data) {
    // Create objects based on policies, dataPoints, and mlModels
    // This is a placeholder function - implement the actual object creation here
    console.log('Creating objects with data:', data);
  }

  init();
  createObjects(data);
  animate();
}

// Render the React app
const rootElement = document.getElementById('root');
if (rootElement) {
  const root = createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  console.error('Root element not found');
}

// Call the initVisualization function after the component has mounted
document.addEventListener('DOMContentLoaded', initVisualization);
