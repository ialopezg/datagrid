import { Skeleton, TableCell, TableCellProps } from '@mui/material';
import React, { FC } from 'react';

import { DataGridCell } from '../DataGrid';
import { useDataGrid } from '../providers';
import EditCellTextField from '../inputs/EditCellTextField';

export const tableBodyCellStyles = (densePadding: boolean) => ({
  p: `${densePadding ? '0.5' : '1'}rem`,
  transition: 'all 0.2s ease-in-out',
  whiteSpace: densePadding ? 'nowrap' : 'normal',
});

export const actionBodyStyles = (densePadding: boolean) => ({
  p: densePadding ? '1px' : '0.6rem',
  textAlign: 'center',
  transition: 'all 0.2s ease-in-out',
});

interface BodyCellProps {
  cell: DataGridCell;
}

export const BodyCell: FC<BodyCellProps> = ({ cell }) => {
  const {
    bodyCellProps,
    bodyCellSkeletonProps,
    isLoading,
    onCellClick,
    table: {
      state: { currentEditingRow, densePadding },
    },
  } = useDataGrid();

  const tableBodyCellProps =
    bodyCellProps instanceof Function ? bodyCellProps(cell) : bodyCellProps;
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
      ...tableBodyCellProps?.style,
      ...columnBodyCellProps?.style,
    },
  };

  return (
    <TableCell
      onClick={(e) => {
        onCellClick?.(e, cell);
      }}
      variant="body"
      {...tableCellProps}
      sx={
        {
          ...tableBodyCellStyles(densePadding),
          ...tableCellProps.sx,
        } as TableCellProps['sx']
      }
    >
      {isLoading ? (
        <Skeleton
          animation="wave"
          height={20}
          width={Math.random() * (120 - 60) + 60}
          {...bodyCellSkeletonProps}
        />
      ) : !cell.column.disableEditing &&
        currentEditingRow?.id === cell.row.id ? (
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
    </TableCell>
  );
};

export default BodyCell;
