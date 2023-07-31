import { styled, TableSortLabel } from '@mui/material';
import MuiTableCell from '@mui/material/TableCell';
import { HeaderGroup } from 'react-table';
import React, { FC } from 'react';
import { useDataGrid } from '../providers';
import { FilterTextField } from '../inputs';

const TableCell = styled(MuiTableCell)({
  fontWeight: 'bold',
});

const TableCellContent = styled('div')({
  display: 'grid',
});

const TableCellText = styled('div')(({ theme }) => ({
  borderRight: `solid 2px ${theme.palette.divider}`,
  width: '100%',
}));

interface HeaderCellProps {
  column: HeaderGroup;
}

export const HeaderCell: FC<HeaderCellProps> = ({ column }) => {
  const { enableFiltering, table, CustomHeaderCellComponent } = useDataGrid();

  if (CustomHeaderCellComponent) {
    return <>{CustomHeaderCellComponent(column, table)}</>;
  }

  const isParent = (column?.columns?.length ?? 0) > 0;

  return (
    <TableCell
      align={isParent ? 'center' : 'left'}
      variant="head"
      {...column.getHeaderProps(column.getSortByToggleProps())}
    >
      <TableCellContent>
        {!isParent && column.canSort ? (
          <TableCellText>
            <TableSortLabel
              active={column.isSorted}
              direction={column.isSortedDesc ? 'desc' : 'asc'}
            >
              {column.render('Header')}
            </TableSortLabel>
          </TableCellText>
        ) : (
          <TableCellText>{column.render('Header')}</TableCellText>
        )}
        {enableFiltering && column.canFilter && (
          <FilterTextField column={column} />
        )}
      </TableCellContent>
    </TableCell>
  );
};

export default HeaderCell;
