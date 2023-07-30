import { TableCell, TableSortLabel } from '@mui/material';
import { HeaderGroup } from 'react-table';
import React, { FC } from 'react';

interface HeaderCellProps {
  column: HeaderGroup;
}

export const HeaderCell: FC<HeaderCellProps> = ({ column }) => {
  const isParent = (column?.columns?.length ?? 0) > 0;

  return (
    <TableCell
      align={isParent ? 'center' : 'left'}
      style={{ fontWeight: 'bold !important' }}
      variant="head"
      {...column.getHeaderProps(column.getSortByToggleProps())}
    >
      <TableSortLabel
        active={column.isSorted}
        direction={column.isSortedDesc ? 'desc' : 'asc'}
      >
        {column.render('Header')}
      </TableSortLabel>
    </TableCell>
  );
};

export default HeaderCell;
