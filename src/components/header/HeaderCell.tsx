import { styled, TableSortLabel } from '@mui/material';
import MuiTableCell from '@mui/material/TableCell';
import { HeaderGroup } from 'react-table';
import React, { FC } from 'react';

const TableCell = styled(MuiTableCell)({
  fontWeight: 'bold',
});

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
      {!isParent ? (
        <TableSortLabel
          active={column.isSorted}
          direction={column.isSortedDesc ? 'desc' : 'asc'}
        >
          {column.render('Header')}
        </TableSortLabel>
      ) : (
        column.render('Header')
      )}
    </TableCell>
  );
};

export default HeaderCell;
