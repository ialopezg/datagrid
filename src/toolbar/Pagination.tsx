import { TablePagination } from '@mui/material';
import React, { ChangeEvent, FC } from 'react';

import { useDataGrid } from '../providers';

interface PaginationProps {}

export const Pagination: FC<PaginationProps> = () => {
  const { paginationProps, table } = useDataGrid();

  const tablePaginationProps =
    paginationProps instanceof Function
      ? paginationProps(table)
      : paginationProps;

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
      style={{ padding: 0, position: 'relative', zIndex: 2 }}
      SelectProps={{ style: { margin: '0 1rem 0 1ch' } }}
      {...tablePaginationProps}
      sx={{
        m: '0 0.5rem',
        position: 'relative',
        zIndex: 2,
        ...tablePaginationProps?.sx,
      }}
    />
  );
};

export default Pagination;
