import { Column } from 'react-table';
import React, { FC } from 'react';

import Table from './Table';
import DataGridProvider from './providers/DataGridProvider';

export interface DataGridProps {
  columns: Column<any>[];
  data: any[];
}

export const DataGrid: FC<DataGridProps> = (props) => (
  <DataGridProvider {...props}>
    <Table />
  </DataGridProvider>
);

export default DataGrid;
