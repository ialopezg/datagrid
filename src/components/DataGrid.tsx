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
import React, { ChangeEvent, FC, MouseEvent, ReactNode } from 'react';

import DataGridProvider from './providers/DataGridProvider';
import Container from './table/Container';

export interface DataGridProps {
  columns: Column<any>[];
  containerProps?: Partial<TableContainerProps>;
  data: any[];
  detailPanel?: (row: Row<object>) => ReactNode;
  enableFiltering?: boolean;
  enablePagination?: boolean;
  enableSearch?: boolean;
  enableSelectAll?: boolean;
  enableSelection?: boolean;
  enableSorting?: boolean;
  footerProps?: TableFooterProps;
  headerProps?: TableHeadProps;
  onRowClick?: (e: MouseEvent<HTMLTableRowElement>, row: Row<object>) => void;
  onRowSelect?: (
    e: ChangeEvent,
    state: UseRowStateLocalState<object, unknown>,
    selectedRows: Row<object>[]
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

export const DataGrid: FC<DataGridProps> = ({
  enablePagination = true,
  enableSearch = true,
  enableSorting = true,
  paginationPosition = 'bottom',
  showFooter = true,
  showHeader = true,
  ...rest
}) => (
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
