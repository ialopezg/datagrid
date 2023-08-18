import { Box, IconButton, Tooltip } from '@mui/material';
import React, { FC } from 'react';

import { DataGridRow } from '../DataGrid';
import { useDataGrid } from '../providers';

interface EditActionsActionProps {
  row: DataGridRow;
}

export const EditActionsAction: FC<EditActionsActionProps> = ({ row }) => {
  const {
    icons: { CancelIcon, SaveIcon },
    localization,
    onRowEditSubmit,
    setItemForUpdate,
    table: {
      state: { currentEditingRow },
    },
  } = useDataGrid();

  const onSaveButtonClick = async () => {
    setItemForUpdate(null);
    await onRowEditSubmit?.(currentEditingRow ?? row);
  };

  const onCancelButtonClick = () => {
    row.values = row.original;
    setItemForUpdate(null);
  };

  return (
    <Box sx={{ display: 'flex', gap: '0.75rem' }}>
      <Tooltip arrow title={localization.cancel}>
        <IconButton
          aria-label={localization.cancel}
          onClick={onCancelButtonClick}
          color="error"
        >
          <CancelIcon />
        </IconButton>
      </Tooltip>

      <Tooltip arrow title={localization.save}>
        <IconButton
          aria-label={localization.save}
          onClick={onSaveButtonClick}
          color="primary"
        >
          <SaveIcon />
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default EditActionsAction;
