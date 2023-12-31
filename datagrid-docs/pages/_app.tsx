import { MDXProvider } from '@mdx-js/react';
import {
  createTheme,
  styled,
  ThemeProvider,
  useMediaQuery,
} from '@mui/material';
import Head from 'next/head';
import type { AppProps } from 'next/app';
import React, { useEffect, useState } from 'react';

import TopBar from '../components/navigation/TopBar';
import SideBar from '../components/navigation/SiderBar';
import { mdxComponents } from '../components/mdx/mdxComponents';

import { theme } from '../styles/Theme';
import '../styles/globals.css';

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
  const isDesktop = useMediaQuery('(min-width: 1600px)');
  const isTablet = useMediaQuery('(max-width: 900px)');

  const [open, setOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(true);

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
          content="DataGrid Docs. A fully featured Material-UI implementation of react-table, inspired by material-table and the MUI DataGrid, written from the ground up in TypeScript."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ThemeProvider theme={createTheme(theme(darkMode))}>
        <MDXProvider components={mdxComponents}>
          <TopBar
            darkMode={darkMode}
            open={open || isDesktop}
            setDarkMode={setDarkMode}
            setOpen={setOpen}
          />
          <SideBar navOpen={open || isDesktop} setNavOpen={setOpen} />
          <PageContainer
            sx={{
              p: `64px 32px 800px ${
                (open || isDesktop) && !isTablet ? '280px' : '32px'
              }`,
            }}
          >
            <PageContent>
              <Component {...pageProps} />
            </PageContent>
          </PageContainer>
        </MDXProvider>
      </ThemeProvider>
    </>
  );
};

export default App;
