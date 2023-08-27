import { Box, IconButton, Menu, MenuItem } from '@mui/material';
import React, { FC, MouseEvent, useState } from 'react';

import { DataGridHeaderGroup } from '../DataGrid';
import { useDataGrid } from '../providers';
import ColumnVisibilityMenu from './ColumnVisibilityMenu';
import FilterModeMenu from './FilterModeMenu';

export const commonMenuItemStyles = {
  py: '6px',
  my: 0,
  justifyContent: 'space-between',
  alignItems: 'center',
};

export const commonListItemStyles = {
  display: 'flex',
  gap: '0.75rem',
  alignItems: 'center',
};

interface ColumnActionsMenuProps {
  anchorEl: HTMLElement | null;
  column: DataGridHeaderGroup;
  setAnchorEl: (anchorEl: HTMLElement | null) => void;
}

export const ColumnActionsMenu: FC<ColumnActionsMenuProps> = ({
  anchorEl,
  column,
  setAnchorEl,
}) => {
  const {
    disableColumnHiding,
    disableFilters,
    disableSortBy,
    enableColumnGrouping,
    icons: {
      ArrowRightIcon,
      ClearAllIcon,
      FilteringOnIcon,
      FilteringOffIcon,
      GroupByIcon,
      HideColumnIcon,
      SortIcon,
      ColumnVisibilityIcon,
    },
    idPrefix,
    localization,
    setShowFilters,
    table,
  } = useDataGrid();

  const [filterAnchorEl, setFilterAnchorEl] = useState<null | HTMLElement>(
    null,
  );
  const [childColumnsAnchor, setChildColumnsAnchor] =
    useState<null | HTMLElement>(null);

  const onFilterModeHover = (e: MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    setFilterAnchorEl(e.currentTarget);
  };

  const onClearSorting = () => {
    column.clearSortBy();
    setAnchorEl(null);
  };

  const onSortActionAsc = () => {
    column.toggleSortBy(false);
    setAnchorEl(null);
  };

  const onSortActionDesc = () => {
    column.toggleSortBy(true);
    setAnchorEl(null);
  };

  const onClearFilter = () => {
    column.setFilter('');
    setAnchorEl(null);
  };

  const onFilterByColumn = () => {
    setShowFilters(true);
    setTimeout(
      () =>
        document
          .getElementById(
            // @ts-ignore
            column.filterCellTextFieldProps?.id ??
              `datagrid-${idPrefix}-${column.id}-filter-column`,
          )
          ?.focus(),
      200,
    );
    setAnchorEl(null);
  };

  const onHideColumnAction = () => {
    column.toggleHidden();
    setAnchorEl(null);
  };

  const onGroupColumnAction = () => {
    column.toggleGroupBy();
    setAnchorEl(null);
  };

  const onColumnMenuOpen = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    setChildColumnsAnchor(e.currentTarget);
  };

  const onShowAllColumns = () => {
    table.toggleHideAllColumns(false);
    setAnchorEl(null);
  };

  return (
    <Menu
      anchorEl={anchorEl}
      onClose={() => setAnchorEl(null)}
      open={!!anchorEl}
      MenuListProps={{ dense: table.state.densePadding }}
    >
      {!disableSortBy &&
        column.canSort && [
          <MenuItem
            disabled={!column.isSorted}
            key="datagrid-sort-by-clear-column-action"
            onClick={onClearSorting}
            sx={commonListItemStyles}
          >
            <Box sx={commonListItemStyles}>
              <ClearAllIcon />
              {localization.clearSort}
            </Box>
          </MenuItem>,
          <MenuItem
            disabled={column.isSorted && !column.isSortedDesc}
            key="datagrid-sort-by-asc-column-action"
            onClick={onSortActionAsc}
            sx={commonListItemStyles}
          >
            <Box sx={commonListItemStyles}>
              <SortIcon />
              {localization.sortByColumnAscending?.replace(
                '{column}',
                String(column.Header),
              )}
            </Box>
          </MenuItem>,
          <MenuItem
            disabled={column.isSorted && column.isSortedDesc}
            divider={
              !disableFilters || enableColumnGrouping || !disableColumnHiding
            }
            key="datagrid-sort-by-desc-column-action"
            onClick={onSortActionDesc}
            sx={commonListItemStyles}
          >
            <Box sx={commonListItemStyles}>
              <SortIcon style={{ transform: 'rotate(180deg) scaleX(-1)' }} />
              {localization.sortByColumnDescending?.replace(
                '{column}',
                String(column.Header),
              )}
            </Box>
          </MenuItem>,
        ]}

      {!disableFilters &&
        column.canFilter && [
          <MenuItem
            disabled={!column.filterValue}
            key={'datagrid-filter-by-clear-column-action'}
            onClick={onClearFilter}
            sx={commonMenuItemStyles}
          >
            <Box sx={commonListItemStyles}>
              <FilteringOffIcon />
              {localization?.clearFilter}
            </Box>
          </MenuItem>,
          <MenuItem
            divider={enableColumnGrouping || !disableColumnHiding}
            key="datagrid-filter-by-column-action"
            onClick={onFilterByColumn}
            sx={commonListItemStyles}
          >
            <Box sx={commonListItemStyles}>
              <FilteringOnIcon />
              {localization.filterByColumn?.replace(
                '{column}',
                String(column.Header),
              )}
            </Box>
            {!column.filterSelectOptions && (
              <IconButton
                onClick={onFilterModeHover}
                onMouseEnter={onFilterModeHover}
                size="small"
                sx={{ p: 0 }}
              >
                <ArrowRightIcon />
              </IconButton>
            )}
          </MenuItem>,
          <FilterModeMenu
            anchorEl={filterAnchorEl}
            column={column}
            key="datagrid-filter-by-mode-column-action-menu"
            setAnchorEl={setFilterAnchorEl}
            onSelect={onFilterByColumn}
          />,
        ]}

      {enableColumnGrouping &&
        column.canGroupBy && [
          <MenuItem
            divider={!disableColumnHiding}
            key="datagrid-group-by-column-action"
            onClick={onGroupColumnAction}
            sx={commonListItemStyles}
          >
            <Box sx={commonListItemStyles}>
              <GroupByIcon />
              {localization[
                column.isGrouped ? 'ungroupByColumn' : 'groupByColumn'
              ]?.replace('{column}', String(column.Header))}
            </Box>
          </MenuItem>,
        ]}

      {!disableColumnHiding && [
        <MenuItem
          key="datagrid-column-visibility-column-action"
          onClick={onHideColumnAction}
          sx={commonListItemStyles}
        >
          <Box sx={commonListItemStyles}>
            <HideColumnIcon />
            {localization.hideColumn?.replace(
              '{column}',
              String(column.Header),
            )}
          </Box>
        </MenuItem>,
        <MenuItem
          key="datagrid-child-column-visibility-column-action"
          onClick={onShowAllColumns}
          sx={commonMenuItemStyles}
        >
          <Box sx={commonListItemStyles}>
            <ColumnVisibilityIcon />

            {localization.showAllColumns}
          </Box>
          {!column.filterSelectOptions && (
            <IconButton
              onClick={onColumnMenuOpen}
              onMouseEnter={onColumnMenuOpen}
              size="small"
              sx={{ p: 0 }}
            >
              <ArrowRightIcon />
            </IconButton>
          )}
        </MenuItem>,
        <ColumnVisibilityMenu
          anchorEl={childColumnsAnchor}
          isSubMenu
          key="datagrid-child-column-visibility-items-column-action"
          setAnchorEl={setChildColumnsAnchor}
        />,
      ]}
    </Menu>
  );
};

export default ColumnActionsMenu;
