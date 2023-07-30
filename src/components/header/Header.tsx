import React, { FC } from 'react';
import { TableHead } from '@mui/material';

import HeaderRow from './HeaderRow';
import { useDataGrid } from '../providers';
import Pagination from '../Pagination';

interface HeaderProp {}

export const Header: FC<HeaderProp> = () => {
  const { headerProps, options, table } = useDataGrid();

  return (
    <TableHead {...headerProps}>
      {options?.showPagination === true ||
        (['both', 'top'].includes(String(options?.showPagination)) && (
          <Pagination />
        ))}

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
