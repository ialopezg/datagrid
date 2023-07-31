import { TableCell } from '@mui/material';
import { Cell } from 'react-table';
import React, { FC } from 'react';

import { useDataGrid } from '../providers';

interface BodyCellProps {
  cell: Cell;
}

export const BodyCell: FC<BodyCellProps> = ({ cell }) => {
  const { table, CustomBodyCellComponent } = useDataGrid();

  if (CustomBodyCellComponent) {
    return <>{CustomBodyCellComponent(cell, table)}</>;
  }

  return (
    <TableCell variant="body" {...cell.getCellProps()}>
      {cell.render('Cell')}
    </TableCell>
  );
};

export default BodyCell;
