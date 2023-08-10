import MuiArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import { IconButton, styled } from '@mui/material';
import React, { FC } from 'react';

import { useDataGrid } from '../providers';
import { TableButtonCell } from '../table';

const ArrowRightIcon = styled(MuiArrowRightIcon, {
  shouldForwardProp: (prop: PropertyKey) => prop !== 'rotation',
})<{
  rotation?: number;
}>(({ rotation }) => ({
  transform: `rotate(${rotation}deg)`,
  transition: 'transform 0.2s',
}));

interface ExpandAllRowsActionProps {}

export const ExpandAllRowsAction: FC<ExpandAllRowsActionProps> = () => {
  const { densePadding, hasExpandedRows, localization, table } =
    useDataGrid();

  return (
    <TableButtonCell
      size="small"
      densePadding={densePadding}
      {...table.getToggleAllRowsExpandedProps()}
    >
      <IconButton
        aria-label={localization?.expandAll}
        title={localization?.expandAll}
      >
        <ArrowRightIcon
          fontSize="small"
          rotation={table.isAllRowsExpanded ? -180 : hasExpandedRows ? -90 : 0}
        />
      </IconButton>
    </TableButtonCell>
  );
};

export default ExpandAllRowsAction;
