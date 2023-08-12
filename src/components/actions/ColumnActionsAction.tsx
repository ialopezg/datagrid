import MoreVertIcon from '@mui/icons-material/MoreVert';
import MuiIconButton from '@mui/material/IconButton';
import { styled, Tooltip } from '@mui/material';
import React, { FC, MouseEvent, useState } from 'react';
import { useDataGrid } from '../providers';
import { HeaderGroup } from 'react-table';

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
  column: HeaderGroup;
}

export const ColumnActionsAction: FC<ColumnActionsActionProps> = ({
  column,
}) => {
  const { localization } = useDataGrid();

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
        title={localization?.columnActions}
      >
        <IconButton
          aria-label={localization?.columnActions}
          onClick={onColumnAction}
          size="small"
        >
          <MoreVertIcon />
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
