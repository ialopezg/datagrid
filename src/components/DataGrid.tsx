import {
  TableContainerProps,
  TableFooterProps,
  TableHeadProps,
  TablePaginationProps,
  TableProps,
} from '@mui/material';
import { Column, Row, UseRowStateLocalState } from 'react-table';
import React, { ChangeEvent, FC, MouseEvent, ReactNode } from 'react';

import DataGridProvider from './providers/DataGridProvider';
import Container from './table/Container';

export interface DataGridOptionalProps {
  containerProps?: Partial<TableContainerProps>;
  detailPanel?: (row: Row<object>) => ReactNode;
  enableFilters?: boolean;
  enablePagination?: boolean;
  enableSearch?: boolean;
  enableSelectAll?: boolean;
  enableSelection?: boolean;
  enableSorting?: boolean;
  footerProps?: TableFooterProps;
  headerProps?: TableHeadProps;
  onRowClick?: (e: MouseEvent<HTMLTableRowElement>, row: Row<object>) => void;
  onRowSelect?: (e: ChangeEvent, state: UseRowStateLocalState<object, unknown>) => void;
  paginationPosition?: 'bottom' | 'both' | 'top';
  paginationProps?: TablePaginationProps;
  showFooter?: boolean;
  showHeader?: boolean;
  showToolbar?: boolean;
  tableProps?: TableProps;
}

export interface DataGridProps extends DataGridOptionalProps {
  columns: Column<any>[];
  data: any[];
}

export const DataGrid: FC<DataGridProps> = ({
  enableFilters = true,
  enablePagination = true,
  enableSearch = true,
  enableSorting = true,
  paginationPosition = 'bottom',
  showFooter = true,
  showHeader = true,
  ...rest
}) => (
  <DataGridProvider
    enableFilters={enableFilters}
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
