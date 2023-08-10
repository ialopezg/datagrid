import EditIcon from '@mui/icons-material/Edit';
import { Menu, MenuItem } from '@mui/material';
import { Row } from 'react-table';
import React, { FC } from 'react';
import { useDataGrid } from '../providers';

interface RowActionsMenuProps {
  anchorEl: HTMLElement | null;
  onRowEditAction: () => void;
  row: Row;
  setAnchorEl: (value: HTMLElement | null) => void;
}

export const RowActionsMenu: FC<RowActionsMenuProps> = ({
  anchorEl,
  onRowEditAction,
  row,
  setAnchorEl,
}) => {
  const { enableRowEditing, localization, rowActionMenuItems, table } =
    useDataGrid();

  return (
    <Menu
      anchorEl={anchorEl}
      onClose={() => setAnchorEl(null)}
      open={!!anchorEl}
    >
      {enableRowEditing && (
        <MenuItem onClick={onRowEditAction}>
          <EditIcon /> {localization?.rowActions}
        </MenuItem>
      )}

      {rowActionMenuItems?.(row, table, () => setAnchorEl(null)) ?? null}
    </Menu>
  );
};

export default RowActionsMenu;
