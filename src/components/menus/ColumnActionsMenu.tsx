import ClearAllIcon from '@mui/icons-material/ClearAll';
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';
import SortIcon from '@mui/icons-material/Sort';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import MuiMenuItem from '@mui/material/MenuItem';
import { Divider, Menu, styled } from '@mui/material';
import React, { FC } from 'react';
import { ColumnInstance } from 'react-table';

import { useDataGrid } from '../providers';

const MenuItem = styled(MuiMenuItem)({
  display: 'flex',
  gap: '0.75rem',
});

interface ColumnActionsMenuProps {
  anchorEl: HTMLElement | null;
  column: ColumnInstance;
  setAnchorEl: (anchorEl: HTMLElement | null) => void;
}

export const ColumnActionsMenu: FC<ColumnActionsMenuProps> = ({
  anchorEl,
  column,
  setAnchorEl,
}) => {
  const {
    enableColumnGrouping,
    disableColumnHiding,
    disableSortBy,
    localization,
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
            key="menu-item-sort-asc"
            onClick={onClearSorting}
          >
            <ClearAllIcon /> {localization?.clearSorting}
          </MenuItem>,
          <MenuItem
            disabled={column.isSorted && !column.isSortedDesc}
            onClick={onSortActionAsc}
          >
            <SortIcon /> {localization?.sortAscending}
          </MenuItem>,
          <MenuItem
            disabled={column.isSorted && column.isSortedDesc}
            key="menu-item-sort-desc"
            onClick={onSortActionDesc}
          >
            <SortIcon style={{ transform: 'rotate(180deg) scaleX(-1)' }} />{' '}
            {localization?.sortDescending}
          </MenuItem>,
          <Divider />,
        ]}

      {!disableColumnHiding && (
        <MenuItem onClick={onHideColumnAction}>
          <VisibilityOffIcon /> {localization?.hideColumn}
        </MenuItem>
      )}

      {enableColumnGrouping && column.canGroupBy && (
        <MenuItem disabled={column.isGrouped} onClick={onGroupColumnAction}>
          <DynamicFeedIcon /> {localization?.groupByColumn}
        </MenuItem>
      )}
      {enableColumnGrouping && column.canGroupBy && (
        <MenuItem disabled={!column.isGrouped} onClick={onGroupColumnAction}>
          <DynamicFeedIcon /> {localization?.ungroupByColumn}
        </MenuItem>
      )}
    </Menu>
  );
};

export default ColumnActionsMenu;
