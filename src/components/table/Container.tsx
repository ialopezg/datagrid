import { Box, Paper, TableContainer } from '@mui/material';
import React, { FC, useEffect } from 'react';

import Table from './Table';
import { useDataGrid } from '../providers';
import ToolbarBottom from '../toolbar/ToolbarBottom';
import ToolbarTop from '../toolbar/ToolbarTop';

interface ContainerProps {}

export const Container: FC<ContainerProps> = () => {
  const {
    containerProps: defaultContainerProps,
    hideToolbarBottom,
    hideToolbarTop,
    table,
  } = useDataGrid();
  const fullScreen = table.state.fullScreen;

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (fullScreen) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'auto';
      }
    }
  }, [fullScreen]);

  const tableContainerProps =
    defaultContainerProps instanceof Function
      ? defaultContainerProps(table)
      : defaultContainerProps;

  return (
    <TableContainer
      component={Paper}
      {...tableContainerProps}
      sx={{
        bottom: fullScreen ? '0' : undefined,
        height: fullScreen ? '100%' : undefined,
        left: fullScreen ? '0' : undefined,
        m: fullScreen ? '0' : undefined,
        overflowY: 'hidden',
        position: fullScreen ? 'fixed' : undefined,
        right: fullScreen ? '0' : undefined,
        top: fullScreen ? '0' : undefined,
        transition: 'all 0.2s ease-in-out',
        width: fullScreen ? '100vw' : undefined,
        zIndex: fullScreen ? 1200 : 1,
        ...tableContainerProps?.sx,
      }}
    >
      {!hideToolbarTop && <ToolbarTop />}

      <Box sx={{ maxWidth: '100%', overflowX: 'auto' }}>
        <Table />
      </Box>

      {!hideToolbarBottom && <ToolbarBottom />}
    </TableContainer>
  );
};

export default Container;
