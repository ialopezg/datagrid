import { useTable } from 'react-table';
import React, { FC } from 'react';

import Table from './Table';

export interface DataGridProps {
  columns: any[];
  data: any[];
}

export const DataGrid: FC<DataGridProps> = ({ columns, data }) => {
  const table = useTable({ columns, data });

  return <Table table={table} />;
};

export default DataGrid;
