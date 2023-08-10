import {
  TableBodyProps,
  TableCellProps,
  TableContainerProps,
  TableFooterProps,
  TableHeadProps,
  TablePaginationProps,
  TableProps,
  TableRowProps,
  TextFieldProps,
  ToolbarProps,
} from '@mui/material';
import {
  Cell,
  Column,
  HeaderGroup,
  Row,
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
  UseTableOptions,
} from 'react-table';
import React, { ChangeEvent, MouseEvent, ReactNode } from 'react';

import DataGridProvider from './providers/DataGridProvider';
import Container from './table/Container';
import { defaultLocalization, Localization } from './localization';
import { DataGridColumn } from '../types/react-table-config';

export interface DataGridProps<D extends {} = {}>
  extends TableOptions<D>,
    UseTableOptions<D>,
    UseExpandedOptions<D>,
    UseFiltersOptions<D>,
    UseGlobalFiltersOptions<D>,
    UseGroupByOptions<D>,
    UsePaginationOptions<D>,
    UseResizeColumnsOptions<D>,
    UseRowSelectOptions<D>,
    UseRowStateOptions<D>,
    UseSortByOptions<D> {
  columns: (Column<D> & DataGridColumn)[];
  bodyCellProps?: TableCellProps | ((cell?: Cell<D>) => TableCellProps);
  bodyProps?: TableBodyProps;
  bodyRowProps?: TableRowProps | ((row: Row<D>) => TableRowProps);
  containerProps?: TableContainerProps;
  defaultDensePadding?: boolean;
  defaultShowFilters?: boolean;
  defaultShowSearch?: boolean;
  detailPanel?: (row: Row<D>) => ReactNode;
  detailPanelProps?: TableCellProps | ((row: Row<D>) => TableCellProps);
  disableColumnActions?: boolean;
  disableColumnHiding?: boolean;
  disableDensePadding?: boolean;
  disableExpandAll?: boolean;
  disableSelectAll?: boolean;
  disableSubRowTree?: boolean;
  editCellTextFieldProps?:
    | TextFieldProps
    | ((cell?: Cell<D>) => TextFieldProps);
  enableColumnGrouping?: boolean;
  enableColumnResizing?: boolean;
  enableRowActions?: boolean;
  enableRowEditing?: boolean;
  enableSelection?: boolean;
  filterTextFieldProps?:
    | TextFieldProps
    | ((column: Column<D>) => TextFieldProps);
  footerCellProps?: TableCellProps | ((column: Column<D>) => TableCellProps);
  footerProps?: TableFooterProps;
  footerRowProps?:
    | TableRowProps
    | ((footerGroup: HeaderGroup<D>) => TableRowProps);
  headerCellProps?: TableCellProps | ((column: Column<D>) => TableCellProps);
  headerProps?: TableHeadProps;
  headerRowProps?: TableRowProps | ((row: HeaderGroup<D>) => TableRowProps);
  hideFooter?: boolean;
  hideHeader?: boolean;
  hideToolbarActions?: boolean;
  hideToolbarBottom?: boolean;
  hideToolbarTop?: boolean;
  isFetching?: boolean;
  isLoading?: boolean;
  localization?: Partial<Localization>;
  onCellClick?: (e: MouseEvent<HTMLTableCellElement>, cell: Cell<D>) => void;
  onColumnHide?: (column: Column<D>, visibleColumns: Column<D>[]) => void;
  onDetailPanelClick?: (
    e: MouseEvent<HTMLTableCellElement>,
    row: Row<D>,
  ) => void;
  onGlobalFilterChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onRowClick?: (e: MouseEvent<HTMLTableRowElement>, row: Row<D>) => void;
  onRowEditSubmit?: (row: Row<D>) => Promise<void> | void;
  onRowExpandedChange?: (e: MouseEvent<HTMLButtonElement>, row: Row<D>) => void;
  onRowSelectChange?: (
    e: ChangeEvent,
    row: Row<D>,
    selectedRows: Row<D>[],
  ) => void;
  onSearchChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  paginationPosition?: 'bottom' | 'both' | 'top';
  paginationProps?:
    | Partial<TablePaginationProps>
    | ((table: TableInstance<D>) => Partial<TablePaginationProps>);
  rowActions?: (row: Row<D>, table: TableInstance<D>) => ReactNode;
  rowActionsColumn?: 'first' | 'last';
  rowActionMenuItems?: (
    row: Row<D>,
    table: TableInstance<D>,
    onCloseMenu: () => void,
  ) => ReactNode[];
  searchBoxProps?: TextFieldProps;
  tableProps?: TableProps;
  toolbarActions?: (table: TableInstance<D>) => ReactNode;
  toolbarActionsPosition?: 'bottom' | 'top';
  toolbarBottomProps?:
    | ToolbarProps
    | ((table: TableInstance<D>) => ToolbarProps);
  toolbarTopProps?: ToolbarProps | ((table: TableInstance<D>) => ToolbarProps);
}

export default <D extends {}>({
  defaultColumn = { minWidth: 50, maxWidth: 1000 },
  localization = defaultLocalization,
  rowActionsColumn = 'first',
  paginationPosition = 'bottom',
  toolbarActionsPosition = 'top',
  ...rest
}: DataGridProps<D>) => (
  <DataGridProvider
    defaultColumn={defaultColumn}
    rowActionsColumn={rowActionsColumn}
    localization={{ ...defaultLocalization, ...localization }}
    paginationPosition={paginationPosition}
    toolbarActionsPosition={toolbarActionsPosition}
    {...rest}
  >
    <Container />
  </DataGridProvider>
);
