import MoreIcon from '@mui/icons-material/ExpandMore';
import { IconButton, TableCell } from '@mui/material';
import { Row } from 'react-table';
import React, { FC } from 'react';
import { useDataGrid } from '../providers';

interface ExpandRowActionProps {
  row: Row;
}

export const ExpandRowAction: FC<ExpandRowActionProps> = ({ row }) => {
  const { densePadding, detailPanel, localization, table } = useDataGrid();

  return (
    <TableCell
      size="small"
      style={{
        padding: densePadding ? '0' : '0.6rem 0',
        paddingLeft: `${row.depth + 0.5}rem`,
        transition: 'all 0.2s ease-in-out',
        width: `${detailPanel ? 2 : table.expandedDepth - row.depth + 2}rem`,
      }}
    >
      <IconButton
        disabled={!row.canExpand && !detailPanel}
        aria-label={localization?.expand}
        title={localization?.expand}
        {...row.getToggleRowExpandedProps()}
      >
        <MoreIcon
          fontSize={row.canExpand || detailPanel ? 'medium' : 'small'}
          style={{
            transform:
              !row.isExpanded && !detailPanel
                ? 'rotate(-90deg)'
                : row.isExpanded
                ? 'rotate(-180deg)'
                : 'rotate(0)',
            transition: 'transform 0.2s',
          }}
        />
      </IconButton>
    </TableCell>
  );
};

export default ExpandRowAction;
