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
  Row,
  TableBodyProps,
  TableCellProps,
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
  defaultShowFilters?: boolean;
  disableColumnActions?: boolean;
  disableColumnHiding?: boolean;
  disableExpandAll?: boolean;
  disableSelectAll?: boolean;
  disableSubRowTree?: boolean;
  detailPanel?: (row: Row<D>) => ReactNode;
  detailPanelProps?: TableCellProps;
  enableColumnGrouping?: boolean;
  enableColumnResizing?: boolean;
  enableSelection?: boolean;
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
  hideFooter?: boolean;
  hideHeader?: boolean;
  hideToolbar?: boolean;
  tableProps?: TableProps;
  title?: string | ReactNode;
  titleProps?: TypographyProps;
  toolbarProps?: ToolbarProps;
}

export default <D extends {}>({
  defaultColumn = { minWidth: 50, maxWidth: 1000 },
  localization = defaultLocalization,
  paginationPosition = 'bottom',
  ...rest
}: DataGridProps<D>) => (
  <DataGridProvider
    defaultColumn={defaultColumn}
    localization={{ ...defaultLocalization, ...localization }}
    paginationPosition={paginationPosition}
    {...rest}
  >
    <Container />
  </DataGridProvider>
);
