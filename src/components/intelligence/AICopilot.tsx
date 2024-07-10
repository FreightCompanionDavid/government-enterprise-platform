import React, { useState } from 'react';
import axios from 'axios';

interface ContextAnalysisResult {
  recommendations: string[];
  relevantData: Record<string, any>;
  componentSuggestions: string[];
}

const AICopilot: React.FC = () => {
  const [userId, setUserId] = useState('');
  const [currentTask, setCurrentTask] = useState('');
  const [environmentData, setEnvironmentData] = useState('');
  const [result, setResult] = useState<ContextAnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const getComponentSuggestions = (
    currentTask: string,
    environmentData: any,
  ) => {
    // This is a simplified version. In a real implementation, you'd use more sophisticated AI techniques.
    if (
      currentTask.toLowerCase().includes('customer') &&
      environmentData.page === 'database'
    ) {
      return [
        'Customer Data Grid',
        'Customer Segmentation Chart',
        'Data Import/Export Tools',
        'Search and Filter Components',
      ];
    } else if (
      currentTask.toLowerCase().includes('shipment') &&
      environmentData.page === 'tms'
    ) {
      return [
        'Shipment History Table',
        'Route Visualization Map',
        'Shipment Status Tracker',
        'Delivery Estimation Component',
      ];
    }
    return [];
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post<ContextAnalysisResult>(
        '/intelligence/ai-copilot/analyze-context',
        {
          userId,
          currentTask,
          environmentData: JSON.parse(environmentData),
        },
      );
      const componentSuggestions = getComponentSuggestions(
        currentTask,
        JSON.parse(environmentData),
      );
      setResult({
        ...response.data,
        componentSuggestions,
      });
      setError(null);
    } catch (err) {
      setError('Failed to analyze context');
      setResult(null);
    }
  };

  return (
    <div>
      <h2>AI Copilot</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="userId">User ID:</label>
          <input
            id="userId"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="currentTask">Current Task:</label>
          <input
            id="currentTask"
            value={currentTask}
            onChange={(e) => setCurrentTask(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="environmentData">Environment Data (JSON):</label>
          <textarea
            id="environmentData"
            value={environmentData}
            onChange={(e) => setEnvironmentData(e.target.value)}
            required
          />
        </div>
        <button type="submit">Analyze Context</button>
      </form>
      {error && <p>Error: {error}</p>}
      {result && (
        <div>
          <h3>Recommendations:</h3>
          <ul>
            {result.recommendations.map((rec, index) => (
              <li key={index}>{rec}</li>
            ))}
          </ul>
          <h3>Suggested Components:</h3>
          <ul>
            {result.componentSuggestions.map((component, index) => (
              <li key={index}>{component}</li>
            ))}
          </ul>
          <h3>Relevant Data:</h3>
          <pre>{JSON.stringify(result.relevantData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default AICopilot;
