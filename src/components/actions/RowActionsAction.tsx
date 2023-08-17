import { IconButton, TableCell, Tooltip } from '@mui/material';
import React, { FC, MouseEvent, useState } from 'react';
import { actionBodyStyles } from '../body';

import { DataGridRow } from '../DataGrid';
import { useDataGrid } from '../providers';
import RowActionsMenu from '../menus/RowActionsMenu';
import EditActionsAction from './EditActionsAction';

const iconButtonStyles = {
  opacity: 0.5,
  transition: 'opacity 0.2s',
  marginRight: '2px',
  height: '2rem',
  width: '2rem',
  '&:hover': {
    opacity: 1,
  },
};

interface RowActionsActionProps {
  row: DataGridRow;
}

export const RowActionsAction: FC<RowActionsActionProps> = ({ row }) => {
  const {
    densePadding,
    enableRowEditing,
    icons: { EditIcon, RowActionsIcon },
    itemForUpdate,
    localization,
    rowActions,
    rowActionMenuItems,
    setItemForUpdate,
    table,
  } = useDataGrid();

  // ** State
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const onRowClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();
    setAnchorEl(e.currentTarget);
  };

  const onRowEditAction = () => {
    setItemForUpdate({ ...row });
    setAnchorEl(null);
  };

  return (
    <TableCell sx={actionBodyStyles(densePadding)}>
      {rowActions ? (
        <>{rowActions(row, table)}</>
      ) : row.id === itemForUpdate?.id ? (
        <EditActionsAction row={row} />
      ) : !rowActionMenuItems && enableRowEditing ? (
        <Tooltip arrow placement="right" title={localization.edit}>
          <IconButton
            onClick={onRowEditAction}
            sx={actionBodyStyles(densePadding)}
          >
            <EditIcon />
          </IconButton>
        </Tooltip>
      ) : rowActionMenuItems ? (
        <>
          <IconButton
            aria-label={localization.rowActions}
            onClick={onRowClick}
            size="small"
            sx={iconButtonStyles}
            title={localization.rowActions}
          >
            <RowActionsIcon />
          </IconButton>

          <RowActionsMenu
            anchorEl={anchorEl}
            onRowEditAction={onRowEditAction}
            row={row}
            setAnchorEl={setAnchorEl}
          />
        </>
      ) : null}
    </TableCell>
  );
};

export default RowActionsAction;
