import MoreVertIcon from '@mui/icons-material/MoreVert';
import MuiIconButton from '@mui/material/IconButton';
import React, { FC, MouseEvent, useState } from 'react';
import { useDataGrid } from '../providers';
import { HeaderGroup } from 'react-table';

const IconButton = styled(MuiIconButton)({
  opacity: 0.5,
  transition: 'opacity 0.2s',
  '&:hover': {
    opacity: 1,
  },
});

import ColumnActionsMenu from '../menus/ColumnActionsMenu';
import { styled } from '@mui/material';

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
      {/** Action button */}
      <IconButton
        aria-label={localization?.columnActions}
        onClick={onColumnAction}
        size="small"
        title={localization?.columnActions}
      >
        <MoreVertIcon />
      </IconButton>

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
