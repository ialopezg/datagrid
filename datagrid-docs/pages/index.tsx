import Head from 'next/head';
import type { NextPage } from 'next';
import React from 'react';

export const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>DataGrid</title>
        <meta name="description" content="Material React Table Docs" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </div>
  )
};

export default Home;
