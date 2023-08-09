import MuiExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MuiTableCell from '@mui/material/TableCell';
import { IconButton, styled } from '@mui/material';
import { Row } from 'react-table';
import React, { FC } from 'react';

import { useDataGrid } from '../providers';

const TableCell = styled(MuiTableCell, {
  shouldForwardProp: (prop: PropertyKey) => prop !== 'densePadding' && prop !== 'dept',
})<{ densePadding?: boolean, depth?: number }>(({ densePadding, depth }) => ({
  padding: densePadding ? '0' : '0.6rem',
  paddingLeft: `${depth + 0.5}rem`,
  transition: 'all 0.2s ease-in-out',
}));

const ExpandMoreIcon = styled(MuiExpandMoreIcon, {
  shouldForwardProp: (prop) => prop !== 'rotation',
})<{ rotation?: number }>(({ rotation }) => ({
  transform: `rotate(${rotation}deg)`,
  transition: 'transform 0.2s',
}));

interface ExpandRowActionProps {
  row: Row;
}

export const ExpandRowAction: FC<ExpandRowActionProps> = ({ row }) => {
  const {
    densePadding,
    detailPanel,
    localization,
    table,
  } = useDataGrid();

  return (
    <TableCell
      size='small'
      densePadding={densePadding}
      depth={row.depth}
    >
      <IconButton
        aria-label={localization?.expand}
        disabled={!row.canExpand && !detailPanel}
        title={localization?.expand}
        {...row.getToggleRowExpandedProps()}
      >
        <ExpandMoreIcon
          fontSize={row.canExpand || detailPanel ? 'medium' : 'small'}
          rotation={!row.canExpand && !detailPanel ? -90 : row.isExpanded ? -180 : 0}
        />
      </IconButton>
    </TableCell>
  );
};

export default ExpandRowAction;
