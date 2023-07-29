import { TableContainerProps, TableProps } from '@mui/material';
import { Column } from 'react-table';
import React, { FC } from 'react';

import Table from './table';
import DataGridProvider from './providers/DataGridProvider';

export interface DataGridOptions {
  containerProps?: TableContainerProps;
  tableProps?: TableProps;
}

export interface DataGridProps extends DataGridOptions {
  columns: Column<any>[];
  data: any[];
}

export const DataGrid: FC<DataGridProps> = (props) => (
  <DataGridProvider {...props}>
    <Table />
  </DataGridProvider>
);

export default DataGrid;
