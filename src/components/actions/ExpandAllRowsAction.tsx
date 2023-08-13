import { IconButton } from '@mui/material';
import React, { FC } from 'react';

import { useDataGrid } from '../providers';
import { ButtonCell } from '../table';

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
    <ButtonCell
      size="small"
      densePadding={densePadding}
      {...table.getToggleAllRowsExpandedProps()}
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
    </ButtonCell>
  );
};

export default ExpandAllRowsAction;
