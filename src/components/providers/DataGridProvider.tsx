import React, { ReactNode } from 'react';
import {
  useExpanded,
  useFilters,
  useFlexLayout,
  useGlobalFilter,
  useGroupBy,
  usePagination,
  useResizeColumns,
  useRowSelect,
  useSortBy,
  useTable,
} from 'react-table';

import { DataGridProps } from '../DataGrid';
import { showOverrideWarnings, RowHelper } from '../helpers';
import DataGridContext from './DataGridContext';

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
    useFlexLayout,
    useResizeColumns,
    useFilters,
    useGlobalFilter,
    useGroupBy,
    useSortBy,
    useExpanded,
    usePagination,
    useRowSelect,
  );

  if (process.env.NODE_ENV !== 'production' && !suppressOverrideWarning) {
    showOverrideWarnings(rest);
  }

  const rowOptions = RowHelper({ table });

  return (
    <DataGridContext.Provider
      // @ts-ignore
      value={{
        columns,
        data,
        table,
        ...rowOptions,
        ...rest,
      }}
    >
      {children}
    </DataGridContext.Provider>
  );
};

export default DataGridProvider;
