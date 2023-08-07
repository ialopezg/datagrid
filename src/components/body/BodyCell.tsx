import { TableCell } from '@mui/material';
import { Cell } from 'react-table';
import React, { FC } from 'react';

import { useDataGrid } from '../providers';

interface BodyCellProps {
  cell: Cell;
}

export const BodyCell: FC<BodyCellProps> = ({ cell }) => {
  const { bodyCellProps: defaultBodyCellProps, onCellClick } = useDataGrid();

  const bodyCellProps =
    defaultBodyCellProps instanceof Function
      ? defaultBodyCellProps(cell)
      : defaultBodyCellProps;
  const cellProps = {
    ...bodyCellProps,
    ...cell.getCellProps(),
    style: {
      ...cell.getCellProps().style,
      ...(bodyCellProps?.style ?? {}),
    },
  };

  return (
    <TableCell
      onClick={(e) => {
        onCellClick?.(e, cell);
      }}
      variant="body"
      {...cellProps}
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
