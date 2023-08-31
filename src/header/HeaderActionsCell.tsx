import { TableCell } from '@mui/material';
import React, { FC } from 'react';

import { useDataGrid } from '../providers';
import { commonTableHeaderCellStyles } from './HeaderCell';

interface HeaderActionsCellProps {}

export const HeaderActionsCell: FC<HeaderActionsCellProps> = () => {
  const {
    localization,
    table: {
      state: { densePadding },
    },
  } = useDataGrid();

  return (
    <TableCell
      style={{ textAlign: 'center' }}
      sx={{
        ...commonTableHeaderCellStyles(densePadding),
        textAlign: 'center',
        maxWidth: '4rem',
        width: '4rem',
      }}
    >
      {localization.actions}
    </TableCell>
  );
};

export default HeaderActionsCell;
