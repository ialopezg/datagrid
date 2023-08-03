import ArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import { IconButton, TableCell } from '@mui/material';
import React, { FC } from 'react';

import { useDataGrid } from '../providers';

interface ExpandAllRowsActionProps {}

export const ExpandAllRowsAction: FC<ExpandAllRowsActionProps> = () => {
  const { hasExpandedRows, localization, table } = useDataGrid();

  return (
    <TableCell
      size="small"
      {...table.getToggleAllRowsExpandedProps()}
      style={{
        padding: '0.5rem',
        paddingRight: '0',
        width: '3rem',
      }}
    >
      <IconButton
        aria-label={localization?.expandAll}
        title={localization?.expandAll}
      >
        <ArrowRightIcon
          fontSize="small"
          style={{
            transform: table.isAllRowsExpanded
              ? 'rotate(-180deg)'
              : hasExpandedRows
              ? 'rotate(-90deg)'
              : 'rotate(0)',
            transition: 'all 0.2s',
          }}
        />
      </IconButton>
    </TableCell>
  );
};

export default ExpandAllRowsAction;
