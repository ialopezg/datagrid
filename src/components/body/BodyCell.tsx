import MuiTableCell from '@mui/material/TableCell';
import { Cell, TableCellProps } from 'react-table';
import React, { FC } from 'react';

import { useDataGrid } from '../providers';
import { BodyCellEditTextField } from '../inputs';
import { styled } from '@mui/material';

const TableCell = styled(MuiTableCell, {
  shouldForwardProp: (prop: PropertyKey) => prop !== 'densePadding',
})<{ densePadding?: boolean }>(({ densePadding }) => ({
  padding: densePadding ? '0.5rem' : '1rem',
  transition: 'all 0.2s ease-in-out',
}));

interface BodyCellProps {
  cell: Cell;
}

export const BodyCell: FC<BodyCellProps> = ({ cell }) => {
  const {
    bodyCellProps: defaultBodyCellProps,
    densePadding,
    itemForUpdate,
    onCellClick,
  } = useDataGrid();

  const bodyCellProps =
    (defaultBodyCellProps instanceof Function
      ? defaultBodyCellProps(cell)
      : defaultBodyCellProps) as TableCellProps;
  const columnBodyCellProps = (cell.column.bodyCellProps instanceof Function
    ? cell.column.bodyCellProps(cell)
    : cell.column.bodyCellProps) as TableCellProps;
  const cellProps: TableCellProps = {
    ...bodyCellProps,
    ...columnBodyCellProps,
    ...cell.getCellProps(),
    style: {
      ...cell.getCellProps().style,
      ...(bodyCellProps?.style ?? {}),
      ...(columnBodyCellProps?.style ?? {}),
    },
  };

  return (
    <TableCell
      densePadding={densePadding}
      onClick={(e) => {
        onCellClick?.(e, cell);
      }}
      variant='body'
      {...cellProps}
    >
      {itemForUpdate?.id === cell.row.id ? (
        <BodyCellEditTextField cell={cell} />
      ) : cell.isPlaceholder ? null : cell.isAggregated ? (
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
