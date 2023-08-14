import {
  Button,
  Divider,
  IconButton,
  IconButtonProps,
  Menu,
  styled,
  Tooltip,
} from '@mui/material';
import React, { FC, MouseEvent, useState } from 'react';
import { DataGridColumnInstance } from '../DataGrid';

import { useDataGrid } from '../providers';
import ColumnVisibilityMenu from '../menus/ColumnVisibilityMenu';

const MenuButtons = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  padding: '0 0.5rem 0.5rem 0.5rem',
});

interface ColumnsVisibilityActionProps extends IconButtonProps {}

export const ToggleColumnVisibilityAction: FC<ColumnsVisibilityActionProps> = ({
  ...rest
}) => {
  const {
    localization,
    icons: { ColumnVisibilityIcon },
    table,
  } = useDataGrid();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const onToggleMenuAction = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <>
      <Tooltip arrow title={localization.toggleColumnVisibility}>
        <IconButton
          aria-label={localization.toggleColumnVisibility}
          onClick={onToggleMenuAction}
          size="small"
          {...rest}
        >
          <ColumnVisibilityIcon />
        </IconButton>
      </Tooltip>

      <Menu
        anchorEl={anchorEl}
        open={!!anchorEl}
        onClose={() => setAnchorEl(null)}
      >
        <MenuButtons>
          <Button
            disabled={
              !table.getToggleHideAllColumnsProps().checked &&
              !table.getToggleHideAllColumnsProps().indeterminate
            }
            onClick={() => table.toggleHideAllColumns(true)}
          >
            {localization.hideAll}
          </Button>
          <Button
            disabled={table.getToggleHideAllColumnsProps().checked}
            onClick={() => table.toggleHideAllColumns(false)}
          >
            {localization.showAll}
          </Button>
        </MenuButtons>

        <Divider />

        {table.columns.map((column: DataGridColumnInstance) => (
          <ColumnVisibilityMenu
            column={column}
            key={`column-hide-action${column.id}`}
          />
        ))}
      </Menu>
    </>
  );
};

export default ToggleColumnVisibilityAction;
