import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface WhiteLabelConfig {
  logo: string;
  primaryColor: string;
  secondaryColor: string;
  companyName: string;
}

const WhiteLabel: React.FC = () => {
  const [config, setConfig] = useState<WhiteLabelConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const response = await axios.get<WhiteLabelConfig>('/governance/white-label');
        setConfig(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch white-label configuration');
        setLoading(false);
      }
    };

    fetchConfig();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!config) return;

    try {
      await axios.post('/governance/white-label', config);
      alert('White-label configuration updated successfully');
    } catch (err) {
      setError('Failed to update white-label configuration');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!config) return <div>No configuration available</div>;

  return (
    <div>
      <h2>White Label Configuration</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="logo">Logo URL:</label>
          <input
            id="logo"
            value={config.logo}
            onChange={(e) => setConfig({ ...config, logo: e.target.value })}
            required
          />
        </div>
        <div>
          <label htmlFor="primaryColor">Primary Color:</label>
          <input
            id="primaryColor"
            value={config.primaryColor}
            onChange={(e) => setConfig({ ...config, primaryColor: e.target.value })}
            required
          />
        </div>
        <div>
          <label htmlFor="secondaryColor">Secondary Color:</label>
          <input
            id="secondaryColor"
            value={config.secondaryColor}
            onChange={(e) => setConfig({ ...config, secondaryColor: e.target.value })}
            required
          />
        </div>
        <div>
          <label htmlFor="companyName">Company Name:</label>
          <input
            id="companyName"
            value={config.companyName}
            onChange={(e) => setConfig({ ...config, companyName: e.target.value })}
            required
          />
        </div>
        <button type="submit">Update Configuration</button>
      </form>
    </div>
  );
};

export default WhiteLabel;
