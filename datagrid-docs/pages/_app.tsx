import { styled } from '@mui/material';
import type { AppProps } from 'next/app';
import React, { useState } from 'react';

import '../styles/globals.css';

import TopBar from '../components/navigation/TopBar';
import SideBar from '../components/navigation/SiderBar';
import Layout from '../components/Layout';

const PageContainer = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  transition: 'all .2s',
});

export const App = ({ Component, pageProps }: AppProps) => {
  const [open, setOpen] = useState(true);

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default App;
