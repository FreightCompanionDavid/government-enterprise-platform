import React, { useState } from 'react';
import axios from 'axios';

interface QueryResult {
  results: any[];
}

const DataQuery: React.FC = () => {
  const [query, setQuery] = useState('');
  const [parameters, setParameters] = useState('');
  const [results, setResults] = useState<QueryResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post<QueryResult>('/data-management/query', {
        query,
        parameters: JSON.parse(parameters),
      });
      setResults(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to execute query');
      setResults(null);
    }
  };

  return (
    <div>
      <h2>Data Query</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="query">Query:</label>
          <input
            id="query"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="parameters">Parameters (JSON):</label>
          <textarea
            id="parameters"
            value={parameters}
            onChange={(e) => setParameters(e.target.value)}
          />
        </div>
        <button type="submit">Execute Query</button>
      </form>
      {error && <p>Error: {error}</p>}
      {results && (
        <div>
          <h3>Results:</h3>
          <pre>{JSON.stringify(results, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default DataQuery;
