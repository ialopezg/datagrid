import {
  Collapse,
  Divider as MuiDivider,
  styled,
  TableSortLabel, Tooltip,
} from '@mui/material';
import MuiTableCell from '@mui/material/TableCell';
import React, { FC } from 'react';

import { DataGridHeaderGroup } from '../DataGrid';
import { useDataGrid } from '../providers';
import FilterTextField from '../inputs/FilterTextField';
import ColumnActionsAction from '../actions/ColumnActionsAction';

export const StyledHeaderCell = styled(MuiTableCell, {
  shouldForwardProp: (prop: PropertyKey) =>
    prop !== 'densePadding' && prop !== 'enableColumnResizing',
})<{ densePadding?: boolean; enableColumnResizing?: boolean }>(
  ({ densePadding, enableColumnResizing }) => ({
    fontWeight: 'bold',
    height: '100%',
    padding: densePadding ? '0.5rem' : '1rem',
    paddingTop: densePadding ? '0.75rem' : '1.25rem',
    transition: `all ${enableColumnResizing ? '10ms' : '0.2s'} ease-in-out`,
    verticalAlign: 'text-top',
  }),
);

const TableCellWrapper = styled('div')({
  alignContent: 'space-between',
  display: 'grid',
  height: '100%',
});

const TableCellTopContent = styled('div')({
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
});

const CellFlexItem = styled('span')({
  alignItems: 'center',
  display: 'flex',
  flexWrap: 'nowrap',
});

const Divider = styled(MuiDivider)({
  borderRadius: '2px',
  borderRightWidth: '2px',
  maxHeight: '2rem',
});

interface HeaderCellProps {
  column: DataGridHeaderGroup;
}

export const HeaderCell: FC<HeaderCellProps> = ({ column }) => {
  const {
    densePadding,
    disableColumnActions,
    disableFilters,
    enableColumnResizing,
    headerCellProps: defaultCellProps,
    localization,
    showFilters,
    table,
  } = useDataGrid();

  const baseHeaderCellProps =
    defaultCellProps instanceof Function
      ? defaultCellProps(column)
      : defaultCellProps;
  const columnHeaderCellProps =
    column.headerCellProps instanceof Function
      ? column.headerCellProps(column)
      : column.headerCellProps;
  const headerCellProps = {
    ...baseHeaderCellProps,
    ...columnHeaderCellProps,
    ...column.getHeaderProps(),
    style: {
      padding: densePadding ? '0.5rem' : '1rem',
      transition: `all ${enableColumnResizing ? '10ms' : '0.2s'} ease-in-out`,
      ...column.getHeaderProps().style,
      ...(columnHeaderCellProps?.style ?? {}),
      ...(baseHeaderCellProps?.style ?? {}),
    },
  };

  const isParent = (column?.columns?.length ?? 0) > 0;

  const tooltipTitle = column.isSorted
    ? column.isSortedDesc
      ? localization.clearSorting
      : localization.sortByColumnDescending?.replace(
          '{column}',
          String(column.Header),
        )
    : localization.sortByColumnAscending?.replace(
        '{column}',
        String(column.Header),
      );

  return (
    <StyledHeaderCell
      align={isParent ? 'center' : 'left'}
      densePadding={densePadding}
      enableColumnResizing={enableColumnResizing}
      {...headerCellProps}
    >
      <TableCellWrapper>
        <TableCellTopContent
          style={{ justifyContent: isParent ? 'center' : undefined }}
        >
          <CellFlexItem {...column.getSortByToggleProps()} title={undefined}>
            {column.render('Header')}
            {!isParent && column.canSort && (
              <Tooltip arrow title={tooltipTitle}>
                <TableSortLabel
                  active={column.isSorted}
                  aria-label={tooltipTitle}
                  direction={column.isSortedDesc ? 'desc' : 'asc'}
                />
              </Tooltip>
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
        </TableCellTopContent>
        {!disableFilters && column.canFilter && (
          <Collapse in={showFilters}>
            <FilterTextField column={column} />
          </Collapse>
        )}
      </TableCellWrapper>
    </StyledHeaderCell>
  );
};

export default HeaderCell;
