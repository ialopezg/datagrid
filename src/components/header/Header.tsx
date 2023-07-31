import React, { FC } from 'react';
import { TableHead } from '@mui/material';

import { useDataGrid } from '../providers';
import Pagination from '../toolbar/Pagination';
import HeaderRow from './HeaderRow';

interface HeaderProp {}

export const Header: FC<HeaderProp> = () => {
  const {
    enablePagination,
    headerProps,
    paginationPosition,
    table,
    CustomHeaderComponent,
  } = useDataGrid();

  if (CustomHeaderComponent) {
    return <>{CustomHeaderComponent(table)}</>;
  }

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
