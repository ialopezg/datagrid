import MuiArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import { IconButton, styled, TableCell } from '@mui/material';
import React, { FC } from 'react';

const ArrowRightIcon = styled(MuiArrowRightIcon, {
  shouldForwardProp: (prop: PropertyKey) => prop !== 'rotation',
})<{ rotation?: number }>(({ rotation }) => ({
  transform: `rotate(${rotation}deg)`,
  transition: 'transform 0.2s',
}));

import { useDataGrid } from '../providers';

interface ExpandAllRowsActionProps {
}

export const ExpandAllRowsAction: FC<ExpandAllRowsActionProps> = () => {
  const { densePadding, detailPanel, hasExpandedRows, localization, table } =
    useDataGrid();

  return (
    <TableCell
      size='small'
      {...table.getToggleAllRowsExpandedProps()}
      style={{
        padding: densePadding ? '0' : '0.5rem 0.5rem',
        transition: 'all 0.2s ease-in-out',
        width: `${detailPanel ? 2 : table.expandedDepth + 2}rem`,
      }}
    >
      <IconButton
        aria-label={localization?.expandAll}
        title={localization?.expandAll}
      >
        <ArrowRightIcon
          fontSize='small'
          rotation={table.isAllRowsExpanded ? -180 : hasExpandedRows ? -90 : 0}
        />
      </IconButton>
    </TableCell>
  );
};

export default ExpandAllRowsAction;
