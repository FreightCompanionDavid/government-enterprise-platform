import React, { useState } from 'react';

interface HierarchyNode {
  id: string;
  name: string;
  children?: HierarchyNode[];
}

const HierarchicalStructure: React.FC = () => {
  const [hierarchy] = useState<HierarchyNode>({
    id: '1',
    name: 'Root',
    children: [
      {
        id: '2',
        name: 'Department A',
        children: [
          { id: '3', name: 'Team A1' },
          { id: '4', name: 'Team A2' },
        ],
      },
      {
        id: '5',
        name: 'Department B',
        children: [
          { id: '6', name: 'Team B1' },
          { id: '7', name: 'Team B2' },
        ],
      },
    ],
  });

  const renderHierarchy = (node: HierarchyNode): React.ReactElement => {
    return React.createElement(
      'li',
      { key: node.id },
      node.name,
      node.children &&
        node.children.length > 0 &&
        React.createElement('ul', null, node.children.map(renderHierarchy)),
    );
  };

  return React.createElement(
    'div',
    null,
    React.createElement('h2', null, 'Hierarchical Structure'),
    React.createElement('ul', null, renderHierarchy(hierarchy)),
  );
};

export default HierarchicalStructure;
