import React, {
  PropsWithChildren,
  useCallback,
  useMemo,
  useState,
} from 'react';
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
  DataGridColumnInterface,
  DataGridFilterType,
  DataGridInstance,
  DataGridProps,
  DataGridRow,
} from '../DataGrid';
import { DATAGRID_FILTER_TYPE } from '../DataGridFilterType';
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
  const findLowestLevelCols = useCallback(() => {
    let lowestLevelColumns: any[] = props.columns;
    let currentCols: any[] = props.columns;
    while (!!currentCols.length && currentCols.some((col) => col.columns)) {
      const nextCols = currentCols
        .filter((col) => !!col.columns)
        .map((col) => col.columns)
        .flat();
      if (nextCols.every((col) => !col.columns)) {
        lowestLevelColumns = [...lowestLevelColumns, ...nextCols];
      }
      currentCols = nextCols;
    }

    return lowestLevelColumns.filter((col) => !col.columns);
  }, [props.columns]);

  const [currentFilterTypes, setCurrentFilterTypes] = useState<{
    [key: string]: DataGridFilterType;
  }>(() =>
    Object.assign(
      {},
      ...findLowestLevelCols().map((c) => ({
        [c.accessor as string]:
          c.filter ??
          props?.initialState?.filters?.[c.accessor as any] ??
          (!!c.filterSelectOptions ? 'equals' : 'fuzzy'),
      })),
    ),
  );

  const applyFiltersToColumns = useCallback(
    (cols: DataGridColumnInterface[]) =>
      cols.map((column) => {
        if (column.columns) {
          applyFiltersToColumns(column.columns);
        } else {
          column.filter =
            props?.filterTypes?.[
              currentFilterTypes[
                column.accessor as string
              ] as DATAGRID_FILTER_TYPE
            ];
        }
        return column;
      }),
    [currentFilterTypes, props.filterTypes],
  );

  const columns = useMemo(
    () => applyFiltersToColumns(props.columns),
    [props.columns, applyFiltersToColumns],
  );

  const table = useTable(
    // @ts-ignore
    {
      ...props,
      columns,
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
  ) as unknown as DataGridInstance<D>;

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
