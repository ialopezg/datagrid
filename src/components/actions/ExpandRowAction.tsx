import MoreIcon from '@mui/icons-material/ExpandMore';
import { IconButton, TableCell } from '@mui/material';
import { Row } from 'react-table';
import React, { FC } from 'react';
import { useDataGrid } from '../providers';

interface ExpandRowActionProps {
  row: Row;
}

export const ExpandRowAction: FC<ExpandRowActionProps> = ({ row }) => {
  const { localization } = useDataGrid();

  return (
    <TableCell
      size="small"
      {...row.getToggleRowExpandedProps()}
      style={{
        padding: '0.5rem',
        paddingRight: '0',
        paddingLeft: `${row.depth + 0.5}rem`,
        width: '3rem',
        maxWidth: '3rem',
    }}
    >
      <IconButton
        aria-label={localization?.expand}
        title={localization?.expand}
      >
        <MoreIcon
          fontSize="small"
          style={{
            transform: row.isExpanded ? 'rotate(-180deg)' : 'rotate(0)',
            transition: 'transform 0.2s',
          }}
        />
      </IconButton>
    </TableCell>
  );
};

export default ExpandRowAction;
