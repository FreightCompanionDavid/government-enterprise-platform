"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var path_1 = require("path");
var componentName = process.argv[2];
var componentCategory = process.argv[3] || 'components';
if (!componentName) {
    console.error('Please provide a component name');
    process.exit(1);
}
var componentDir = path_1.default.join(__dirname, 'src', componentCategory);
var componentFile = path_1.default.join(componentDir, ".tsx");
var componentTemplate = "\nimport React from 'react';\nimport styles from './.module.css';\n\ninterface Props {\n  // Define props here\n}\n\nconst : React.FC<Props> = (props) => {\n  return (\n    <div className={styles.container}>\n      <h2></h2>\n      {/* Add your component logic here */}\n    </div>\n  );\n};\n\nexport default ;\n";
var styleTemplate = "\n.container {\n  /* Add your styles here */\n}\n";
var styleFile = path_1.default.join(componentDir, ".module.css");
fs_1.default.mkdirSync(componentDir, { recursive: true });
fs_1.default.writeFileSync(componentFile, componentTemplate.trim());
fs_1.default.writeFileSync(styleFile, styleTemplate.trim());
console.log("Component  created in ");
