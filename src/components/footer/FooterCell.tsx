import { TableCell } from '@mui/material';
import React, { FC } from 'react';
import { HeaderGroup } from 'react-table';

interface FooterCellProps {
  column: HeaderGroup;
}

export const FooterCell: FC<FooterCellProps> = ({ column }) => {
  const isParent = (column?.columns?.length ?? 0) > 0;

  return (
    <TableCell
      align={isParent ? 'center' : 'left'}
      variant="head"
      {...column.getFooterProps()}
    >
      {column.render('Footer')}
    </TableCell>
  );
};

export default FooterCell;
