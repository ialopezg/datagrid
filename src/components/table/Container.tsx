import { Paper, TableContainer } from '@mui/material';
import React, { FC } from 'react';

import { useDataGrid } from '../providers';
import Table from './Table';
import Toolbar from '../toolbar';

interface ContainerProps {}

export const Container: FC<ContainerProps> = () => {
  const { containerProps: defaultContainerProps, hideToolbar } = useDataGrid();

  const containerProps = {
    component: Paper,
    ...defaultContainerProps,
  };

  return (
    <TableContainer {...containerProps}>
      {!hideToolbar && <Toolbar />}
      <Table />
    </TableContainer>
  );
};

export default Container;
