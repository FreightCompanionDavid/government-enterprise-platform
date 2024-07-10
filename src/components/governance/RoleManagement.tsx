import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Role {
  id: string;
  name: string;
  permissions: string[];
}

const RoleManagement: React.FC = () => {
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await axios.get<Role[]>('/governance/rbac/roles');
        setRoles(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch roles');
        setLoading(false);
      }
    };

    fetchRoles();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Role Management</h2>
      <ul>
        {roles.map((role) => (
          <li key={role.id}>
            {role.name}
            <ul>
              {role.permissions.map((permission, index) => (
                <li key={index}>{permission}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RoleManagement;
