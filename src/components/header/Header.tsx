import React, { FC } from 'react';
import { LinearProgress, TableHead } from '@mui/material';

import { useDataGrid } from '../providers';
import Pagination from '../toolbar/Pagination';
import HeaderRow from './HeaderRow';

interface HeaderProp {}

export const Header: FC<HeaderProp> = () => {
  const {
    enablePagination,
    headerProps,
    isReloading,
    paginationPosition,
    table,
    CustomHeaderComponent,
  } = useDataGrid();

  if (CustomHeaderComponent) {
    return <>{CustomHeaderComponent(table)}</>;
  }

  return (
    <TableHead {...headerProps}>
      {isReloading && <LinearProgress />}
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
