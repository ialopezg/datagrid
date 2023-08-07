import { TableCell } from '@mui/material';
import { Cell } from 'react-table';
import React, { FC } from 'react';

import { useDataGrid } from '../providers';

interface BodyCellProps {
  cell: Cell;
}

export const BodyCell: FC<BodyCellProps> = ({ cell }) => {
  const { bodyCellProps: defaultBodyCellProps, densePadding, onCellClick } = useDataGrid();

  const bodyCellProps =
    defaultBodyCellProps instanceof Function
      ? defaultBodyCellProps(cell)
      : defaultBodyCellProps;
  const cellProps = {
    ...bodyCellProps,
    ...cell.getCellProps(),
    style: {
      padding: `${densePadding ? 0.5 : 1}rem`,
      transaction: 'all 0.2s ease-in-out',
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
