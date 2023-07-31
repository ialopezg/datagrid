import { TableCell } from '@mui/material';
import { Cell } from 'react-table';
import React, { FC } from 'react';

interface BodyCellProps {
  cell: Cell;
}

export const BodyCell: FC<BodyCellProps> = ({ cell }) => (
  <TableCell variant="body" {...cell.getCellProps()}>
    {cell.render('Cell')}
  </TableCell>
);

export default BodyCell;
