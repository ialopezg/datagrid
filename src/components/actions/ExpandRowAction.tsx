import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
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
      style={{ width: '2rem' }}
      size="small"
      variant="head"
      {...row.getToggleRowExpandedProps({
        style: {
          paddingLeft: `${row.depth * 1.75 + 0.25}rem`,
        },
      })}
    >
      <IconButton
        aria-label={localization?.expand}
        title={localization?.expand}
      >
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
