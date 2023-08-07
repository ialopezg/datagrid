import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import MuiIconButton from '@mui/material/IconButton';
import { styled } from '@mui/material';
import { Row } from 'react-table';
import React, { FC, MouseEvent, useState } from 'react';
import { useDataGrid } from '../providers';
import RowActionsMenu from '../menus/RowActionsMenu';
import EditActionsAction from './EditActionsAction';

const IconButton = styled(MuiIconButton)({
  opacity: 0.5,
  transition: 'opacity 0.2s',
  marginRight: '2px',
  height: '2rem',
  width: '2rem',
  '&:hover': {
    opacity: 1,
  },
});

interface RowActionsActionProps {
  row: Row;
}

export const RowActionsAction: FC<RowActionsActionProps> = ({ row }) => {
  const { itemForUpdate, localization } = useDataGrid();

  // ** State
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const onRowClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();
    setAnchorEl(e.currentTarget);
  };

  if (row.id === itemForUpdate) {
    return (<EditActionsAction row={row} />);
  }

  return (
    <>
      <IconButton
        aria-label={localization?.rowActions}
        onClick={onRowClick}
        title={localization?.rowActions}
        size="small"
      >
        <MoreHorizIcon />
      </IconButton>

      <RowActionsMenu anchorEl={anchorEl} row={row} setAnchorEl={setAnchorEl} />
    </>
  );
};

export default RowActionsAction;
