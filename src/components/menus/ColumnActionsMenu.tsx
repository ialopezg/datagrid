import MuiMenuItem from '@mui/material/MenuItem';
import { Divider, Menu, styled } from '@mui/material';
import React, { FC } from 'react';

import { DataGridHeaderGroup } from '../DataGrid';
import { useDataGrid } from '../providers';

const MenuItem = styled(MuiMenuItem)({
  display: 'flex',
  gap: '0.75rem',
});

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
    localization,
    setShowFilters,
  } = useDataGrid();

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

  const onFilterByColumnAction = () => {
    setShowFilters(true);
    setTimeout(
      () =>
        document
          .getElementById(
            // @ts-ignore
            column.filterCellTextFieldProps?.id ??
              `datagrid-filter-${column.id}-column`,
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
      {!disableSortBy &&
        column.canSort && [
          <MenuItem
            disabled={!column.isSorted}
            key="datagrid-sort-clear-column-action"
            onClick={onClearSorting}
          >
            <ClearAllIcon /> {localization.clearSorting}
          </MenuItem>,
          <MenuItem
            disabled={column.isSorted && !column.isSortedDesc}
            key="datagrid-sort-asc-column-action"
            onClick={onSortActionAsc}
          >
            <SortIcon />{' '}
            {localization.sortByColumnAscending?.replace(
              '{column}',
              String(column.Header),
            )}
          </MenuItem>,
          <MenuItem
            disabled={column.isSorted && column.isSortedDesc}
            key="datagrid-sort-desc-column-action"
            onClick={onSortActionDesc}
          >
            <SortIcon style={{ transform: 'rotate(180deg) scaleX(-1)' }} />{' '}
            {localization.sortByColumnDescending?.replace(
              '{column}',
              String(column.Header),
            )}
          </MenuItem>,
        ]}

      {!disableFilters &&
        column.canFilter && [
          <Divider key="datagrid-filter-column-action-divider" />,
          <MenuItem
            key="datagrid-filter-column-action"
            onClick={onFilterByColumnAction}
          >
            <FilteringOnIcon />{' '}
            {localization.filterByColumn?.replace(
              '{column}',
              String(column.Header),
            )}
          </MenuItem>,
        ]}

      {enableColumnGrouping &&
        column.canGroupBy && [
          <Divider key="datagrid-group-column-action-divider" />,
          <MenuItem
            key="datagrid-group-column-action"
            onClick={onGroupColumnAction}
          >
            <GroupByIcon />{' '}
            {localization[
              column.isGrouped ? 'ungroupByColumn' : 'groupByColumn'
            ]?.replace('{column}', String(column.Header))}
          </MenuItem>,
        ]}

      {!disableColumnHiding && [
        <Divider key="datagrid-column-hidding-column-action-divider" />,
        <MenuItem onClick={onHideColumnAction}>
          <HideColumnIcon />{' '}
          {localization.hideColumn?.replace('{column}', String(column.Header))}
        </MenuItem>,
      ]}
    </Menu>
  );
};

export default ColumnActionsMenu;
