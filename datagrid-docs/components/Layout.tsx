import { styled } from '@mui/material';
import React, { FC, useState } from 'react';

import TopBar from './navigation/TopBar';
import SideBar from './navigation/Siderbar';

const PageContainer = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  transition: 'all .2s',
});

export const Layout: FC = ({ children }) => {
  const [open, setOpen] = useState(true);

  return (
    <>
      <TopBar open={open} setOpen={setOpen} />
      <SideBar open={open} />

      <PageContainer
        style={{ padding: `100px 32px 600px ${open ? '220px' : '32px'}` }}
      >
        {children}
      </PageContainer>
    </>
  );
};

export default Layout;
