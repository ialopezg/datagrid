import { TableCell, styled } from '@mui/material';
import React, { FC } from 'react';

import { DataGridCell } from '../DataGrid';
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
  cell: DataGridCell;
}

export const BodyCell: FC<BodyCellProps> = ({ cell }) => {
  const {
    bodyCellProps,
    densePadding,
    itemForUpdate,
    onCellClick,
  } = useDataGrid();

  const tableBodyCellProps =
    bodyCellProps instanceof Function
      ? bodyCellProps(cell)
      : bodyCellProps;
  const columnBodyCellProps =
    cell.column.bodyCellProps instanceof Function
      ? cell.column.bodyCellProps(cell)
      : cell.column.bodyCellProps;
  const tableCellProps = {
    ...tableBodyCellProps,
    ...columnBodyCellProps,
    ...cell.getCellProps(),
    style: {
      ...cell.getCellProps().style,
      ...(tableBodyCellProps?.style ?? {}),
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
      {...tableCellProps}
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
