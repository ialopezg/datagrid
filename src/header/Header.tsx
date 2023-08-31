import React, { FC } from 'react';
import { TableHead } from '@mui/material';
import { DataGridHeaderGroup } from '../DataGrid';

import { useDataGrid } from '../providers';
import HeaderRow from './HeaderRow';

interface HeaderProp {}

export const Header: FC<HeaderProp> = () => {
  const { headerProps, table } = useDataGrid();

  return (
    <TableHead {...headerProps}>
      {table.headerGroups.map((headerGroup: DataGridHeaderGroup) => (
        <HeaderRow
          headerGroup={headerGroup}
          key={headerGroup.getHeaderGroupProps().key}
        />
      ))}
    </TableHead>
  );
};

export default Header;
