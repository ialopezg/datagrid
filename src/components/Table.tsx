import MuiTable from '@mui/material/Table';
import { Paper, TableContainer } from '@mui/material';
import React, { FC } from 'react';

import Header from './header';
import Body from './body';
import Footer from './footer';
import { useDataGrid } from './providers';

interface TableProp {}

export const Table: FC<TableProp> = () => {
  const { table } = useDataGrid();

  return (
    <TableContainer component={Paper}>
      <MuiTable {...table.getTableProps()}>
        <Header />
        <Body />
        <Footer />
      </MuiTable>
    </TableContainer>
  );
};

export default Table;
