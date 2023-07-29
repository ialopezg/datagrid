import { TablePagination, TableRow } from '@mui/material';
import React, { ChangeEvent, FC, useState } from 'react';

import { useDataGrid } from './providers';

interface PaginationProps {}

export const Pagination: FC<PaginationProps> = () => {
  const { table } = useDataGrid();

  // ** State
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);

  const onRowsPerPageChange = (e: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+e.target.value);
    setPage(0);
  };

  return (
    <TableRow>
      <TablePagination
        count={table.rows.length}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={(_, page) => setPage(page)}
        onRowsPerPageChange={onRowsPerPageChange}
      />
    </TableRow>
  );
};

export default Pagination;
