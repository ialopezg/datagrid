import { IconButton, Tooltip } from '@mui/material';
import React, { FC, MouseEvent, useState } from 'react';

import { DataGridHeaderGroup } from '../DataGrid';
import { useDataGrid } from '../providers';
import ColumnActionsMenu from '../menus/ColumnActionsMenu';

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
          sx={{
            height: '2rem',
            mr: '2px',
            mt: '-0.2rem',
            opacity: 0.5,
            transition: 'opacity 0.2s',
            width: '2rem',
            '&:hover': {
              opacity: 1,
            },
          }}
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
