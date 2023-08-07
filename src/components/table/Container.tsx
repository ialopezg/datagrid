import { Paper, TableContainer } from '@mui/material';
import React, { FC } from 'react';

import { useDataGrid } from '../providers';
import Table from './Table';
import Toolbar from '../toolbar';

interface ContainerProps {}

export const Container: FC<ContainerProps> = () => {
  const { containerProps, hideToolbar } = useDataGrid();

  return (
    <TableContainer component={Paper} {...containerProps}>
      {!hideToolbar && <Toolbar />}
      <Table />
    </TableContainer>
  );
};

export default Container;
