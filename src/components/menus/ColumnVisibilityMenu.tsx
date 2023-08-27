import { Box, Button, Divider, Menu } from '@mui/material';
import React, { FC } from 'react';

import { DataGridColumnInstance } from '../DataGrid';
import { useDataGrid } from '../providers';
import ColumnVisibilityMenuItems from './ColumnVisibilityMenuItems';

interface Props {
  anchorEl: HTMLElement | null;
  isSubMenu?: boolean;
  setAnchorEl: (value: HTMLElement | null) => void;
}

export const ColumnVisibilityMenu: FC<Props> = ({
  anchorEl,
  isSubMenu,
  setAnchorEl,
}) => {
  const { localization, table } = useDataGrid();

  return (
    <Menu
      anchorEl={anchorEl}
      open={!!anchorEl}
      onClose={() => setAnchorEl(null)}
      MenuListProps={{
        dense: table.state.densePadding,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: isSubMenu ? 'center' : 'space-between',
          p: '0.5rem',
          pt: 0,
        }}
      >
        {!isSubMenu && (
          <Button
            disabled={
              !table.getToggleHideAllColumnsProps().checked &&
              !table.getToggleHideAllColumnsProps().indeterminate
            }
            onClick={() => table.toggleHideAllColumns(true)}
          >
            {localization.hideAll}
          </Button>
        )}
        <Button
          disabled={table.getToggleHideAllColumnsProps().checked}
          onClick={() => table.toggleHideAllColumns(false)}
        >
          {localization.showAll}
        </Button>
      </Box>

      <Divider />

      {table.columns?.map((c: DataGridColumnInstance, index) => (
        <ColumnVisibilityMenuItems
          column={c}
          isSubMenu={isSubMenu}
          key={`${index}-${c.id}`}
        />
      ))}
    </Menu>
  );
};

export default ColumnVisibilityMenu;
