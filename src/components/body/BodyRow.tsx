import MuiTableRow from '@mui/material/TableRow';
import { alpha, styled } from '@mui/material';
import { Row } from 'react-table';
import React, { FC } from 'react';

import BodyCell, { StyledBodyCell } from './BodyCell';
import { useDataGrid } from '../providers';
import DetailPanel from './DetailPanel';
import ExpandRowAction from '../actions/ExpandRowAction';
import SelectRowAction from '../actions/SelectRowAction';
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
  row: Row;
}

export const BodyRow: FC<BodyRowProps> = ({ row }) => {
  const {
    bodyRowProps: defaultBodyRowProps,
    detailPanel,
    enableRowActions,
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

        {enableRowActions && rowActionsColumn === 'first' && (
          <RowActionsAction row={row} />
        )}

        {(hasExpandableRows || detailPanel) && <ExpandRowAction row={row} />}

        {enableSelection && <SelectRowAction row={row} />}

        {row.cells.map((cell) => (
          <BodyCell cell={cell} key={cell.getCellProps().key} />
        ))}

        {enableRowActions && rowActionsColumn === 'last' && (
          <RowActionsAction row={row} />
        )}
      </TableRow>

      {detailPanel && <DetailPanel row={row} />}
    </>
  );
};

export default BodyRow;
