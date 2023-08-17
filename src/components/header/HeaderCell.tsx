import {
  Box,
  Collapse,
  Divider,
  styled,
  TableCell,
  TableSortLabel,
  Tooltip,
} from '@mui/material';
import MuiTableCell from '@mui/material/TableCell';
import React, { FC } from 'react';

import { DataGridHeaderGroup } from '../DataGrid';
import { useDataGrid } from '../providers';
import FilterTextField from '../inputs/FilterTextField';
import ColumnActionsAction from '../actions/ColumnActionsAction';

export const tableHeaderCellStyles = (
  densePadding: boolean,
  enableColumnResizing?: boolean,
) => ({
  fontWeight: 'bold',
  height: '100%',
  p: densePadding ? '0.5rem' : '1rem',
  pt: densePadding ? '0.75rem' : '1.25rem',
  transition: `all ${enableColumnResizing ? '10ms' : '0.2s'} ease-in-out`,
  verticalAlign: 'text-top',
});

export const StyledHeaderCell = styled(MuiTableCell, {
  shouldForwardProp: (prop: PropertyKey) =>
    prop !== 'densePadding' && prop !== 'enableColumnResizing',
})<{
  densePadding?: boolean;
  enableColumnResizing?: boolean;
}>(({ densePadding, enableColumnResizing }) => ({
  fontWeight: 'bold',
  height: '100%',
  padding: densePadding ? '0.5rem' : '1rem',
  paddingTop: densePadding ? '0.75rem' : '1.25rem',
  transition: `all ${enableColumnResizing ? '10ms' : '0.2s'} ease-in-out`,
  verticalAlign: 'text-top',
}));

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
  const tableCellProps = {
    ...baseHeaderCellProps,
    ...columnHeaderCellProps,
    ...column.getHeaderProps(),
    style: {
      padding: densePadding ? '0.5rem' : '1rem',
      transition: `all ${enableColumnResizing ? '10ms' : '0.2s'} ease-in-out`,
      ...column.getHeaderProps().style,
      ...columnHeaderCellProps?.style,
      ...baseHeaderCellProps?.style,
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
    <TableCell
      align={isParent ? 'center' : 'left'}
      {...tableCellProps}
      sx={{
        ...tableHeaderCellStyles(densePadding, enableColumnResizing),
        ...tableCellProps?.sx,
      }}
    >
      <Box
        sx={{ alignContent: 'space-between', display: 'grid', height: '100%' }}
      >
        <Box
          sx={{
            alignItems: 'flex-start',
            display: 'flex',
            justifyContent: isParent ? 'center' : undefined,
            width: '100%',
          }}
        >
          <Box
            {...column.getSortByToggleProps()}
            sx={{ alignItems: 'center', display: 'flex', flexWrap: 'nowrap' }}
            title={undefined}
          >
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
          </Box>
          <Box
            sx={{ alignItems: 'center', display: 'flex', flexWrap: 'nowrap' }}
          >
            {!disableColumnActions && !isParent && (
              <ColumnActionsAction column={column} />
            )}
            {enableColumnResizing && !isParent && (
              <Divider
                flexItem
                onDoubleClick={() => table.resetResizing()}
                orientation="vertical"
                {...column.getResizerProps()}
                sx={{
                  borderRightWidth: '2px',
                  borderRadius: '2px',
                  maxHeight: '2rem',
                }}
              />
            )}
          </Box>
        </Box>
        {!disableFilters && column.canFilter && (
          <Collapse in={showFilters}>
            <FilterTextField column={column} />
          </Collapse>
        )}
      </Box>
    </TableCell>
  );
};

export default HeaderCell;
