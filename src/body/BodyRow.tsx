import { TableCell, TableRow } from '@mui/material';
import React, { FC } from 'react';

import BodyCell, { tableBodyCellStyles } from './BodyCell';
import DetailPanel from './DetailPanel';
import { DataGridCell, DataGridRow } from '../DataGrid';
import { useDataGrid } from '../providers';
import ExpandRowAction from '../actions/ExpandRowAction';
import ToggleSelectRowAction from '../actions/ToggleSelectRowAction';
import RowActionsAction from '../actions/RowActionsAction';

interface BodyRowProps {
  row: DataGridRow;
}

export const BodyRow: FC<BodyRowProps> = ({ row }) => {
  const {
    bodyRowProps: defaultBodyRowProps,
    detailPanel,
    enableRowActions,
    enableRowEditing,
    enableSelection,
    hasExpandableRows,
    onRowClick,
    rowActionsColumn,
    showRowNumbers,
    table: {
      state: { densePadding },
    },
  } = useDataGrid();

  const rowProps =
    defaultBodyRowProps instanceof Function
      ? defaultBodyRowProps(row)
      : defaultBodyRowProps;
  const tableRowProps = {
    ...rowProps,
    ...row.getRowProps(),
    style: {
      ...row.getRowProps().style,
      ...rowProps?.style,
    },
  };

  return (
    <>
      <TableRow
        hover
        onClick={(e) => onRowClick?.(e, row)}
        selected={row.isSelected}
        {...tableRowProps}
      >
        {showRowNumbers && (
          <TableCell sx={{ ...tableBodyCellStyles(densePadding) }}>
            {row.index + 1}
          </TableCell>
        )}

        {(enableRowActions || enableRowEditing) &&
          rowActionsColumn === 'first' && <RowActionsAction row={row} />}

        {(hasExpandableRows || detailPanel) && <ExpandRowAction row={row} />}

        {enableSelection && <ToggleSelectRowAction row={row} />}

        {row.cells.map((cell: DataGridCell) => (
          <BodyCell cell={cell} key={cell.getCellProps().key} />
        ))}

        {(enableRowActions || enableRowEditing) &&
          rowActionsColumn === 'last' && <RowActionsAction row={row} />}
      </TableRow>

      {detailPanel && !row.isGrouped && <DetailPanel row={row} />}
    </>
  );
};

export default BodyRow;
