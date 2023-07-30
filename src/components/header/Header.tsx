import React, { FC } from 'react';
import { TableHead } from '@mui/material';

import HeaderRow from './HeaderRow';
import { useDataGrid } from '../providers';
import Pagination from '../toolbar/Pagination';

interface HeaderProp {}

export const Header: FC<HeaderProp> = () => {
  const { enablePagination, headerProps, paginationPosition, table } =
    useDataGrid();

  return (
    <TableHead {...headerProps}>
      {enablePagination &&
        ['both', 'top'].includes(String(paginationPosition)) && <Pagination />}

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
