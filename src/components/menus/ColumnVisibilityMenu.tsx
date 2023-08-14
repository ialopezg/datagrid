import { FormControlLabel, MenuItem, Switch } from '@mui/material';
import { ColumnInstance } from 'react-table';
import React, { FC } from 'react';

import { DataGridColumnInstance } from '../DataGrid';

interface Props {
  column: DataGridColumnInstance;
}

export const ColumnVisibilityMenu: FC<Props> = ({ column }) => {
  const isParentHeader = (column?.columns?.length ?? 0) > 0;

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
      <MenuItem style={{ paddingLeft: `${(column.depth + 0.5) * 2}rem` }}>
        <FormControlLabel
          checked={switchChecked}
          control={<Switch />}
          label={column.Header as string}
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
