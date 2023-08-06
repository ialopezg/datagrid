import {
  TableContainerProps,
  TableFooterProps,
  TableHeadProps,
  TablePaginationProps,
  TableProps,
  TextFieldProps,
  ToolbarProps,
  TypographyProps,
} from '@mui/material';
import {
  ActionType,
  Cell,
  Column,
  HeaderGroup,
  Row,
  TableBodyProps,
  TableCellProps,
  TableInstance,
  TableState,
  UseTableColumnOptions,
} from 'react-table';
import React, { ChangeEvent, MouseEvent, ReactNode } from 'react';

import DataGridProvider from './providers/DataGridProvider';
import Container from './table/Container';
import { defaultLocalization, Localization } from './localization';

export interface DataGridProps<D extends {} = {}> {
  bodyProps?: TableBodyProps;
  columns: Column<D | {}>[];
  containerProps?: TableContainerProps;
  data: D[];
  defaultColumn?: UseTableColumnOptions<D>;
  detailPanel?: (row: Row<D>) => ReactNode;
  detailPanelProps?: TableCellProps;
  enableColumnActions?: boolean;
  enableColumnGrouping?: boolean;
  enableColumnHiding?: boolean;
  enableColumnReordering?: boolean;
  enableColumnResizing?: boolean;
  enableExpandAll?: boolean;
  enableFiltering?: boolean;
  enablePagination?: boolean;
  enableRowTree?: boolean;
  enableSearch?: boolean;
  enableSelectAll?: boolean;
  enableSelection?: boolean;
  enableSorting?: boolean;
  footerProps?: TableFooterProps;
  getRowId?: (
    data?: Partial<Row<D>>,
    index?: number,
    parent?: Row<D | {}>,
  ) => string;
  getSubRows?: (data: Partial<Row<D>>, index: number) => Row<D>[];
  headerProps?: TableHeadProps;
  initialState?: Partial<TableState<D>>;
  isLoading?: boolean;
  isFetching?: boolean;
  localization?: Partial<Localization>;
  onCellClick?: (e: MouseEvent<HTMLTableCellElement>, cell: Cell<D>) => void;
  onRowClick?: (e: MouseEvent<HTMLTableRowElement>, row: Row<D>) => void;
  onRowExpandedChange?: (e: MouseEvent<HTMLButtonElement>, row: Row<D>) => void;
  onSearchChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onRowSelect?: (e: ChangeEvent, row: Row<D>, selectedRows: Row<D>[]) => void;
  paginationPosition?: 'bottom' | 'both' | 'top';
  paginationProps?: TablePaginationProps;
  searchProps?: TextFieldProps;
  showFiltersInColumnHeader?: boolean;
  showFooter?: boolean;
  showHeader?: boolean;
  showToolbar?: boolean;
  stateReducer?: (
    newState: TableState<D>,
    action: ActionType,
    previousState: TableState<D>,
    table?: TableInstance<{} | D>,
  ) => TableState;
  suppressOverrideWarning?: boolean;
  tableProps?: TableProps;
  title?: string | ReactNode;
  titleProps?: TypographyProps;
  toolbarProps?: ToolbarProps;

  CustomBodyComponent?(table: TableInstance<D>): ReactNode;

  CustomBodyCellComponent?(cell: Cell<D>, table: TableInstance<D>): ReactNode;

  CustomBodyRowComponent?(row: Row<D>, table: TableInstance<D>): ReactNode;

  CustomContainerComponent?(table: TableInstance<D>): ReactNode;

  CustomDetailPanelComponent?(row: Row<D>, table: TableInstance<D>): ReactNode;

  CustomFooterComponent?(table: TableInstance<D>): ReactNode;

  CustomFooterCellComponent?(
    column: HeaderGroup<D>,
    table: TableInstance<D>,
  ): ReactNode;

  CustomFooterRowComponent?(
    row: HeaderGroup<D>,
    table: TableInstance<D>,
  ): ReactNode;

  CustomHeaderComponent?(table: TableInstance<D>): ReactNode;

  CustomHeaderCellComponent?(
    column: HeaderGroup<D>,
    table: TableInstance<D>,
  ): ReactNode;

  CustomHeaderRowComponent?(
    headerGroup: HeaderGroup<D>,
    table: TableInstance<D>,
  ): ReactNode;

  CustomPaginationComponent?(table: TableInstance<D>): ReactNode;

  CustomToolbarComponent?(table: TableInstance<D>): ReactNode;
}

export const DataGrid = <D extends {}>({
  defaultColumn = { minWidth: 50, maxWidth: 1000 },
  enablePagination = true,
  enableRowTree = true,
  enableSorting = true,
  localization = defaultLocalization,
  paginationPosition = 'bottom',
  showFiltersInColumnHeader = true,
  showFooter = true,
  showHeader = true,
  showToolbar = true,
  ...rest
}: DataGridProps<D>) => (
  <DataGridProvider
    defaultColumn={defaultColumn}
    enablePagination={enablePagination}
    enableRowTree={enableRowTree}
    enableSorting={enableSorting}
    localization={{ ...defaultLocalization, ...localization }}
    paginationPosition={paginationPosition}
    showFooter={showFooter}
    showFiltersInColumnHeader={showFiltersInColumnHeader}
    showHeader={showHeader}
    showToolbar={showToolbar}
    {...rest}
  >
    <Container />
  </DataGridProvider>
);

export default DataGrid;
