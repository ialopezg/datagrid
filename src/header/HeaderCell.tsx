import {
  Box,
  Collapse,
  Divider,
  IconButton,
  TableCell,
  TableSortLabel,
  Tooltip,
} from '@mui/material';
import React, { CSSProperties, FC } from 'react';

import { DataGridHeaderGroup } from '../DataGrid';
import { useDataGrid } from '../providers';
import FilterTextField from '../inputs/FilterTextField';
import ColumnActionsAction from '../actions/ColumnActionsAction';

export const commonTableHeaderCellStyles = (
  densePadding: boolean,
  enableColumnResizing?: boolean,
  widths?: {
    maxWidth?: CSSProperties['maxWidth'],
    minWidth?: CSSProperties['minWidth'],
    width?: CSSProperties['width'],
  },
) => ({
  fontWeight: 'bold',
  height: '100%',
  p: densePadding ? '0.5rem' : '1rem',
  pt: densePadding ? '0.75rem' : '1.25rem',
  transition: `all ${enableColumnResizing ? '10ms' : '0.2s'} ease-in-out`,
  verticalAlign: 'text-top',
  ...widths,
});

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

  const filterType = table.state.currentFilterTypes[column.id];
  const filterTooltip = !!column.filterValue
    ? localization.filterModeByColumn
        .replace('{column}', String(column.Header))
        .replace(
          '{filterType}',
          filterType instanceof Function ? '' : localization[filterType],
        )
        .replace('{filterValue}', column.filterValue)
    : localization.toggleFilters;
  const columnHeader = String(column.render('Header'));

  return (
    <TableCell
      align={isParent ? 'center' : 'left'}
      {...tableCellProps}
      sx={{
        ...commonTableHeaderCellStyles(
          table.state.densePadding,
          enableColumnResizing,
          {
            maxWidth: column.maxWidth,
            minWidth: column.minWidth,
            width: column.width,
          }
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
