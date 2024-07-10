import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Theme {
  id: string;
  name: string;
  primaryColor: string;
  secondaryColor: string;
}

const ThemeManager: React.FC = () => {
  const [themes, setThemes] = useState<Theme[]>([]);
  const [selectedTheme, setSelectedTheme] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchThemes = async () => {
      try {
        const response = await axios.get<Theme[]>('/user-interface/themes');
        setThemes(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch themes');
        setLoading(false);
      }
    };

    fetchThemes();
  }, []);

  const applyTheme = async () => {
    try {
      await axios.post('/user-interface/themes', { themeId: selectedTheme });
      alert('Theme applied successfully');
    } catch (err) {
      setError('Failed to apply theme');
    }
  };

  if (loading) return React.createElement('div', null, 'Loading...');
  if (error) return React.createElement('div', null, `Error: ${error}`);

  return React.createElement(
    'div',
    null,
    React.createElement('h2', null, 'Theme Manager'),
    React.createElement(
      'select',
      {
        'aria-label': 'Select a theme',
        value: selectedTheme,
        onChange: (e: React.ChangeEvent<HTMLSelectElement>) =>
          setSelectedTheme(e.target.value),
      },
      React.createElement('option', { value: '' }, 'Select a theme'),
      themes.map((theme) =>
        React.createElement(
          'option',
          { key: theme.id, value: theme.id },
          theme.name,
        ),
      ),
    ),
    React.createElement(
      'button',
      { onClick: applyTheme, disabled: !selectedTheme },
      'Apply Theme',
    ),
  );
};

export default ThemeManager;
