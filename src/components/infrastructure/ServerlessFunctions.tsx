import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface ServerlessFunction {
  id: string;
  name: string;
  runtime: string;
  status: string;
}

const ServerlessFunctions: React.FC = () => {
  const [functions, setFunctions] = useState<ServerlessFunction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFunctions = async () => {
      try {
        const response = await axios.get<ServerlessFunction[]>('/infrastructure/serverless/functions');
        setFunctions(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch serverless functions');
        setLoading(false);
      }
    };

    fetchFunctions();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Serverless Functions</h2>
      <ul>
        {functions.map((func) => (
          <li key={func.id}>
            {func.name} - Runtime: {func.runtime}, Status: {func.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ServerlessFunctions;
