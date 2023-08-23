import { FormControlLabel, MenuItem, Switch } from '@mui/material';
import { ColumnInstance } from 'react-table';
import React, { FC } from 'react';

import { DataGridColumnInstance } from '../DataGrid';
import { commonMenuItemStyles } from './ColumnActionsMenu';

interface Props {
  column: DataGridColumnInstance;
}

export const ColumnVisibilityMenu: FC<Props> = ({ column }) => {
  const isParentHeader = !!column?.columns?.length;

  const allChildColumnsVisible =
    isParentHeader &&
    !!column.columns?.every((childColumn) => childColumn.isVisible);

  const switchChecked = column.isVisible ?? allChildColumnsVisible;

  const handleToggleColumnHidden = (column: ColumnInstance) => {
    if (isParentHeader) {
      column?.columns?.forEach?.((childColumn) => {
        childColumn.toggleHidden(switchChecked);
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
          componentsProps={{ typography: { sx: { marginBottom: 0 } } }}
          checked={switchChecked}
          control={<Switch />}
          label={String(column.Header)}
          onChange={() => handleToggleColumnHidden(column)}
        />
      </MenuItem>

      {column.columns?.map((c: DataGridColumnInstance, i) => (
        <ColumnVisibilityMenu key={`${i}-${c.id}`} column={c} />
      ))}
    </>
  );
};

export default ColumnVisibilityMenu;
