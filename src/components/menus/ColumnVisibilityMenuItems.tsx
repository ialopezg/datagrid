import { FormControlLabel, MenuItem, Switch } from '@mui/material';
import { ColumnInstance } from 'react-table';
import React, { FC } from 'react';

import { DataGridColumnInstance } from '../DataGrid';
import { commonMenuItemStyles } from './ColumnActionsMenu';

interface ColumnVisibilityMenuItemsProps {
  column: DataGridColumnInstance;
  isSubMenu?: boolean;
}

export const ColumnVisibilityMenuItems: FC<ColumnVisibilityMenuItemsProps> = ({
  column,
  isSubMenu,
}) => {
  const isParent = !!column?.columns?.length;
  const allChildColumnsVisible =
    isParent && !!column?.columns?.every((c) => c.isVisible);
  const checked = column.isVisible ?? allChildColumnsVisible;

  const onChangeColumnVisibility = (column: ColumnInstance) => {
    if (isParent) {
      column?.columns?.forEach?.((child) => {
        child.toggleHidden(checked);
      });
    } else {
      column.toggleHidden();
    }
  };

  return (
    <>
      <MenuItem
        sx={{ ...commonMenuItemStyles, pl: `${(column.depth + 0.5) * 2}rem` }}
      >
        <FormControlLabel
          checked={checked}
          componentsProps={{ typography: { sx: { marginBottom: 0 } } }}
          control={<Switch />}
          disabled={isSubMenu && checked}
          label={String(column.Header)}
          onChange={() => onChangeColumnVisibility(column)}
        />
      </MenuItem>

      {column?.columns?.map((c: DataGridColumnInstance, index) => (
        <ColumnVisibilityMenuItems
          column={c}
          key={`${index}-${c.id}`}
          isSubMenu={isSubMenu}
        />
      ))}
    </>
  );
};

export default ColumnVisibilityMenuItems;
