import React, { PropsWithChildren } from 'react';
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

export const DataGridProvider = <D extends {}>(
  props: PropsWithChildren<DataGridProps<D>>,
) => {
  const table = useTable<D>(
    props,
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

  if (process.env.NODE_ENV !== 'production' && !props.suppressOverrideWarning) {
    showOverrideWarnings(props);
  }

  const rowOptions = RowHelper({ table });

  return (
    <DataGridContext.Provider
      value={{
        // @ts-ignore
        table,
        ...rowOptions,
        ...props,
      }}
    >
      {props.children}
    </DataGridContext.Provider>
  );
};

export default DataGridProvider;
