import { TableRow } from '@mui/material';
import { Row } from 'react-table';
import React, { FC } from 'react';
import BodyCell from './BodyCell';

interface BodyRowProps {
  row: Row<object>;
}

export const BodyRow: FC<BodyRowProps> = ({ row }) => (
  <TableRow {...row.getRowProps()}>
    {row.cells.map((cell) => (
      <BodyCell cell={cell} key={cell.getCellProps().key} />
    ))}
  </TableRow>
);

export default BodyRow;
