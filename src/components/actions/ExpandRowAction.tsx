import { IconButton, styled } from '@mui/material';
import React, { FC } from 'react';

import { DataGridRow } from '../DataGrid';
import { useDataGrid } from '../providers';
import { ButtonCell } from '../table';

const TableCell = styled(ButtonCell, {
  shouldForwardProp: (prop: PropertyKey) => prop !== 'dept',
})<{
  depth: number;
}>(({ depth }) => ({
  paddingLeft: `${depth + 0.5}rem`,
  textAlign: 'left',
}));

interface ExpandRowActionProps {
  row: DataGridRow;
}

export const ExpandRowAction: FC<ExpandRowActionProps> = ({ row }) => {
  const {
    densePadding,
    detailPanel,
    icons: { ExpandIcon },
    localization,
  } = useDataGrid();

  return (
    <TableCell size="small" densePadding={densePadding} depth={row.depth}>
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
