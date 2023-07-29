import MuiTable from '@mui/material/Table';
import React, { FC } from 'react';

import Header from '../header';
import Body from '../body';
import Footer from '../footer';
import { useDataGrid } from '../providers';

interface TableProp {}

export const Table: FC<TableProp> = () => {
  const { table, tableProps } = useDataGrid();

  return (
    <MuiTable stickyHeader {...table.getTableProps()} {...tableProps}>
      <Header />
      <Body />
      <Footer />
    </MuiTable>
  );
};

export default Table;
