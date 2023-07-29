import { Column, useTable } from "react-table";
import React, { FC } from 'react';

import Table from './Table';

export interface DataGridProps {
  columns: Column<object>[];
  data: any[];
}

export const DataGrid: FC<DataGridProps> = ({ columns, data }) => {
  // @ts-ignore
  const table = useTable({ columns, data });

  return <Table table={table} />;
};

export default DataGrid;
