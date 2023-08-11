import { createTheme, styled, ThemeProvider } from '@mui/material';
import type { AppProps } from 'next/app';
import React, { useState } from 'react';

import '../styles/globals.css';

import TopBar from '../components/navigation/TopBar';
import SideBar from '../components/navigation/SiderBar';
import { mdxComponents } from '../components/mdx/mdxComponents';

const PageContainer = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  transition: 'all .2s',
});

export const App = ({ Component, pageProps }: AppProps) => {
  const [open, setOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <ThemeProvider
      theme={createTheme({
        palette: { mode: darkMode ? 'dark' : 'light' },
        typography: {
          h1: {
            fontSize: '2rem',
            lineHeight: '3rem',
            paddingLeft: '1.5rem',
          },
          h2: {
            fontSize: '2.5rem',
            lineHeight: '5rem',
          },
          h3: {
            fontSize: '2rem',
            lineHeight: '4rem',
          },
          h4: {
            fontSize: '1.75rem',
            lineHeight: '3rem',
          },
          h5: {
            fontSize: '1.5rem',
            lineHeight: '3rem',
          },
          h6: {
            fontSize: '1.25rem',
            lineHeight: '3rem',
          },
          body1: {
            fontSize: '1rem',
            lineHeight: '2rem',
            marginBottom: '0.5rem',
          },
        },
      })}
    >
      <TopBar
        darkMode={darkMode}
        open={open}
        setDarkMode={setDarkMode}
        setOpen={setOpen}
      />
      <SideBar open={open} />
      <PageContainer
        style={{ padding: `80px 32px 800px ${open ? '260px' : '32px'}` }}
      >
        <Component components={mdxComponents} {...pageProps} />
      </PageContainer>
    </ThemeProvider>
  );
};

export default App;
