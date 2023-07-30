import { styled, TableSortLabel } from '@mui/material';
import MuiTableCell from '@mui/material/TableCell';
import { HeaderGroup } from 'react-table';
import React, { FC } from 'react';
import { useDataGrid } from '../providers';
import { FilterTextField } from '../inputs';

const TableCell = styled(MuiTableCell)({
  fontWeight: 'bold',
});

interface HeaderCellProps {
  column: HeaderGroup;
}

export const HeaderCell: FC<HeaderCellProps> = ({ column }) => {
  const { enableFiltering } = useDataGrid();

  const isParent = (column?.columns?.length ?? 0) > 0;

  return (
    <TableCell
      align={isParent ? 'center' : 'left'}
      variant="head"
      {...column.getHeaderProps(column.getSortByToggleProps())}
    >
      {!isParent && column.canSort ? (
        <TableSortLabel
          active={column.isSorted}
          direction={column.isSortedDesc ? 'desc' : 'asc'}
        >
          {column.render('Header')}
        </TableSortLabel>
      ) : (
        column.render('Header')
      )}
      {enableFiltering && column.canFilter && (
        <FilterTextField column={column} />
      )}
    </TableCell>
  );
};

export default HeaderCell;
