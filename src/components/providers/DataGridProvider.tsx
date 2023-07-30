import React, { FC, ReactNode } from 'react';
import {
  useExpanded, useFilters, useGlobalFilter,
  usePagination,
  useRowSelect,
  useSortBy,
  useTable,
} from 'react-table';

import { DataGridProps } from '../DataGrid';
import DataGridContext from './DataGridContext';

interface DataGridProviderProps extends DataGridProps {
  children: ReactNode;
}

export const DataGridProvider: FC<DataGridProviderProps> = ({
  columns,
  children,
  data,
  ...rest
}) => {
  const table = useTable(
    { columns, data },
    useFilters,
    useGlobalFilter,
    useSortBy,
    useExpanded,
    usePagination,
    useRowSelect
  );

  return (
    <DataGridContext.Provider
      value={{ columns, data, table, ...rest }}
    >
      {children}
    </DataGridContext.Provider>
  );
};

export default DataGridProvider;
