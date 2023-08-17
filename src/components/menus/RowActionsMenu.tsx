import { Menu, MenuItem } from '@mui/material';
import React, { FC } from 'react';

import { DataGridRow } from '../DataGrid';
import { useDataGrid } from '../providers';

interface RowActionsMenuProps {
  anchorEl: HTMLElement | null;
  onRowEditAction: () => void;
  row: DataGridRow;
  setAnchorEl: (value: HTMLElement | null) => void;
}

export const RowActionsMenu: FC<RowActionsMenuProps> = ({
  anchorEl,
  onRowEditAction,
  row,
  setAnchorEl,
}) => {
  const {
    enableRowEditing,
    icons: { EditIcon },
    localization,
    rowActionMenuItems,
    table,
  } = useDataGrid();

  return (
    <Menu
      anchorEl={anchorEl}
      onClose={() => setAnchorEl(null)}
      open={!!anchorEl}
    >
      {enableRowEditing && (
        <MenuItem
          onClick={onRowEditAction}
          sx={{ display: 'flex', gap: '0.75rem' }}
        >
          <EditIcon /> {localization.editRow}
        </MenuItem>
      )}

      {rowActionMenuItems?.(row, table, () => setAnchorEl(null)) ?? null}
    </Menu>
  );
};

export default RowActionsMenu;
