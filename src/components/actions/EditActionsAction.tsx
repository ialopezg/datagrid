import { IconButton, styled, Tooltip } from '@mui/material';
import React, { FC } from 'react';

import { DataGridRow } from '../DataGrid';
import { useDataGrid } from '../providers';

const EditActionsWrapper = styled('div')({
  display: 'flex',
  gap: '0.75rem',
});

interface EditActionsActionProps {
  row: DataGridRow;
}

export const EditActionsAction: FC<EditActionsActionProps> = ({ row }) => {
  const {
    icons: { CancelIcon, SaveIcon },
    itemForUpdate,
    localization,
    onRowEditSubmit,
    setItemForUpdate,
  } = useDataGrid();

  const onSaveButtonClick = async () => {
    setItemForUpdate(null);
    await onRowEditSubmit?.(itemForUpdate ?? row);
  };

  const onCancelButtonClick = () => {
    row.values = row.original;
    setItemForUpdate(null);
  };

  return (
    <EditActionsWrapper>
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
    </EditActionsWrapper>
  );
};

export default EditActionsAction;
