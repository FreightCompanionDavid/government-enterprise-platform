import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface CloudResource {
  id: string;
  type: string;
  name: string;
  status: string;
}

const CloudResources: React.FC = () => {
  const [resources, setResources] = useState<CloudResource[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const response = await axios.get<CloudResource[]>('/infrastructure/cloud-resources');
        setResources(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch cloud resources');
        setLoading(false);
      }
    };

    fetchResources();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Cloud Resources</h2>
      <ul>
        {resources.map((resource) => (
          <li key={resource.id}>
            {resource.name} - Type: {resource.type}, Status: {resource.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CloudResources;
