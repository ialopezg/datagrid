import { Paper, TableContainer } from '@mui/material';
import React, { FC } from 'react';

import { useDataGrid } from '../providers';
import Table from './Table';

interface ContainerProps {}

export const Container: FC<ContainerProps> = () => {
  const { containerProps } = useDataGrid();

  return (
    <TableContainer component={Paper} {...containerProps}>
      <Table />
    </TableContainer>
  );
};

export default Container;
