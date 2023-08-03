import React, { FC } from 'react';
import { Menu, MenuItem } from '@mui/material';
import { ColumnInstance } from 'react-table';
import { useDataGrid } from '../providers';

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
  const { enableColumnHiding, localization } = useDataGrid();

  return (
    <Menu
      anchorEl={anchorEl}
      onClose={() => setAnchorEl(null)}
      open={!!anchorEl}
    >
      {enableColumnHiding && (
        <MenuItem onClick={() => column.toggleHidden()}>
          {localization?.hideColumn}
        </MenuItem>
      )}
    </Menu>
  );
};

export default ColumnActionsMenu;
