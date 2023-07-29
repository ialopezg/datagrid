import MuiTable from '@mui/material/Table';
import { Paper, TableContainer } from '@mui/material';
import { TableInstance } from 'react-table';
import React, { FC } from 'react';

import Header from './header';
import Body from './body';
import Footer from './footer';

interface TableProp {
  table: TableInstance<object>;
}

export const Table: FC<TableProp> = ({ table }) => {
  return (
    <TableContainer component={Paper}>
      <MuiTable {...table.getTableProps()}>
        <Header table={table} />
        <Body table={table} />
        <Footer />
      </MuiTable>
    </TableContainer>
  );
};

export default Table;
