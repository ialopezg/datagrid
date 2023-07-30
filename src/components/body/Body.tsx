import { TableBody } from '@mui/material';
import React, { FC } from 'react';

import BodyRow from './BodyRow';
import { useDataGrid } from "../providers";

interface BodyProps {}

export const Body: FC<BodyProps> = () => {
  const { enablePagination, table } = useDataGrid();
  const rows = enablePagination ? table.page : table.rows;

  return (
    <TableBody {...table.getTableBodyProps()}>
      {rows.map((row) => {
        table.prepareRow(row);

        return <BodyRow key={row.getRowProps().key} row={row} />;
      })}
    </TableBody>
  );
}

export default Body;
