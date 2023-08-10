import { FormControlLabel, MenuItem, Switch, Typography } from '@mui/material';
import React, { FC } from 'react';
import { useDataGrid } from '../providers';
import { ColumnInstance } from 'react-table';

interface ColumnMenuItem {
  column: ColumnInstance;
}

const ColumnMenuItem: FC<ColumnMenuItem> = ({ column }) => {
  const { maxColumnDepth } = useDataGrid();

  const isMaxDepth = column.depth === maxColumnDepth;

  return (
    <>
      <MenuItem style={{ paddingLeft: `${column.depth + 1}rem` }}>
        {isMaxDepth ? (
          <FormControlLabel
            checked={column.isVisible}
            control={<Switch />}
            label={String(column.Header)}
            onChange={() => isMaxDepth && column.toggleHidden()}
          />
        ) : (
          <Typography>{String(column.Header)}</Typography>
        )}
      </MenuItem>
      {column.columns?.map((c, i) => (
        <ColumnMenuItem key={`${i}-${c.id}`} column={c} />
      ))}
    </>
  );
};

interface ColumnVisibilityMenuProps {
  column: ColumnInstance;
}

export const ColumnVisibilityMenu: FC<ColumnVisibilityMenuProps> = ({
  column,
}) => {
  const isParent = (column?.columns?.length ?? 0) > 0;

  const allChildColumnsVisible =
    isParent && !!column.columns?.every((child) => child.isVisible);
  const switchChecked = column.isVisible ?? allChildColumnsVisible;

  const onToggleColumnVisibility = (column: ColumnInstance) => {
    if (isParent) {
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
          label={String(column.Header)}
          onClick={() => onToggleColumnVisibility(column)}
        />
      </MenuItem>
      {column.columns?.map((column, index) => (
        <ColumnMenuItem column={column} key={`${index}-${column.id}`} />
      ))}
    </>
  );
};

export default ColumnVisibilityMenu;
