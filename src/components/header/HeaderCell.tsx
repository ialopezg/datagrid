import { styled, TableSortLabel } from '@mui/material';
import MuiTableCell from '@mui/material/TableCell';
import { HeaderGroup } from 'react-table';
import React, { FC } from 'react';

import { useDataGrid } from '../providers';
import { FilterTextField } from '../inputs';
import ColumnActionsAction from '../actions/ColumnActionsAction';

const TableCell = styled(MuiTableCell)({
  fontWeight: 'bold',
});

const TableCellContent = styled('div')({
  display: 'grid',
});

const TableCellText = styled('div', {
  shouldForwardProp: (prop: PropertyKey) => prop !== 'isLastColumn',
})<{ isLastColumn?: boolean }>(({ theme, isLastColumn }) => ({
  borderRight: !isLastColumn ? `solid 2px ${theme.palette.divider}` : undefined,
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
}));

interface HeaderCellProps {
  column: HeaderGroup;
  index: number;
}

export const HeaderCell: FC<HeaderCellProps> = ({ column, index }) => {
  const { enableFiltering, table, CustomHeaderCellComponent } = useDataGrid();

  if (CustomHeaderCellComponent) {
    return <>{CustomHeaderCellComponent(column, table)}</>;
  }

  const isParent = (column?.columns?.length ?? 0) > 0;
  const isLastColumn =
    (!isParent && index === table.visibleColumns.length - 1) ||
    (isParent && index === column.headers.length - 1);

  return (
    <TableCell
      align={isParent ? 'center' : 'left'}
      variant='head'
      {...column.getHeaderProps(column.getSortByToggleProps())}
    >
      <TableCellContent>
        <TableCellText isLastColumn={isLastColumn}>
          <span {...column.getSortByToggleProps()}>
            {column.render('Header')}
            {!isParent && column.canSort && (
              <TableSortLabel
                active={column.isSorted}
                direction={column.isSortedDesc ? 'desc' : 'asc'}
              />
            )}
          </span>
          {!isParent && <ColumnActionsAction column={column} />}
        </TableCellText>
        {enableFiltering && column.canFilter && (
          <FilterTextField column={column} />
        )}
      </TableCellContent>
    </TableCell>
  );
};

export default HeaderCell;
