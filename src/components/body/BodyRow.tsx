import { alpha, TableRow, useTheme } from '@mui/material';
import { Row } from 'react-table';
import React, { FC } from 'react';

import BodyCell from './BodyCell';
import { useDataGrid } from '../providers';
import DetailPanel from './DetailPanel';
import ExpandRowAction from '../actions/ExpandRowAction';
import SelectRowAction from '../actions/SelectRowAction';

interface BodyRowProps {
  row: Row;
}

export const BodyRow: FC<BodyRowProps> = ({ row }) => {
  const {
    bodyRowProps: defaultBodyRowProps,
    detailPanel,
    enableSelection,
    hasExpandableRows,
    onRowClick,
  } = useDataGrid();
  const theme = useTheme();

  const rowProps =
    defaultBodyRowProps instanceof Function
      ? defaultBodyRowProps(row)
      : defaultBodyRowProps;
  const bodyRowProps = {
    ...rowProps,
    ...row.getRowProps(),
    style: {
      backgroundColor: row.isSelected
        ? alpha(theme.palette.primary.light, 0.1)
        : 'transparent',
      ...row.getRowProps().style,
      ...(rowProps?.style ?? {}),
    },
  };

  return (
    <>
      <TableRow hover onClick={(e) => onRowClick?.(e, row)} {...bodyRowProps}>
        {(hasExpandableRows || detailPanel) && <ExpandRowAction row={row} />}

        {enableSelection && <SelectRowAction row={row} />}

        {row.cells.map((cell) => (
          <BodyCell cell={cell} key={cell.getCellProps().key} />
        ))}
      </TableRow>

      {detailPanel && <DetailPanel row={row} />}
    </>
  );
};

export default BodyRow;
