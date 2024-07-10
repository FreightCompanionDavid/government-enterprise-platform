import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface MLModel {
  id: string;
  name: string;
  type: string;
  status: string;
}

const MLModels: React.FC = () => {
  const [models, setModels] = useState<MLModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchModels = async () => {
      try {
        const response = await axios.get<MLModel[]>('/intelligence/ml/models');
        setModels(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch ML models');
        setLoading(false);
      }
    };

    fetchModels();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>ML Models</h2>
      <ul>
        {models.map((model) => (
          <li key={model.id}>
            {model.name} - Type: {model.type}, Status: {model.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MLModels;
