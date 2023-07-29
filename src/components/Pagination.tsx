import { TablePagination, TableRow } from '@mui/material';
import React, { ChangeEvent, FC } from 'react';

import { useDataGrid } from './providers';

interface PaginationProps {}

export const Pagination: FC<PaginationProps> = () => {
  const { table, paginationProps } = useDataGrid();

  const onRowsPerPageChange = (e: ChangeEvent<HTMLInputElement>) => {
    table.setPageSize(+e.target.value);
    table.gotoPage(0);
  };

  return (
    <TableRow>
      <TablePagination
        count={table.rows.length}
        page={table.state.pageIndex}
        rowsPerPage={table.state.pageSize}
        onPageChange={(_, page) => table.gotoPage(page)}
        onRowsPerPageChange={onRowsPerPageChange}
        {...paginationProps}
      />
    </TableRow>
  );
};

export default Pagination;
