import {
  Button,
  Divider,
  IconButton,
  Menu,
  styled,
  Tooltip,
} from '@mui/material';
import ViewColumnIcon from '@mui/icons-material/ViewColumn';
import React, { FC, MouseEvent, useState } from 'react';

import { useDataGrid } from '../providers';
import ColumnVisibilityMenu from '../menus/ColumnVisibilityMenu';

const MenuButtons = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  padding: '0 0.5rem 0.5rem 0.5rem',
});

interface ColumnsVisibilityActionProps {}

export const ColumnsVisibilityAction: FC<ColumnsVisibilityActionProps> = () => {
  const { localization, table } = useDataGrid();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const onToggleMenuAction = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <>
      <Tooltip arrow title={localization?.hideColumns}>
        <IconButton
          aria-label={localization?.hideColumns}
          onClick={onToggleMenuAction}
          size="small"
        >
          <ViewColumnIcon />
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
            {localization?.hideAll}
          </Button>
          <Button
            disabled={table.getToggleHideAllColumnsProps().checked}
            onClick={() => table.toggleHideAllColumns(false)}
          >
            {localization?.showAll}
          </Button>
        </MenuButtons>

        <Divider />

        {table.columns.map((column) => (
          <ColumnVisibilityMenu
            column={column}
            key={`column-hide-action${column.id}`}
          />
        ))}
      </Menu>
    </>
  );
};

export default ColumnsVisibilityAction;
