import { Button, Tooltip } from '@mui/material';
import React, { FC, useState } from 'react';
import { DataGridCell } from '../DataGrid';
import { useDataGrid } from '../providers';

interface DataGridCopyActionProps {
  cell: DataGridCell;
}

export const DataGridCopyAction: FC<DataGridCopyActionProps> = ({ cell }) => {
  const { localization } = useDataGrid();

  // ** State
  const [copied, setCopied] = useState<boolean>(false);

  const onCopy = (value: string) => {
    void navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 4000);
  };

  return (
    <Tooltip
      enterDelay={1000}
      enterNextDelay={1000}
      placement="top"
      title={copied ? localization.copiedToClipboard : localization.clickToCopy}
    >
      <Button
        aria-label={
          copied ? localization.copiedToClipboard : localization.clickToCopy
        }
        onClick={() => onCopy(cell.value)}
        size="small"
        sx={{
          backgroundColor: 'transparent',
          color: 'inherit',
          letterSpacing: 'inherit',
          fontFamily: 'inherit',
          fontSize: 'inherit',
          m: '-0.25rem',
          textTransform: 'inherit',
          textAlign: 'inherit',
          minWidth: 'unset',
        }}
        variant="text"
      >
        {cell.render('Cell')}
      </Button>
    </Tooltip>
  );
};

export default DataGridCopyAction;
