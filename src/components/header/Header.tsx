import React, { FC } from 'react';
import { TableHead } from '@mui/material';

import HeaderRow from './HeaderRow';
import { useDataGrid } from '../providers';
import Pagination from '../toolbar/Pagination';

interface HeaderProp {}

export const Header: FC<HeaderProp> = () => {
  const { headerProps, options, table } = useDataGrid();

  return (
    <TableHead {...headerProps}>
      {['both', 'top'].includes(String(options?.enablePagination)) && (
        <Pagination />
      )}

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
