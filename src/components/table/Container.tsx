import { Paper, TableContainer } from '@mui/material';
import React, { FC } from 'react';

import { useDataGrid } from '../providers';
import Table from './Table';
import Toolbar from '../toolbar';

interface ContainerProps {}

export const Container: FC<ContainerProps> = () => {
  const { containerProps, showToolbar } = useDataGrid();

  return (
    <TableContainer component={Paper} {...containerProps}>
      {showToolbar && <Toolbar />}
      <Table />
    </TableContainer>
  );
};

export default Container;
