import React, { PropsWithChildren, useState } from 'react';
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
import { RowHelper } from '../helpers';
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

  const rowOptions = RowHelper({ table });

  // ** State
  const [showFilters, setShowFilters] = useState<boolean | undefined>(
    props.defaultShowFilters,
  );

  return (
    <DataGridContext.Provider
      value={{
        ...rowOptions,
        ...props,
        showFilters,
        setShowFilters,
        // @ts-ignore
        table,
      }}
    >
      {props.children}
    </DataGridContext.Provider>
  );
};

export default DataGridProvider;
