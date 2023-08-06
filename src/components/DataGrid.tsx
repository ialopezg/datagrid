import {
  TableContainerProps,
  TableFooterProps,
  TableHeadProps,
  TablePaginationProps,
  TableProps,
  TextFieldProps, ToolbarProps,
  TypographyProps,
} from '@mui/material';
import {
  Cell,
  Column,
  HeaderGroup,
  Row,
  TableBodyProps,
  TableCellProps,
  TableInstance,
  UseRowStateLocalState,
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
  detailPanel?: (row: Row<D>) => ReactNode;
  detailPanelProps?: TableCellProps;
  enableColumnActions?: boolean;
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
  headerProps?: TableHeadProps;
  isLoading?: boolean;
  isReloading?: boolean;
  localization?: Localization;
  onRowClick?: (e: MouseEvent<HTMLTableRowElement>, row: Row<D>) => void;
  onRowSelect?: (
    e: ChangeEvent,
    state: UseRowStateLocalState<D, unknown>,
    selectedRows: Row<D>[],
  ) => void;
  paginationPosition?: 'bottom' | 'both' | 'top';
  paginationProps?: TablePaginationProps;
  searchProps?: TextFieldProps;
  showFiltersInColumnHeader?: boolean;
  showFooter?: boolean;
  showHeader?: boolean;
  showToolbar?: boolean;
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
