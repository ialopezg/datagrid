import EditIcon from '@mui/icons-material/Edit';
import { Menu, MenuItem } from '@mui/material';
import { Row } from 'react-table';
import React, { FC } from 'react';
import { useDataGrid } from '../providers';

interface RowActionsMenuProps {
  anchorEl: HTMLElement | null;
  row: Row;
  setAnchorEl: (value: HTMLElement | null) => void;
}

export const RowActionsMenu: FC<RowActionsMenuProps> = ({
  anchorEl,
  row,
  setAnchorEl,
}) => {
  const {
    enableRowEditing,
    localization,
    rowActionMenuItems,
    setItemForUpdate,
    table,
  } = useDataGrid();

  const onMenuItemClick = () => {
    setItemForUpdate(row.id);
    setAnchorEl(null);
  };

  return (
    <Menu
      anchorEl={anchorEl}
      onClose={() => setAnchorEl(null)}
      open={!!anchorEl}
    >
      {enableRowEditing && (
        <MenuItem onClick={onMenuItemClick}>
          <EditIcon /> {localization?.edit}
        </MenuItem>
      )}

      {rowActionMenuItems?.(row, table, () => setAnchorEl(null)) ?? null}
    </Menu>
  );
};

export default RowActionsMenu;
