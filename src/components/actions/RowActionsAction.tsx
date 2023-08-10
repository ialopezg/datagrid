import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import MuiIconButton from '@mui/material/IconButton';
import { styled } from '@mui/material';
import { Row } from 'react-table';
import React, { FC, MouseEvent, useState } from 'react';
import { useDataGrid } from '../providers';
import RowActionsMenu from '../menus/RowActionsMenu';
import EditActionsAction from './EditActionsAction';
import { ButtonCell } from '../table';

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
  const { densePadding, itemForUpdate, localization, rowActions, table } =
    useDataGrid();

  // ** State
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const onRowClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();
    setAnchorEl(e.currentTarget);
  };

  return (
    <ButtonCell densePadding={densePadding}>
      {rowActions ? (
        <>{rowActions(row, table)}</>
      ) : row.id === itemForUpdate?.id ? (
        <EditActionsAction row={row} />
      ) : (
        <>
          {' '}
          <IconButton
            aria-label={localization?.rowActions}
            onClick={onRowClick}
            title={localization?.rowActions}
            size="small"
          >
            <MoreHorizIcon />
          </IconButton>
          <RowActionsMenu
            anchorEl={anchorEl}
            row={row}
            setAnchorEl={setAnchorEl}
          />
        </>
      )}
    </ButtonCell>
  );
};

export default RowActionsAction;
