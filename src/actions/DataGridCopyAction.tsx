import { IconButton, Tooltip } from '@mui/material';
import React, { FC, useState } from 'react';
import { DataGridCell } from '../DataGrid';
import { useDataGrid } from '../providers';

interface DataGridCopyActionProps {
  cell: DataGridCell;
}

export const DataGridCopyAction: FC<DataGridCopyActionProps> = ({ cell }) => {
  const {
    icons: { CopyIcon, CheckBoxIcon },
    localization,
  } = useDataGrid();

  // ** State
  const [copied, setCopied] = useState<boolean>(false);

  const onCopy = (value: string) => {
    void navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Tooltip
      title={copied ? localization.copiedToClipboard : localization.clickToCopy}
    >
      <IconButton
        aria-label={
          copied ? localization.copiedToClipboard : localization.clickToCopy
        }
        onClick={() => onCopy(cell.value)}
        size="small"
        sx={{
          opacity: 0.05,
          m: '0 0.5rem',
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            opacity: 1,
          },
        }}
      >
        {copied ? (
          <CheckBoxIcon color="success" fontSize="small" />
        ) : (
          <CopyIcon fontSize="small" />
        )}
      </IconButton>
    </Tooltip>
  );
};

export default DataGridCopyAction;
