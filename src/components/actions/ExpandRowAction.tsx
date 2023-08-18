import { IconButton, TableCell } from '@mui/material';
import React, { FC } from 'react';
import { actionBodyStyles } from '../body';

import { DataGridRow } from '../DataGrid';
import { useDataGrid } from '../providers';

interface ExpandRowActionProps {
  row: DataGridRow;
}

export const ExpandRowAction: FC<ExpandRowActionProps> = ({ row }) => {
  const {
    detailPanel,
    icons: { ExpandIcon },
    localization,
    table: {
      state: { densePadding },
    },
  } = useDataGrid();

  return (
    <TableCell
      size="small"
      sx={{
        ...actionBodyStyles(densePadding),
        pl: `${row.depth + 0.5}rem`,
        textAlign: 'left',
      }}
    >
      <IconButton
        aria-label={localization.expand}
        disabled={!row.canExpand && !detailPanel}
        title={localization.expand}
        {...row.getToggleRowExpandedProps()}
      >
        <ExpandIcon
          style={{
            transform: `rotate(${
              !row.canExpand && !detailPanel ? -90 : row.isExpanded ? -180 : 0
            }deg)`,
            transition: 'transform 0.2s',
          }}
        />
      </IconButton>
    </TableCell>
  );
};

export default ExpandRowAction;
