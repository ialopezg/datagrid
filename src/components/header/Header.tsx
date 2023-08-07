import React, { FC } from 'react';
import { TableHead } from '@mui/material';

import { useDataGrid } from '../providers';
import HeaderRow from './HeaderRow';

interface HeaderProp {}

export const Header: FC<HeaderProp> = () => {
  const { headerProps: defaultHeaderProps, table } = useDataGrid();

  const headerProps =
    defaultHeaderProps instanceof Function
      ? defaultHeaderProps(table)
      : defaultHeaderProps;

  return (
    <TableHead {...headerProps}>
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
