import {
  TableContainerProps,
  TableFooterProps,
  TableHeadProps,
  TablePaginationProps,
  TableProps,
  TextFieldProps,
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

export interface DataGridProps<D extends {} = {}> {
  bodyProps?: TableBodyProps;
  columns: Column<D | {}>[];
  containerProps?: TableContainerProps;
  data: D[];
  detailPanel?: (row: Row<D>) => ReactNode;
  detailPanelProps?: TableCellProps;
  enableFiltering?: boolean;
  enablePagination?: boolean;
  enableRowTree?: boolean;
  enableSearch?: boolean;
  enableSelectAll?: boolean;
  enableSelection?: boolean;
  enableSorting?: boolean;
  footerProps?: TableFooterProps;
  headerProps?: TableHeadProps;
  onRowClick?: (e: MouseEvent<HTMLTableRowElement>, row: Row<D>) => void;
  onRowSelect?: (
    e: ChangeEvent,
    state: UseRowStateLocalState<D, unknown>,
    selectedRows: Row<D>[],
  ) => void;
  paginationPosition?: 'bottom' | 'both' | 'top';
  paginationProps?: TablePaginationProps;
  searchProps?: TextFieldProps;
  showFooter?: boolean;
  showHeader?: boolean;
  showToolbar?: boolean;
  suppressOverrideWarning?: boolean;
  tableProps?: TableProps;
  title?: string | ReactNode;
  titleProps?: TypographyProps;

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
  enableSearch = true,
  enableSorting = true,
  paginationPosition = 'bottom',
  showFooter = true,
  showHeader = true,
  ...rest
}: DataGridProps<D>) => (
  <DataGridProvider
    enablePagination={enablePagination}
    enableSearch={enableSearch}
    enableSorting={enableSorting}
    paginationPosition={paginationPosition}
    showFooter={showFooter}
    showHeader={showHeader}
    {...rest}
  >
    <Container />
  </DataGridProvider>
);

export default DataGrid;
