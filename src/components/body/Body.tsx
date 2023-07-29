import { TableBody } from '@mui/material';
import { TableInstance } from 'react-table';
import React, { FC } from 'react';

import BodyRow from './BodyRow';

interface BodyProps {
  table: TableInstance<object>;
}

export const Body: FC<BodyProps> = ({ table }) => (
  <TableBody {...table.getTableBodyProps()}>
    {table.rows.map((row) => {
      table.prepareRow(row);

      return <BodyRow key={row.getRowProps().key} row={row} />;
    })}
  </TableBody>
);

export default Body;
