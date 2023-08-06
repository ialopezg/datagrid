import MuiTableCell from '@mui/material/TableCell';
import React, { FC } from 'react';
import { HeaderGroup } from 'react-table';
import { styled } from '@mui/material';
import { useDataGrid } from '../providers';

const TableCell = styled(MuiTableCell)({
  fontWeight: 'bold',
});

interface FooterCellProps {
  column: HeaderGroup;
}

export const FooterCell: FC<FooterCellProps> = ({ column }) => {
  const { table, customFooterCellComponent } = useDataGrid();
  const isParent = (column?.columns?.length ?? 0) > 0;

  if (customFooterCellComponent) {
    return <>{customFooterCellComponent(column, table)}</>;
  }

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
