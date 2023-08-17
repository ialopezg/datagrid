import { TableCell } from '@mui/material';
import React, { FC } from 'react';

import { useDataGrid } from '../providers';
import { tableHeaderCellStyles } from './HeaderCell';

interface HeaderActionsCellProps {}

export const HeaderActionsCell: FC<HeaderActionsCellProps> = () => {
  const { densePadding, localization } = useDataGrid();

  return (
    <TableCell
      style={{ textAlign: 'center' }}
      sx={{ ...tableHeaderCellStyles(densePadding), textAlign: 'center' }}
    >
      {localization.actions}
    </TableCell>
  );
};

export default HeaderActionsCell;
