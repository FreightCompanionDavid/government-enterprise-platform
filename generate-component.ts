import fs from 'fs';
import path from 'path';

const componentName = process.argv[2];
const componentCategory = process.argv[3] || 'components';

if (!componentName) {
  console.error('Please provide a component name');
  process.exit(1);
}

const componentDir = path.join(__dirname, 'src', componentCategory);
const componentFile = path.join(componentDir, `.tsx`);

const componentTemplate = `
import React from 'react';
import styles from './.module.css';

interface Props {
  // Define props here
}

const : React.FC<Props> = (props) => {
  return (
    <div className={styles.container}>
      <h2></h2>
      {/* Add your component logic here */}
    </div>
  );
};

export default ;
`;

const styleTemplate = `
.container {
  /* Add your styles here */
}
`;

const styleFile = path.join(componentDir, `.module.css`);

fs.mkdirSync(componentDir, { recursive: true });
fs.writeFileSync(componentFile, componentTemplate.trim());
fs.writeFileSync(styleFile, styleTemplate.trim());

console.log(`Component  created in `);
