import {
  Box,
  Collapse,
  Divider,
  IconButton,
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
    disableColumnActions,
    disableFilters,
    enableColumnResizing,
    headerCellProps: defaultCellProps,
    icons: { FilterAltIcon, FilterAltOffIcon },
    localization,
    setShowFilters,
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
      padding: table.state.densePadding ? '0.5rem' : '1rem',
      transition: `all ${enableColumnResizing ? '10ms' : '0.2s'} ease-in-out`,
      ...column.getHeaderProps().style,
      ...columnHeaderCellProps?.style,
      ...baseHeaderCellProps?.style,
    },
  };

  const isParent = !!column?.columns?.length;

  const tooltipTitle = column.isSorted
    ? column.isSortedDesc
      ? localization.clearSort
      : localization.sortByColumnDescending?.replace(
          '{column}',
          String(column.Header),
        )
    : localization.sortByColumnAscending?.replace(
        '{column}',
        String(column.Header),
      );

  const filterTooltip = !!column.filterValue
    ? localization.filterModeByColumn
        .replace('{column}', String(column.Header))
        .replace('{mode}', column.filterValue)
    : localization.toggleFilters;
  const columnHeader = String(column.render('Header'));

  return (
    <TableCell
      align={isParent ? 'center' : 'left'}
      {...tableCellProps}
      sx={{
        ...tableHeaderCellStyles(
          table.state.densePadding,
          enableColumnResizing,
        ),
        ...tableCellProps?.sx,
      }}
    >
      <Box
        sx={{
          alignItems: 'flex-start',
          display: 'flex',
          justifyContent: isParent ? 'center' : 'space-between',
          width: '100%',
        }}
      >
        <Box
          {...column.getSortByToggleProps()}
          sx={{
            alignItems: 'center',
            display: 'flex',
            flexWrap: 'nowrap',
            whiteSpace: columnHeader.length < 15 ? 'nowrap' : 'normal',
          }}
          title={undefined}
        >
          {column.render('Header')}
          {!isParent && column.canSort && (
            <Tooltip arrow title={tooltipTitle}>
              <TableSortLabel
                aria-label={tooltipTitle}
                active={column.isSorted}
                direction={column.isSortedDesc ? 'desc' : 'asc'}
              />
            </Tooltip>
          )}
          {!isParent && column.canFilter && (
            <Tooltip arrow title={filterTooltip}>
              <IconButton
                onClick={(e) => {
                  e.stopPropagation();
                  setShowFilters(!table.state.showFilters);
                }}
                size="small"
                sx={{
                  opacity: !!column.filterValue ? 0.8 : 0,
                  px: '2px',
                  m: 0,
                  transition: 'all 0.2s ease-in-out',
                  '&:hover': {
                    opacity: 0.8,
                  },
                }}
              >
                {table.state.showFilters && !column.filterValue ? (
                  <FilterAltOffIcon fontSize="small" />
                ) : (
                  <FilterAltIcon fontSize="small" />
                )}
              </IconButton>
            </Tooltip>
          )}
        </Box>

        <Box sx={{ alignItems: 'center', display: 'flex', flexWrap: 'nowrap' }}>
          {!disableColumnActions && !isParent && (
            <ColumnActionsAction column={column} />
          )}

          {enableColumnResizing && !isParent && (
            <Divider
              flexItem
              orientation="vertical"
              onDoubleClick={() => table.resetResizing()}
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
        <Collapse in={table.state.showFilters}>
          <FilterTextField column={column} />
        </Collapse>
      )}
    </TableCell>
  );
};

export default HeaderCell;
