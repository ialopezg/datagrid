import { LinearProgress, Paper, TableContainer } from '@mui/material';
import React, { FC } from 'react';

import Table from './Table';
import { useDataGrid } from '../providers';
import ToolbarBottom from '../toolbar/ToolbarBottom';
import ToolbarTop from '../toolbar/ToolbarTop';

interface ContainerProps {}

export const Container: FC<ContainerProps> = () => {
  const { containerProps, hideToolbarBottom, hideToolbarTop, isFetching } =
    useDataGrid();

  return (
    <TableContainer component={Paper} {...containerProps}>
      {!hideToolbarTop && <ToolbarTop />}
      {isFetching && <LinearProgress />}
      <Table />
      {!hideToolbarBottom && <ToolbarBottom />}
    </TableContainer>
  );
};

export default Container;
