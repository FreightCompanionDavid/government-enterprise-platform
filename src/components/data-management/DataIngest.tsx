import React, { useState } from 'react';
import axios from 'axios';

const DataIngest: React.FC = () => {
  const [dataSource, setDataSource] = useState('');
  const [dataType, setDataType] = useState('');
  const [data, setData] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('/data-management/data-lake/ingest', {
        dataSource,
        dataType,
        data: JSON.parse(data),
      });
      setMessage('Data ingested successfully');
      setError(null);
    } catch (err) {
      setError('Failed to ingest data');
      setMessage(null);
    }
  };

  return (
    <div>
      <h2>Data Ingest</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="dataSource">Data Source:</label>
          <input
            id="dataSource"
            value={dataSource}
            onChange={(e) => setDataSource(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="dataType">Data Type:</label>
          <input
            id="dataType"
            value={dataType}
            onChange={(e) => setDataType(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="data">Data (JSON):</label>
          <textarea
            id="data"
            value={data}
            onChange={(e) => setData(e.target.value)}
            required
          />
        </div>
        <button type="submit">Ingest Data</button>
      </form>
      {error && <p>Error: {error}</p>}
      {message && <p>{message}</p>}
    </div>
  );
};

export default DataIngest;
