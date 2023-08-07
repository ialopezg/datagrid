import React, { PropsWithChildren, useState } from 'react';
import {
  PluginHook,
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
  const hooks: PluginHook<D>[] = [
    useResizeColumns,
    useFilters,
    useGlobalFilter,
    useGroupBy,
    useSortBy,
    useExpanded,
    usePagination,
    useRowSelect,
  ];

  if (props.enableColumnResizing) {
    hooks.unshift(useFlexLayout);
  }

  const table = useTable<D>(props, ...hooks);

  const rowOptions = RowHelper({ table });

  // ** State
  const [densePadding, setDensePadding] = useState<boolean>(
    props.defaultDensePadding ?? false,
  );
  const [showFilters, setShowFilters] = useState<boolean>(
    props.defaultShowFilters ?? false,
  );

  return (
    <DataGridContext.Provider
      value={{
        ...rowOptions,
        ...props,
        densePadding,
        setDensePadding,
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
