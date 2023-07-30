import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { IconButton, TableCell } from '@mui/material';
import { Row } from 'react-table';
import React, { FC } from 'react';

interface ExpandRowProps {
  row: Row<object>;
}

export const ExpandRow: FC<ExpandRowProps> = ({ row }) => {
  return (
    <TableCell style={{ width: '2rem' }} size="small" variant="head">
      <IconButton onClick={() => row.toggleRowExpanded()} size="small">
        <ArrowForwardIosIcon
          fontSize="small"
          style={{
            transform: row.isExpanded ? 'rotate(90deg)' : 'rotate(0)',
            transition: 'transform 0.2s',
          }}
        />
      </IconButton>
    </TableCell>
  );
};

export default ExpandRow;
