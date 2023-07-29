import React, { FC } from 'react';
import { TableHead } from '@mui/material';

import HeaderRow from './HeaderRow';
import { useDataGrid } from '../providers';

interface HeaderProp {}

export const Header: FC<HeaderProp> = () => {
  const { table } = useDataGrid();

  return (
    <TableHead>
      {table.headerGroups.map((headerGroup) => (
        <HeaderRow
          headerGroup={headerGroup}
          key={headerGroup.getHeaderGroupProps().key}
        />
      ))}
    </TableHead>
  );
};

export default Header;
