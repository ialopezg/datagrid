import {
  FormControlLabel,
  Menu,
  MenuItem,
  Switch,
  Typography,
} from '@mui/material';
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
  anchorEl: HTMLElement | null;
  setAnchorEl: (value: HTMLElement | null) => void;
}

export const ColumnVisibilityMenu: FC<ColumnVisibilityMenuProps> = ({
  anchorEl,
  setAnchorEl,
}) => {
  const { table } = useDataGrid();

  return (
    <Menu
      anchorEl={anchorEl}
      open={!!anchorEl}
      onClose={() => setAnchorEl(null)}
    >
      {table.columns.map((column, index) => (
        <ColumnMenuItem column={column} key={`${index}-${column.id}`} />
      ))}
    </Menu>
  );
};

export default ColumnVisibilityMenu;
