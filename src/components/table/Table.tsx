import MuiTable from '@mui/material/Table';
import React, { FC } from 'react';

import Body from '../body';
import Footer from '../footer';
import Header from '../header';
import { useDataGrid } from '../providers';

interface TableProp {}

export const Table: FC<TableProp> = () => {
  const { hideFooter, hideHeader, table, tableProps } = useDataGrid();

  return (
    <MuiTable {...tableProps} {...table.getTableProps()}>
      {!hideHeader && <Header />}
      <Body />
      {!hideFooter && <Footer />}
    </MuiTable>
  );
};

export default Table;
