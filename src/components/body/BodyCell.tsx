import { TableCell, styled } from '@mui/material';
import { Cell } from 'react-table';
import React, { FC } from 'react';

import { useDataGrid } from '../providers';
import EditCellTextField from '../inputs/EditCellTextField';

export const StyledBodyCell = styled(TableCell, {
  shouldForwardProp: (prop) => prop !== 'densePadding',
})<{ densePadding?: boolean }>(({ densePadding }) => ({
  padding: densePadding ? '0.5rem' : '1rem',
  transition: 'all 0.2s ease-in-out',
  whiteSpace: densePadding ? 'nowrap' : 'normal',
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
    defaultBodyCellProps instanceof Function
      ? defaultBodyCellProps(cell)
      : defaultBodyCellProps;
  const columnBodyCellProps =
    cell.column.bodyCellProps instanceof Function
      ? cell.column.bodyCellProps(cell)
      : cell.column.bodyCellProps;
  const cellProps = {
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
    <StyledBodyCell
      densePadding={densePadding}
      onClick={(e) => {
        onCellClick?.(e, cell);
      }}
      variant="body"
      {...cellProps}
    >
      {itemForUpdate?.id === cell.row.id ? (
        <EditCellTextField cell={cell} />
      ) : cell.isPlaceholder ? null : cell.isAggregated ? (
        cell.render('Aggregated')
      ) : cell.isGrouped ? (
        <span>
          {cell.render('Cell')} ({cell.row.subRows.length})
        </span>
      ) : (
        cell.render('Cell')
      )}
    </StyledBodyCell>
  );
};

export default BodyCell;
