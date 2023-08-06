import { Collapse, Divider, styled, TableSortLabel } from '@mui/material';
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

const TableCellText = styled('div')({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
});

interface HeaderCellProps {
  column: HeaderGroup;
  index: number;
}

export const HeaderCell: FC<HeaderCellProps> = ({ column, index }) => {
  const {
    enableColumnActions,
    enableColumnResizing,
    enableFiltering,
    showFiltersInColumnHeader,
    table,
    CustomHeaderCellComponent,
  } = useDataGrid();

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
      variant="head"
      {...column.getHeaderProps(column.getSortByToggleProps())}
    >
      <TableCellContent>
        <TableCellText
          style={{ justifyContent: isParent ? 'center' : undefined }}
        >
          <span {...column.getSortByToggleProps()}>
            {column.render('Header')}
            {!isParent && column.canSort && (
              <TableSortLabel
                active={column.isSorted}
                direction={column.isSortedDesc ? 'desc' : 'asc'}
              />
            )}
          </span>
          <span style={{ display: 'flex' }}>
            {enableColumnActions && !isParent && (
              <ColumnActionsAction column={column} />
            )}
            {enableColumnResizing && !isLastColumn && (
              <Divider
                flexItem
                onDoubleClick={() => table.resetResizing()}
                orientation="vertical"
                style={{ borderRightWidth: '2px', borderRadius: '2px' }}
                {...column.getResizerProps()}
              />
            )}
          </span>
        </TableCellText>
        {enableFiltering && column.canFilter && (
          <Collapse in={showFiltersInColumnHeader}>
            <FilterTextField column={column} />
          </Collapse>
        )}
      </TableCellContent>
    </TableCell>
  );
};

export default HeaderCell;
