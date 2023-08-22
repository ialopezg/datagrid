import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import {
  Divider,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  MenuList,
} from '@mui/material';
import React, { FC, MouseEvent, useState } from 'react';

import { DataGridHeaderGroup } from '../DataGrid';
import { useDataGrid } from '../providers';
import FilterTypeMenu from './FilterTypeMenu';

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
      ClearAllIcon,
      FilteringOnIcon,
      GroupByIcon,
      HideColumnIcon,
      SortIcon,
    },
    idPrefix,
    localization,
    setShowFilters,
  } = useDataGrid();

  const [filterAnchorEl, setFilterAnchorEl] =
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
    >
      <MenuList>
        {!disableSortBy &&
          column.canSort && [
            <MenuItem
              disabled={!column.isSorted}
              key="datagrid-sort-clear-column-action"
              onClick={onClearSorting}
            >
              <ListItemIcon>
                <ClearAllIcon />
              </ListItemIcon>
              <ListItemText>{localization.clearSorting}</ListItemText>
            </MenuItem>,
            <MenuItem
              disabled={column.isSorted && !column.isSortedDesc}
              key="datagrid-sort-asc-column-action"
              onClick={onSortActionAsc}
            >
              <ListItemIcon>
                <SortIcon />
              </ListItemIcon>
              <ListItemText>
                {localization.sortByColumnAscending?.replace(
                  '{column}',
                  String(column.Header),
                )}
              </ListItemText>
            </MenuItem>,
            <MenuItem
              disabled={column.isSorted && column.isSortedDesc}
              key="datagrid-sort-desc-column-action"
              onClick={onSortActionDesc}
            >
              <ListItemIcon>
                <SortIcon style={{ transform: 'rotate(180deg) scaleX(-1)' }} />
              </ListItemIcon>
              <ListItemText>
                {localization.sortByColumnDescending?.replace(
                  '{column}',
                  String(column.Header),
                )}
              </ListItemText>
            </MenuItem>,
          ]}
      </MenuList>

      {!disableFilters &&
        column.canFilter && [
          <Divider key="datagrid-filter-column-action-divider" />,
          <MenuItem
            key="datagrid-filter-column-action"
            onClick={onFilterByColumn}
          >
            <ListItemIcon>
              <FilteringOnIcon />
            </ListItemIcon>
            <ListItemText>
              {localization.filterByColumn?.replace(
                '{column}',
                String(column.Header),
              )}
            </ListItemText>
            <IconButton size="small" onMouseEnter={onFilterModeHover}>
              <ArrowRightIcon />
            </IconButton>
          </MenuItem>,
          <FilterTypeMenu
            anchorEl={filterAnchorEl}
            column={column}
            key="datagrid-filter-mode-column-action-menu"
            setAnchorEl={setFilterAnchorEl}
            onSelect={onFilterByColumn}
          />,
        ]}

      {enableColumnGrouping &&
        column.canGroupBy && [
          <Divider key="datagrid-group-column-action-divider" />,
          <MenuItem
            key="datagrid-group-column-action"
            onClick={onGroupColumnAction}
          >
            <ListItemIcon>
              <GroupByIcon />
            </ListItemIcon>
            <ListItemText>
              {localization[
                column.isGrouped ? 'ungroupByColumn' : 'groupByColumn'
              ]?.replace('{column}', String(column.Header))}
            </ListItemText>
          </MenuItem>,
        ]}

      {!disableColumnHiding && [
        <Divider key="datagrid-column-hidding-column-action-divider" />,
        <MenuItem onClick={onHideColumnAction}>
          <ListItemIcon>
            <HideColumnIcon />
          </ListItemIcon>
          <ListItemText>
            {localization.hideColumn?.replace(
              '{column}',
              String(column.Header),
            )}
          </ListItemText>
        </MenuItem>,
      ]}
    </Menu>
  );
};

export default ColumnActionsMenu;
