import { IconButton, TableCell } from '@mui/material';
import React, { FC } from 'react';

import { useDataGrid } from '../providers';
import AllOutIcon from '@mui/icons-material/AllOut';

interface ExpandAllRowsProps {}

export const ExpandAllRows: FC<ExpandAllRowsProps> = () => {
  const { table } = useDataGrid();

  return (
    <TableCell
      size="small"
      variant="head"
      {...table.getToggleAllRowsExpandedProps({
        style: { width: '2rem' },
      })}
    >
      <IconButton>
        <AllOutIcon
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

export default ExpandAllRows;
