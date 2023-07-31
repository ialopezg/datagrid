import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { IconButton, TableCell } from '@mui/material';
import { Row } from 'react-table';
import React, { FC } from 'react';

interface ExpandRowActionProps {
  row: Row;
}

export const ExpandRowAction: FC<ExpandRowActionProps> = ({ row }) => {
  return (
    <TableCell
      style={{ width: '2rem' }}
      size="small"
      variant="head"
      {...row.getToggleRowExpandedProps({
        style: {
          paddingLeft: `${row.depth * 1.75 + 0.25}rem`,
        },
      })}
    >
      <IconButton>
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

export default ExpandRowAction;
