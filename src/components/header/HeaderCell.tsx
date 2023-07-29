import MuiTableCell from '@mui/material/TableCell';
import { styled } from '@mui/material';
import { HeaderGroup } from 'react-table';
import React, { FC } from 'react';

const TableCell = styled(MuiTableCell)({
  fontWeight: 'bold',
  borderRight: '1px solid #ccc',
});

interface HeaderCellProps {
  column: HeaderGroup;
}

export const HeaderCell: FC<HeaderCellProps> = ({ column }) => {
  const isParent = (column?.columns?.length ?? 0) > 0;

  return (
    <TableCell
      align={isParent ? 'center' : 'left'}
      variant="head"
      {...column.getHeaderProps()}
    >
      {column.render('Header')}
    </TableCell>
  );
};

export default HeaderCell;
