import React, { FC } from 'react';
import { TableInstance } from 'react-table';
import { TableHead } from '@mui/material';

import HeaderRow from './HeaderRow';

interface HeaderProp {
  table: TableInstance<object>;
}

export const Header: FC<HeaderProp> = ({ table }) => (
  <TableHead>
    {table.headerGroups.map((headerGroup) => (
      <HeaderRow
        headerGroup={headerGroup}
        key={headerGroup.getHeaderGroupProps().key}
      />
    ))}
  </TableHead>
);

export default Header;
