import { TablePagination } from '@mui/material';
import React, { ChangeEvent, FC } from 'react';

import { useDataGrid } from '../providers';

interface PaginationProps {}

export const Pagination: FC<PaginationProps> = () => {
  const { paginationProps: defaultPaginationProps, table } = useDataGrid();

  const paginationProps =
    defaultPaginationProps instanceof Function
      ? defaultPaginationProps(table)
      : defaultPaginationProps;

  const onRowsPerPageChange = (e: ChangeEvent<HTMLInputElement>) => {
    table.setPageSize(+e.target.value);
    table.gotoPage(0);
  };

  return (
    <TablePagination
      component="div"
      colSpan={table.rows.length + 10}
      count={table.rows.length}
      page={table.state.pageIndex}
      rowsPerPage={table.state.pageSize}
      onPageChange={(_, page) => table.gotoPage(page)}
      onRowsPerPageChange={onRowsPerPageChange}
      showFirstButton={table.rows.length / table.state.pageSize > 2}
      showLastButton={table.rows.length / table.state.pageSize > 2}
      {...paginationProps}
    />
  );
};

export default Pagination;
