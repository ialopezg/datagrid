import { IconButton, TableCell } from '@mui/material';
import React, { FC } from 'react';
import { tableBodyCellStyles } from '../body';

import { useDataGrid } from '../providers';

interface ExpandAllRowsActionProps {}

export const ExpandAllRowsAction: FC<ExpandAllRowsActionProps> = () => {
  const {
    hasExpandedRows,
    icons: { ExpandAllIcon },
    localization,
    table: {
      getToggleAllRowsExpandedProps,
      isAllRowsExpanded,
      state: { densePadding },
    },
  } = useDataGrid();

  return (
    <TableCell
      size="small"
      // @ts-ignore
      {...getToggleAllRowsExpandedProps()}
      sx={tableBodyCellStyles(densePadding)}
    >
      <IconButton
        aria-label={localization.expandAll}
        title={localization.expandAll}
      >
        <ExpandAllIcon
          style={{
            transform: `rotate(${
              isAllRowsExpanded ? -180 : hasExpandedRows ? -90 : 0
            }deg)`,
            transition: 'transform 0.2s',
          }}
        />
      </IconButton>
    </TableCell>
  );
};

export default ExpandAllRowsAction;
