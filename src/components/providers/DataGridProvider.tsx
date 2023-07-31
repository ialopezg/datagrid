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
import { showOverrideWarnings } from '../helpers/overrideWarnings';

interface DataGridProviderProps<D extends {}> extends DataGridProps<D> {
  children: ReactNode;
}

export const DataGridProvider = <D extends {}>({
  columns,
  children,
  data,
  suppressOverrideWarning,
  ...rest
}: DataGridProviderProps<D>) => {
  const table = useTable(
    { columns, data },
    useFilters,
    useGlobalFilter,
    useSortBy,
    useExpanded,
    usePagination,
    useRowSelect,
  );

  if (process.env.NODE_ENV !== 'production' && !suppressOverrideWarning) {
    showOverrideWarnings(rest);
  }

  return (
    // @ts-ignore
    <DataGridContext.Provider value={{ columns, data, table, ...rest }}>
      {children}
    </DataGridContext.Provider>
  );
};

export default DataGridProvider;
