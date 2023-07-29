import MuiTable from '@mui/material/Table';
import { Paper, TableContainer } from '@mui/material';
import React, { FC } from 'react';

import Header from '../header';
import Body from '../body';
import Footer from '../footer';
import { useDataGrid } from '../providers';

interface TableProp {}

export const Table: FC<TableProp> = () => {
  const { containerProps, table, tableProps } = useDataGrid();

  return (
    <TableContainer component={Paper} {...containerProps}>
      <MuiTable stickyHeader {...table.getTableProps()} {...tableProps}>
        <Header />
        <Body />
        <Footer />
      </MuiTable>
    </TableContainer>
  );
};

export default Table;
