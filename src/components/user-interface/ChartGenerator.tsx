import React, { useState } from 'react';
import axios from 'axios';

interface Chart {
  id: string;
  type: string;
  data: Record<string, any>;
  options: Record<string, any>;
}

const ChartGenerator: React.FC = () => {
  const [chartType, setChartType] = useState('');
  const [chartData, setChartData] = useState('');
  const [chartOptions, setChartOptions] = useState('');
  const [generatedChart, setGeneratedChart] = useState<Chart | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post<Chart>('/user-interface/visualizations/charts', {
        type: chartType,
        data: JSON.parse(chartData),
        options: JSON.parse(chartOptions),
      });
      setGeneratedChart(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to generate chart');
      setGeneratedChart(null);
    }
  };

  return (
    <div>
      <h2>Chart Generator</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="chartType">Chart Type:</label>
          <input
            id="chartType"
            value={chartType}
            onChange={(e) => setChartType(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="chartData">Chart Data (JSON):</label>
          <textarea
            id="chartData"
            value={chartData}
            onChange={(e) => setChartData(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="chartOptions">Chart Options (JSON):</label>
          <textarea
            id="chartOptions"
            value={chartOptions}
            onChange={(e) => setChartOptions(e.target.value)}
            required
          />
        </div>
        <button type="submit">Generate Chart</button>
      </form>
      {error && <p>Error: {error}</p>}
      {generatedChart && (
        <div>
          <h3>Generated Chart:</h3>
          <pre>{JSON.stringify(generatedChart, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default ChartGenerator;
