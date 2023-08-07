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
  bodyCellProps?: TableCellProps | ((cell?: Cell<D>) => TableCellProps);
  bodyProps?: TableBodyProps;
  bodyRowProps?: TableRowProps | ((row: Row<D>) => TableRowProps);
  columns: Column<D>[];
  containerProps?: TableContainerProps;
  defaultDensePadding?: boolean;
  defaultShowFilters?: boolean;
  disableColumnActions?: boolean;
  disableDensePadding?: boolean;
  disableColumnHiding?: boolean;
  disableExpandAll?: boolean;
  disableSelectAll?: boolean;
  disableSubRowTree?: boolean;
  detailPanel?: (row: Row<D>) => ReactNode;
  detailPanelProps?: TableCellProps | ((row: Row<D>) => TableCellProps);
  enableColumnGrouping?: boolean;
  enableColumnResizing?: boolean;
  enableSelection?: boolean;
  footerCellProps?: TableCellProps | ((column: Column<D>) => TableCellProps);
  footerProps?: TableFooterProps;
  footerRowProps?:
    | TableRowProps
    | ((footerGroup: HeaderGroup<D>) => TableRowProps);
  headerCellProps?: TableCellProps | ((column: Column<D>) => TableCellProps);
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
  paginationPosition = 'bottom',
  toolbarActionsPosition = 'top',
  ...rest
}: DataGridProps<D>) => (
  <DataGridProvider
    defaultColumn={defaultColumn}
    localization={{ ...defaultLocalization, ...localization }}
    paginationPosition={paginationPosition}
    toolbarActionsPosition={toolbarActionsPosition}
    {...rest}
  >
    <Container />
  </DataGridProvider>
);
