import { IconButton, TableCell } from '@mui/material';
import React, { FC } from 'react';
import { tableBodyCellStyles } from '../body';

import { useDataGrid } from '../providers';

interface ExpandAllRowsActionProps {}

export const ExpandAllRowsAction: FC<ExpandAllRowsActionProps> = () => {
  const {
    densePadding,
    hasExpandedRows,
    icons: { ExpandAllIcon },
    localization,
    table,
  } = useDataGrid();

  return (
    <TableCell
      size="small"
      {...table.getToggleAllRowsExpandedProps()}
      sx={tableBodyCellStyles(densePadding)}
    >
      <IconButton
        aria-label={localization.expandAll}
        title={localization.expandAll}
      >
        <ExpandAllIcon
          style={{
            transform: `rotate(${
              table.isAllRowsExpanded ? -180 : hasExpandedRows ? -90 : 0
            }deg)`,
            transition: 'transform 0.2s',
          }}
        />
      </IconButton>
    </TableCell>
  );
};

export default ExpandAllRowsAction;
