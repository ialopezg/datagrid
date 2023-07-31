import DoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import { IconButton, TableCell } from '@mui/material';
import React, { FC } from 'react';

import { useDataGrid } from '../providers';

interface ExpandAllRowsActionProps {}

export const ExpandAllRowsAction: FC<ExpandAllRowsActionProps> = () => {
  const { localization, table } = useDataGrid();

  return (
    <TableCell
      size="small"
      variant="head"
      {...table.getToggleAllRowsExpandedProps({
        style: { width: '2rem' },
      })}
    >
      <IconButton
        aria-label={localization?.expandAll}
        title={localization?.expandAll}
      >
        <DoubleArrowDownIcon
          fontSize="small"
          style={{
            transform: table.isAllRowsExpanded ? 'rotate(90deg)' : 'rotate(0)',
            transition: 'all 0.2s',
          }}
        />
      </IconButton>
    </TableCell>
  );
};

export default ExpandAllRowsAction;
