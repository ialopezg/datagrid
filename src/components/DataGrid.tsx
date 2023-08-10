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
  Column,
  HeaderGroup,
  Row,
  TableBodyProps,
  TableCellProps,
  TableHeaderProps,
  TableInstance,
  TableOptions,
  TableRowProps,
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
  columns: (Column<D> & DataGridColumn<D>)[];
  bodyCellProps?: TableCellProps | ((cell?: Cell<D>) => TableCellProps);
  bodyCellEditTextFieldProps?:
    | TextFieldProps
    | ((cell: Cell<D>) => TextFieldProps);
  bodyProps?: TableBodyProps;
  bodyRowProps?: TableRowProps | ((row: Row<D>) => TableRowProps);
  containerProps?: TableContainerProps;
  defaultDensePadding?: boolean;
  defaultShowFilters?: boolean;
  disableColumnActions?: boolean;
  disableColumnHiding?: boolean;
  disableDensePadding?: boolean;
  disableExpandAll?: boolean;
  disableSelectAll?: boolean;
  disableSubRowTree?: boolean;
  detailPanel?: (row: Row<D>) => ReactNode;
  detailPanelProps?: TableCellProps | ((row: Row<D>) => TableCellProps);
  enableColumnGrouping?: boolean;
  enableColumnResizing?: boolean;
  enableRowActions?: boolean;
  enableRowEditing?: boolean;
  enableSelection?: boolean;
  footerCellProps?: TableCellProps | ((column: Column<D>) => TableCellProps);
  footerProps?: TableFooterProps;
  footerRowProps?:
    | TableRowProps
    | ((footerGroup: HeaderGroup<D>) => TableRowProps);
  headerCellProps?: TableCellProps | ((column: Column<D>) => TableCellProps);
  headerCellFilterTextFieldProps?:
    | TextFieldProps
    | ((column: Column<D>) => TextFieldProps);
  headerProps?:
    | TableHeadProps
    | ((table: TableInstance<D>) => TableHeaderProps);
  headerRowProps?:
    | TableRowProps
    | ((headerGroup: HeaderGroup<D>) => TableRowProps);
  hideFooter?: boolean;
  hideHeader?: boolean;
  hideToolbarActions?: boolean;
  hideToolbarBottom?: boolean;
  hideToolbarTop?: boolean;
  isFetching?: boolean;
  isLoading?: boolean;
  localization?: Partial<Localization>;
  onCellClick?: (e: MouseEvent<HTMLTableCellElement>, cell: Cell<D>) => void;
  onDetailPanelClick?: (
    e: MouseEvent<HTMLTableCellElement>,
    row: Row<D>,
  ) => void;
  onGlobalFilterChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onRowClick?: (e: MouseEvent<HTMLTableRowElement>, row: Row<D>) => void;
  onRowEditSubmit?: (row: Row<D>) => Promise<void> | void;
  onRowExpandedChange?: (e: MouseEvent<HTMLButtonElement>, row: Row<D>) => void;
  onSearchChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onRowSelectChange?: (
    e: ChangeEvent,
    row: Row<D>,
    selectedRows: Row<D>[],
  ) => void;
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
  searchProps?: TextFieldProps;
  tableProps?: TableProps;
  title?: string | ReactNode;
  titleProps?: TypographyProps;
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
