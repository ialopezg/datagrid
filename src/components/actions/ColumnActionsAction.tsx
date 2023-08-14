import MuiIconButton from '@mui/material/IconButton';
import { styled, Tooltip } from '@mui/material';
import React, { FC, MouseEvent, useState } from 'react';

import { DataGridHeaderGroup } from '../DataGrid';
import { useDataGrid } from '../providers';
import ColumnActionsMenu from '../menus/ColumnActionsMenu';

const IconButton = styled(MuiIconButton)({
  opacity: 0.5,
  transition: 'opacity 0.2s',
  marginRight: '2px',
  height: '1.6rem',
  width: '1.6rem',
  '&:hover': {
    opacity: 1,
  },
});

interface ColumnActionsActionProps {
  column: DataGridHeaderGroup;
}

export const ColumnActionsAction: FC<ColumnActionsActionProps> = ({
  column,
}) => {
  const {
    localization,
    icons: { ColumnActionsIcon },
  } = useDataGrid();

  // ** State
  const [anchor, setAnchor] = useState<null | HTMLElement>(null);

  const onColumnAction = (e: MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    e.preventDefault();
    setAnchor(e.currentTarget);
  };

  return (
    <>
      <Tooltip
        arrow
        enterDelay={1000}
        enterNextDelay={1000}
        title={localization.columnActions}
      >
        <IconButton
          aria-label={localization.columnActions}
          onClick={onColumnAction}
          size="small"
        >
          <ColumnActionsIcon />
        </IconButton>
      </Tooltip>

      {/** Menu */}
      <ColumnActionsMenu
        anchorEl={anchor}
        column={column}
        setAnchorEl={setAnchor}
      />
    </>
  );
};

export default ColumnActionsAction;
