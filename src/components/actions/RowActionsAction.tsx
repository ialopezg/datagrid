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
    enableRowEditing,
    icons: { EditIcon, RowActionsIcon },
    localization,
    rowActions,
    rowActionMenuItems,
    setCurrentEditRow,
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
    setCurrentEditRow({ ...row });
    setAnchorEl(null);
  };

  return (
    <TableCell sx={actionBodyStyles(table.state.densePadding)}>
      {rowActions ? (
        <>{rowActions(row, table)}</>
      ) : row.id === table.state.currentEditingRow?.id ? (
        <EditActionsAction row={row} />
      ) : !rowActionMenuItems && enableRowEditing ? (
        <Tooltip
          arrow
          enterDelay={1000}
          enterNextDelay={1000}
          placement="right"
          title={localization.edit}
        >
          <IconButton
            aria-label={localization.edit}
            onClick={onRowEditAction}
            size="small"
            sx={actionBodyStyles(table.state.densePadding)}
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
