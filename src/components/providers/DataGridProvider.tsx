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
  DATAGRID_FILTER_TYPE,
  DataGridFilterType,
  DataGridInstance,
  DataGridProps,
  DataGridRow,
} from '../DataGrid';
import { defaultFilters } from '../DataGridFilters';
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
  const filterTypes = useMemo<Partial<{ [key in DATAGRID_FILTER_TYPE]: any }>>(
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
      ...props.columns.map((c) => ({
        [c.accessor as string]:
          c.filter ??
          props?.initialState?.filters?.[c.accessor as any] ??
          (!!c.filterSelectOptions
            ? DATAGRID_FILTER_TYPE.EQUALS
            : DATAGRID_FILTER_TYPE.FUZZY),
      })),
    ),
  );

  const columns = useMemo(
    () =>
      props.columns.map((column) => {
        column.filter =
          filterTypes[
            currentFilterTypes[
              column.accessor as string
            ] as DATAGRID_FILTER_TYPE
          ];

        return column;
      }),
    [props.columns, filterTypes, currentFilterTypes],
  );
  console.log('columns', columns);
  const table = useTable(
    {
      ...props,
      columns,
      // @ts-ignore
      filterTypes,
      globalFilterValue: DATAGRID_FILTER_TYPE.FUZZY,
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
        // @ts-ignore
        setCurrentEditingRow,
        setCurrentFilterTypes,
        setDensePadding,
        setFullScreen,
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
