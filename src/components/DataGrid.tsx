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
  Cell,
  HeaderGroup,
  Row,
  TableBodyProps,
  TableCellProps,
  TableInstance,
  TableOptions,
  UseExpandedOptions,
  UseFiltersOptions,
  UseGlobalFiltersOptions,
  UseGroupByOptions,
  UsePaginationOptions,
  UseResizeColumnsOptions,
  UseRowSelectOptions,
  UseRowStateOptions,
  UseSortByOptions,
} from 'react-table';
import React, { ChangeEvent, MouseEvent, ReactNode } from 'react';

import DataGridProvider from './providers/DataGridProvider';
import Container from './table/Container';
import { defaultLocalization, Localization } from './localization';

export interface DataGridProps<D extends {} = {}>
  extends TableOptions<D>,
    UseExpandedOptions<D>,
    UseFiltersOptions<D>,
    UseGlobalFiltersOptions<D>,
    UseGroupByOptions<D>,
    UsePaginationOptions<D>,
    UseResizeColumnsOptions<D>,
    UseRowSelectOptions<D>,
    UseRowStateOptions<D>,
    UseSortByOptions<D> {
  bodyProps?: TableBodyProps;
  containerProps?: TableContainerProps;

  customBodyComponent?(table: TableInstance<D>): ReactNode;

  customBodyCellComponent?(cell: Cell<D>, table: TableInstance<D>): ReactNode;

  customBodyRowComponent?(row: Row<D>, table: TableInstance<D>): ReactNode;

  customContainerComponent?(table: TableInstance<D>): ReactNode;

  customDetailPanelComponent?(row: Row<D>, table: TableInstance<D>): ReactNode;

  customFooterComponent?(table: TableInstance<D>): ReactNode;

  customFooterCellComponent?(
    column: HeaderGroup<D>,
    table: TableInstance<D>,
  ): ReactNode;

  customFooterRowComponent?(
    row: HeaderGroup<D>,
    table: TableInstance<D>,
  ): ReactNode;

  customHeaderComponent?(table: TableInstance<D>): ReactNode;

  customHeaderCellComponent?(
    column: HeaderGroup<D>,
    table: TableInstance<D>,
  ): ReactNode;

  customHeaderRowComponent?(
    headerGroup: HeaderGroup<D>,
    table: TableInstance<D>,
  ): ReactNode;

  customPaginationComponent?(table: TableInstance<D>): ReactNode;

  customToolbarComponent?: (table: TableInstance<D>) => ReactNode;
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
  headerProps?: TableHeadProps;
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
  suppressOverrideWarning?: boolean;
  tableProps?: TableProps;
  title?: string | ReactNode;
  titleProps?: TypographyProps;
  toolbarProps?: ToolbarProps;
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
