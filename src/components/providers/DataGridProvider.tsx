import React, { PropsWithChildren, useMemo, useState } from 'react';
import {
  PluginHook,
  Row,
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
import DataGridContext from './DataGridContext';

export const DataGridProvider = <D extends {}>(
  props: PropsWithChildren<DataGridProps<D>>,
) => {
  const hooks: PluginHook<D>[] = [
    useFilters,
    useGlobalFilter,
    useGroupBy,
    useSortBy,
    useExpanded,
    usePagination,
    useRowSelect,
  ];

  if (props.enableColumnResizing) {
    hooks.unshift(useResizeColumns, useFlexLayout);
  }

  const table = useTable<D>(props, ...hooks);

  // ** State
  const [densePadding, setDensePadding] = useState<boolean>(
    props.defaultDensePadding ?? false,
  );
  const [itemForUpdate, setItemForUpdate] = useState<Row | null>(null);
  const [fullScreen, setFullScreen] = useState<boolean>(
    props.defaultFullScreen ?? false,
  );
  const [showFilters, setShowFilters] = useState<boolean>(
    props.defaultShowFilters ?? false,
  );
  const [showSearch, setShowSearch] = useState<boolean>(
    props.defaultShowSearch ?? false,
  );
  const hasExpandableRows = useMemo(
    () => table.rows.some((row) => row.canExpand),
    [table.rows],
  );
  const hasExpandedRows = useMemo(
    () => table.rows.some((row) => row.isExpanded),
    [table.rows],
  );

  return (
    <DataGridContext.Provider
      value={{
        ...props,
        densePadding,
        fullScreen,
        hasExpandableRows,
        hasExpandedRows,
        itemForUpdate,
        setDensePadding,
        setFullScreen,
        setItemForUpdate,
        setShowFilters,
        setShowSearch,
        showFilters,
        showSearch,
        // @ts-ignore
        table,
      }}
    >
      {props.children}
    </DataGridContext.Provider>
  );
};

export default DataGridProvider;
