import { styled } from '@mui/material';
import type { AppProps } from 'next/app';
import React, { useState } from 'react';

import '../styles/globals.css';

import TopBar from '../components/navigation/TopBar';
import SideBar from '../components/navigation/Siderbar';

const PageContainer = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  transition: 'all .2s',
});

function MyApp({ Component, pageProps }: AppProps) {
  const [open, setOpen] = useState(true);

  return (
    <>
      <TopBar open={open} setOpen={setOpen} />
      <SideBar open={open} />

      <PageContainer
        style={{ padding: `100px 32px 600px ${open ? '220px' : '32px'}` }}
      >
        <Component {...pageProps} />
      </PageContainer>
    </>
  );
}

export default MyApp;
