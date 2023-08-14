import MuiTableRow from '@mui/material/TableRow';
import { alpha, styled } from '@mui/material';
import React, { FC } from 'react';

import BodyCell, { StyledBodyCell } from './BodyCell';
import DetailPanel from './DetailPanel';
import { DataGridCell, DataGridRow } from '../DataGrid';
import { useDataGrid } from '../providers';
import ExpandRowAction from '../actions/ExpandRowAction';
import ToggleSelectRowAction from '../actions/ToggleSelectRowAction';
import RowActionsAction from '../actions/RowActionsAction';

const TableRow = styled(MuiTableRow, {
  shouldForwardProp: (prop) => prop !== 'isSelected',
})<{
  isSelected?: boolean;
}>(({ isSelected, theme }) => ({
  backgroundColor: isSelected
    ? alpha(theme.palette.primary.light, 0.1)
    : 'transparent',
}));

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
  } = useDataGrid();

  const rowProps =
    defaultBodyRowProps instanceof Function
      ? defaultBodyRowProps(row)
      : defaultBodyRowProps;
  const bodyRowProps = {
    ...rowProps,
    ...row.getRowProps(),
    style: {
      ...row.getRowProps().style,
      ...(rowProps?.style ?? {}),
    },
  };

  return (
    <>
      <TableRow
        hover
        onClick={(e) => onRowClick?.(e, row)}
        isSelected={row.isSelected}
        {...bodyRowProps}
      >
        {showRowNumbers && <StyledBodyCell>{row.index + 1}</StyledBodyCell>}

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

      {detailPanel && <DetailPanel row={row} />}
    </>
  );
};

export default BodyRow;
