import { TableCell } from '@mui/material';
import { Cell } from 'react-table';
import React, { FC } from 'react';

import { useDataGrid } from '../providers';

interface BodyCellProps {
  cell: Cell;
}

export const BodyCell: FC<BodyCellProps> = ({ cell }) => {
  const { onCellClick, table, customBodyCellComponent } = useDataGrid();

  if (customBodyCellComponent) {
    return <>{customBodyCellComponent(cell, table)}</>;
  }

  return (
    <TableCell
      onClick={(e) => {
        onCellClick?.(e, cell);
      }}
      variant="body"
      {...cell.getCellProps()}
    >
      {cell.isPlaceholder ? null : cell.isAggregated ? (
        cell.render('Aggregated')
      ) : cell.isGrouped ? (
        <span>
          {cell.render('Cell')} ({cell.row.subRows.length})
        </span>
      ) : (
        cell.render('Cell')
      )}
    </TableCell>
  );
};

export default BodyCell;
