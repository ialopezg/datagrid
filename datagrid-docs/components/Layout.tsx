import { styled } from '@mui/material';
import React, { FC, useState } from 'react';

import TopBar from './navigation/TopBar';
import SideBar from './navigation/SiderBar';

const PageContainer = styled('div')({
  transition: 'all 0.3s ease',
});

export const Layout: FC = ({ children }) => {
  const [open, setOpen] = useState(true);

  return (
    <>
      <TopBar open={open} setOpen={setOpen} />
      <SideBar open={open} />

      <PageContainer
        style={{ padding: `80px 32px 800px ${open ? '260px' : '32px'}` }}
      >
        {children}
      </PageContainer>
    </>
  );
};

export default Layout;
