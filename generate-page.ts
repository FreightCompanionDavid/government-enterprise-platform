import fs from 'fs';
import path from 'path';

const pageName = process.argv[2];
const pageCategory = process.argv[3] || 'pages';

if (!pageName) {
  console.error('Please provide a page name');
  process.exit(1);
}

const pageDir = path.join(__dirname, 'src', pageCategory);
const pageFile = path.join(pageDir, );

const pageTemplate = `
import React from 'react';
import { NextPage } from 'next';
import Head from 'next/head';

interface Props {
  // Define props here
}

const : NextPage<Props> = () => {
  return (
    <div>
      <Head>
        <title></title>
        <meta name="description" content=" page" />
      </Head>

      <main>
        <h1></h1>
        {/* Add your page content here */}
      </main>
    </div>
  );
};

export default ;

// Uncomment and modify if you need getServerSideProps or getStaticProps
/*
export const getServerSideProps: GetServerSideProps = async (context) => {
  // Fetch data here
  return { props: {} };
};
*/
`;

fs.mkdirSync(pageDir, { recursive: true });
fs.writeFileSync(pageFile, pageTemplate.trim());

console.log(`Page  created in `);
