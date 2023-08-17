import MuiTable from '@mui/material/Table';
import React, { FC } from 'react';

import Body from '../body';
import Footer from '../footer';
import Header from '../header';
import { useDataGrid } from '../providers';

interface TableProp {}

export const Table: FC<TableProp> = () => {
  const {
    hideFooter,
    hideHeader,
    table,
    tableProps: defaultTableProps,
  } = useDataGrid();

  const tableProps = {
    ...defaultTableProps,
    ...table.getTableProps(),
    style: {
      ...table.getTableProps().style,
      ...(defaultTableProps?.style),
    },
  };

  return (
    <MuiTable {...tableProps}>
      {!hideHeader && <Header />}
      <Body />
      {!hideFooter && <Footer />}
    </MuiTable>
  );
};

export default Table;
