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
  const { enableColumnHiding, enableSorting, localization } = useDataGrid();

  const onSortActionAsc = () => {
    column.toggleSortBy(true);
    setAnchorEl(null);
  };

  const onSortActionDesc = () => {
    column.toggleSortBy(false);
    setAnchorEl(null);
  };

  const onHideColumnAction = () => {
    column.toggleHidden();
    setAnchorEl(null);
  };

  return (
    <Menu
      anchorEl={anchorEl}
      onClose={() => setAnchorEl(null)}
      open={!!anchorEl}
    >
      {enableSorting && (
        <>
          <MenuItem onClick={onSortActionAsc}>
            <SortIcon /> {localization?.sortAscending}
          </MenuItem>
          <MenuItem onClick={onSortActionDesc}>
            <SortIcon style={{ transform: 'rotate(180deg) scaleX(-1)' }} />{' '}
            {localization?.sortDescending}
          </MenuItem>
          <Divider />
        </>
      )}

      {enableColumnHiding && (
        <MenuItem onClick={onHideColumnAction}>
          <VisibilityOffIcon /> {localization?.hideColumn}
        </MenuItem>
      )}
    </Menu>
  );
};

export default ColumnActionsMenu;
