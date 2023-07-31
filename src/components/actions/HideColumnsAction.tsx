import {
  Checkbox,
  FormControlLabel,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material';
import ViewColumnIcon from '@mui/icons-material/ViewColumn';
import React, { FC, MouseEvent, useState } from 'react';

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
            control={<Checkbox />}
            label={String(column.Header)}
            onChange={() => isMaxDepth && column.toggleHidden()}
          />
        ) : (
          <Typography>{column.Header}</Typography>
        )}
      </MenuItem>
      {column.columns?.map((c, i) => (
        <ColumnMenuItem key={`${i}-${c.id}`} column={c} />
      ))}
    </>
  );
};

interface HideColumnsActionProps {}

export const HideColumnsAction: FC<HideColumnsActionProps> = () => {
  const { localization, table } = useDataGrid();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const onToggleMenuAction = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <>
      <IconButton
        aria-label={localization?.hideColumns}
        onClick={onToggleMenuAction}
        title={localization?.hideColumns}
      >
        <ViewColumnIcon />
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        open={!!anchorEl}
      >
        {table.columns.map((column, index) => (
          <ColumnMenuItem column={column} key={`${index}-${column.id}`} />
        ))}
      </Menu>
    </>
  );
};
