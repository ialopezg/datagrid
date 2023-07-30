import {
  TableContainerProps,
  TableFooterProps,
  TableHeadProps,
  TablePaginationProps,
  TableProps,
} from '@mui/material';
import { Column } from 'react-table';
import React, { FC } from 'react';

import DataGridProvider from './providers/DataGridProvider';
import Container from './table/Container';
import { defaultOptions } from './defaultOptions';

export interface DataGridOptions {
  enableFilters: boolean;
  enablePagination: boolean | 'top' | 'bottom' | 'both' | 'none';
  enableSearch: boolean;
  enableSorting: boolean;
  showFooter: boolean;
  showHeader: boolean;
  showToolbar: boolean;
}

type DataGridOptionProps = Partial<DataGridOptions>;

export interface DataGridOptionalProps {
  containerProps?: Partial<TableContainerProps>;
  footerProps?: TableFooterProps;
  headerProps?: TableHeadProps;
  options?: DataGridOptionProps;
  paginationProps?: TablePaginationProps;
  tableProps?: TableProps;
}

export interface DataGridProps extends DataGridOptionalProps {
  columns: Column<any>[];
  data: any[];
}

export const DataGrid: FC<DataGridProps> = ({
  options = defaultOptions,
  ...rest
}) => (
  <DataGridProvider options={options} {...rest}>
    <Container />
  </DataGridProvider>
);

export default DataGrid;
