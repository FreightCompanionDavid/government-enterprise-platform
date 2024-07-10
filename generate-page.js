"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var path_1 = require("path");
var pageName = process.argv[2];
var pageCategory = process.argv[3] || 'pages';
if (!pageName) {
    console.error('Please provide a page name');
    process.exit(1);
}
var pageDir = path_1.default.join(__dirname, 'src', pageCategory);
var pageFile = path_1.default.join(pageDir);
var pageTemplate = "\nimport React from 'react';\nimport { NextPage } from 'next';\nimport Head from 'next/head';\n\ninterface Props {\n  // Define props here\n}\n\nconst : NextPage<Props> = () => {\n  return (\n    <div>\n      <Head>\n        <title></title>\n        <meta name=\"description\" content=\" page\" />\n      </Head>\n\n      <main>\n        <h1></h1>\n        {/* Add your page content here */}\n      </main>\n    </div>\n  );\n};\n\nexport default ;\n\n// Uncomment and modify if you need getServerSideProps or getStaticProps\n/*\nexport const getServerSideProps: GetServerSideProps = async (context) => {\n  // Fetch data here\n  return { props: {} };\n};\n*/\n";
fs_1.default.mkdirSync(pageDir, { recursive: true });
fs_1.default.writeFileSync(pageFile, pageTemplate.trim());
console.log("Page  created in ");
