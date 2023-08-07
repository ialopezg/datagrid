import {
  Collapse,
  Divider as MuiDivider,
  styled,
  TableSortLabel,
} from '@mui/material';
import MuiTableCell from '@mui/material/TableCell';
import { HeaderGroup } from 'react-table';
import React, { FC } from 'react';

import { useDataGrid } from '../providers';
import FilterTextField from '../inputs/FilterTextField';
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
  alignItems: 'flex-start',
  justifyContent: 'space-between',
});

const CellFlexItem = styled('span')({
  display: 'flex',
  flexWrap: 'nowrap',
});

const Divider = styled(MuiDivider)({
  borderRadius: '2px',
  borderRightWidth: '2px',
  maxHeight: '2rem',
});

interface HeaderCellProps {
  column: HeaderGroup;
}

export const HeaderCell: FC<HeaderCellProps> = ({ column }) => {
  const {
    disableColumnActions,
    disableFilters,
    enableColumnResizing,
    headerCellProps: defaultCellProps,
    showFilters,
    table,
  } = useDataGrid();

  const cellProps =
    defaultCellProps instanceof Function
      ? defaultCellProps(column)
      : defaultCellProps;
  const headerCellProps = {
    ...cellProps,
    ...column.getHeaderProps(),
    style: {
      ...column.getHeaderProps().style,
      ...(cellProps?.style ?? {}),
    },
  };

  const isParent = (column?.columns?.length ?? 0) > 0;

  return (
    <TableCell
      align={isParent ? 'center' : 'left'}
      variant="head"
      {...headerCellProps}
    >
      <TableCellContent>
        <TableCellText
          style={{ justifyContent: isParent ? 'center' : undefined }}
        >
          <CellFlexItem {...column.getSortByToggleProps()}>
            {column.render('Header')}
            {!isParent && column.canSort && (
              <TableSortLabel
                active={column.isSorted}
                direction={column.isSortedDesc ? 'desc' : 'asc'}
              />
            )}
          </CellFlexItem>
          <CellFlexItem>
            {!disableColumnActions && !isParent && (
              <ColumnActionsAction column={column} />
            )}
            {enableColumnResizing && !isParent && (
              <Divider
                flexItem
                onDoubleClick={() => table.resetResizing()}
                orientation="vertical"
                {...column.getResizerProps()}
              />
            )}
          </CellFlexItem>
        </TableCellText>
        {!disableFilters && column.canFilter && (
          <Collapse in={showFilters}>
            <FilterTextField column={column} />
          </Collapse>
        )}
      </TableCellContent>
    </TableCell>
  );
};

export default HeaderCell;
