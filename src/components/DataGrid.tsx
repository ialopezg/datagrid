import {
  TableContainerProps,
  TableFooterProps,
  TableHeadProps,
  TablePaginationProps,
  TableProps,
  TextFieldProps,
  TypographyProps,
} from '@mui/material';
import { Column, Row, UseRowStateLocalState } from 'react-table';
import React, { ChangeEvent, MouseEvent, ReactNode } from 'react';

import DataGridProvider from './providers/DataGridProvider';
import Container from './table/Container';

export interface DataGridProps<D extends {} = {}> {
  columns: Column<D | {}>[];
  containerProps?: TableContainerProps;
  data: D[];
  detailPanel?: (row: Row<D>) => ReactNode;
  enableFiltering?: boolean;
  enablePagination?: boolean;
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
    selectedRows: Row<D>[]
  ) => void;
  paginationPosition?: 'bottom' | 'both' | 'top';
  paginationProps?: TablePaginationProps;
  searchProps?: TextFieldProps;
  showFooter?: boolean;
  showHeader?: boolean;
  showToolbar?: boolean;
  tableProps?: TableProps;
  title?: string | ReactNode;
  titleProps?: TypographyProps;
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
