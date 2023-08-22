import React, { PropsWithChildren, useMemo, useState } from 'react';
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

import {
  DataGridFilterType,
  DataGridInstance,
  DataGridProps,
  DataGridRow,
} from '../DataGrid';
import { defaultFilters } from '../helpers';
import DataGridContext from './DataGridContext';

export const DataGridProvider = <D extends {} = {}>(
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

  // ** State
  const [densePadding, setDensePadding] = useState<boolean>(
    props.initialState?.densePadding ?? false,
  );
  const [currentEditingRow, setCurrentEditingRow] =
    useState<DataGridRow<D> | null>(null);
  const [fullScreen, setFullScreen] = useState<boolean>(
    props.initialState?.fullScreen ?? false,
  );
  const [showFilters, setShowFilters] = useState<boolean>(
    props.initialState?.showFilters ?? false,
  );
  const [showSearch, setShowSearch] = useState<boolean>(
    props.initialState?.showSearch ?? false,
  );
  const filterTypes = useMemo<Partial<{ [key in DataGridFilterType]: any }>>(
    () => ({
      ...defaultFilters,
      ...props.filterTypes,
    }),
    [props.filterTypes],
  );
  const [currentFilterTypes, setCurrentFilterTypes] = useState<{
    [key: string]: DataGridFilterType;
  }>(() =>
    Object.assign(
      {},
      ...props.columns
        .map((c) => String(c.accessor))
        .map((accessor) => ({
          [accessor]:
            props?.initialState?.filters?.[accessor as any] ?? 'fuzzy',
        })),
    ),
  );

  const columns = useMemo(
    () =>
      props.columns.map((column) => {
        column.filter =
          filterTypes[currentFilterTypes[String(column.accessor)]];

        return column;
      }),
    [props.columns, filterTypes, currentFilterTypes],
  );

  const table = useTable(
    {
      ...props,
      columns,
      // @ts-ignore
      filterTypes,
      useControlledState: (state) =>
        useMemo(
          () => ({
            ...state,
            currentEditingRow,
            currentFilterTypes,
            densePadding,
            fullScreen,
            showFilters,
            showSearch,
            // @ts-ignore
            ...props?.useControlledState?.(state),
          }),
          [
            currentEditingRow,
            currentFilterTypes,
            densePadding,
            fullScreen,
            showFilters,
            showSearch,
            state,
          ],
        ),
    },
    ...hooks,
  ) as DataGridInstance<D>;

  const idPrefix = useMemo(
    () => props.idPrefix ?? Math.random().toString(36).substring(2, 9),
    [props.idPrefix],
  );
  const hasExpandableRows = useMemo(
    () => table.rows.some((row: DataGridRow<D>) => row.canExpand),
    [table.rows],
  );
  const hasExpandedRows = useMemo(
    () => table.rows.some((row: DataGridRow<D>) => row.isExpanded),
    [table.rows],
  );

  return (
    <DataGridContext.Provider
      value={{
        ...props,
        hasExpandableRows,
        hasExpandedRows,
        idPrefix,
        setDensePadding,
        setFullScreen,
        // @ts-ignore
        setCurrentEditingRow,
        setCurrentFilterTypes,
        setShowFilters,
        setShowSearch,
        // @ts-ignore
        table,
      }}
    >
      {props.children}
    </DataGridContext.Provider>
  );
};

export default DataGridProvider;
