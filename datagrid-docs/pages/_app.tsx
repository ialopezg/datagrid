import { createTheme, styled, ThemeProvider } from '@mui/material';
import type { AppProps } from 'next/app';
import React, { useEffect, useState } from 'react';

import '../styles/globals.css';

import TopBar from '../components/navigation/TopBar';
import SideBar from '../components/navigation/SiderBar';
import { mdxComponents } from '../components/mdx/mdxComponents';
import Head from 'next/head';
import { theme } from '../styles/Theme';

const PageContainer = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  minHeight: '100vh',
  transition: 'all 200ms ease-in-out',
});

const PageContent = styled('div')({
  maxWidth: '1200px',
  margin: 'auto',
  transition: 'all 200ms ease-in-out',
});

export const App = ({ Component, pageProps }: AppProps) => {
  const [open, setOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => setDarkMode(localStorage.getItem('darkMode') === 'true'), []);

  useEffect(() => {
    document.body.style.backgroundColor = darkMode ? '#111' : '#fff';
    localStorage.setItem('darkTheme', darkMode.toString());
  }, [darkMode]);

  return (
    <>
      <Head>
        <title>DataGrid</title>
        <meta
          name="description"
          content="DataGrid Docs. A fully featured Material-UI implementation of react-table, inspired by material-table and the mui DataGrid, written from the ground up in TypeScript."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ThemeProvider theme={createTheme(theme(darkMode))}>
        <TopBar
          darkMode={darkMode}
          open={open}
          setDarkMode={setDarkMode}
          setOpen={setOpen}
        />
        <SideBar navOpen={open} />
        <PageContainer
          style={{ padding: `80px 32px 800px ${open ? '260px' : '32px'}` }}
        >
          <PageContent>
            <Component components={mdxComponents} {...pageProps} />
          </PageContent>
        </PageContainer>
      </ThemeProvider>
    </>
  );
};

export default App;
