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
    isFetching,
    paginationPosition,
    table,
  } = useDataGrid();

  return (
    <TableHead {...headerProps}>
      {isFetching && <LinearProgress />}
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
