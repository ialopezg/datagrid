import React, { ReactNode } from 'react';
import {
  useExpanded,
  useFilters,
  useGlobalFilter,
  usePagination,
  useRowSelect,
  useSortBy,
  useTable,
} from 'react-table';

import { DataGridProps } from '../DataGrid';
import DataGridContext from './DataGridContext';

interface DataGridProviderProps<D extends {}> extends DataGridProps<D> {
  children: ReactNode;
}

export const DataGridProvider = <D extends {}>({
  columns,
  children,
  data,
  ...rest
}: DataGridProviderProps<D>) => {
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
    // @ts-ignore
    <DataGridContext.Provider value={{ columns, data, table, ...rest }}>
      {children}
    </DataGridContext.Provider>
  );
};

export default DataGridProvider;
