import { TableCell } from '@mui/material';
import { HeaderGroup } from 'react-table';
import React, { FC } from 'react';

interface HeaderCellProps {
  column: HeaderGroup;
}

export const HeaderCell: FC<HeaderCellProps> = ({ column }) => (
  <TableCell variant="head" {...column.getHeaderProps()}>
    {column.render('Header')}
  </TableCell>
);

export default HeaderCell;
