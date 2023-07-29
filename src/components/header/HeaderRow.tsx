import { TableRow } from '@mui/material';
import React, { FC } from 'react';
import { HeaderGroup } from 'react-table';

import HeaderCell from './HeaderCell';

interface HeaderRowProps {
  headerGroup: HeaderGroup<object>;
}

export const HeaderRow: FC<HeaderRowProps> = ({ headerGroup }) => (
  <TableRow {...headerGroup.getHeaderGroupProps()}>
    {headerGroup.headers.map((column) => (
      <HeaderCell column={column} key={column.getHeaderProps().key} />
    ))}
  </TableRow>
);

export default HeaderRow;
