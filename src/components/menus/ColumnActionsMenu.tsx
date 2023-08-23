import { Box, IconButton, Menu, MenuItem } from '@mui/material';
import React, { FC, MouseEvent, useState } from 'react';

import { DataGridHeaderGroup } from '../DataGrid';
import { useDataGrid } from '../providers';
import FilterModeMenu from './FilterModeMenu';

export const commonMenuItemStyles = {
  py: '5px',
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
      GroupByIcon,
      HideColumnIcon,
      SortIcon,
    },
    idPrefix,
    localization,
    setShowFilters,
    table,
  } = useDataGrid();

  const [filterAnchorEl, setFilterAnchorEl] = useState<null | HTMLElement>(
    null,
  );

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

  return (
    <Menu
      anchorEl={anchorEl}
      onClose={() => setAnchorEl(null)}
      open={!!anchorEl}
      MenuListProps={{
        dense: table.state.densePadding,
        disablePadding: true,
      }}
    >
      {!disableSortBy &&
        column.canSort && [
          <MenuItem
            disabled={!column.isSorted}
            key="datagrid-sort-clear-column-action"
            onClick={onClearSorting}
            sx={commonListItemStyles}
          >
            <Box sx={commonListItemStyles}>
              <ClearAllIcon />
              {localization.clearSorting}
            </Box>
          </MenuItem>,
          <MenuItem
            disabled={column.isSorted && !column.isSortedDesc}
            key="datagrid-sort-asc-column-action"
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
            key="datagrid-sort-desc-column-action"
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
            divider={enableColumnGrouping || !disableColumnHiding}
            key="datagrid-filter-column-action"
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
            <IconButton
              onClick={onFilterModeHover}
              onMouseEnter={onFilterModeHover}
              size="small"
              sx={{ p: 0 }}
            >
              <ArrowRightIcon />
            </IconButton>
          </MenuItem>,
          <FilterModeMenu
            anchorEl={filterAnchorEl}
            column={column}
            key="datagrid-filter-mode-column-action-menu"
            setAnchorEl={setFilterAnchorEl}
            onSelect={onFilterByColumn}
          />,
        ]}

      {enableColumnGrouping &&
        column.canGroupBy && [
          <MenuItem
            divider={!disableColumnHiding}
            key="datagrid-group-column-action"
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
          key="datagrid-column-visibility-action"
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
      ]}
    </Menu>
  );
};

export default ColumnActionsMenu;
