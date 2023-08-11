import { createTheme, styled, ThemeProvider } from '@mui/material';
import React, { FC, useState } from 'react';

import TopBar from './navigation/TopBar';
import SideBar from './navigation/SiderBar';

const PageContainer = styled('div')({
  transition: 'all 0.3s ease',
});

export const Layout: FC = ({ children }) => {
  const [open, setOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <ThemeProvider
      theme={createTheme({ palette: { mode: darkMode ? 'dark' : 'light' } })}
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
        {children}
      </PageContainer>
    </ThemeProvider>
  );
};

export default Layout;
