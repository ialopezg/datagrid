import { TablePagination, TableRow } from '@mui/material';
import React, { ChangeEvent, FC } from 'react';

import { useDataGrid } from '../providers';

interface PaginationProps {}

export const Pagination: FC<PaginationProps> = () => {
  const { CustomPaginationComponent, paginationProps, table } = useDataGrid();

  if (CustomPaginationComponent) {
    return <>{CustomPaginationComponent(table)}</>;
  }

  const onRowsPerPageChange = (e: ChangeEvent<HTMLInputElement>) => {
    table.setPageSize(+e.target.value);
    table.gotoPage(0);
  };

  return (
    <TableRow>
      <TablePagination
        colSpan={table.visibleColumns.length + 10}
        count={table.rows.length}
        page={table.state.pageIndex}
        rowsPerPage={table.state.pageSize}
        onPageChange={(_, page) => table.gotoPage(page)}
        onRowsPerPageChange={onRowsPerPageChange}
        showFirstButton={table.rows.length / table.state.pageSize > 2}
        showLastButton={table.rows.length / table.state.pageSize > 2}
        {...paginationProps}
      />
    </TableRow>
  );
};

export default Pagination;
