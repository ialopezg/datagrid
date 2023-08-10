import React, { FC } from 'react';

import { useDataGrid } from '../providers';
import { StyledTableHeaderCell } from './HeaderCell';

interface HeaderActionsCellProps {}

export const HeaderActionsCell: FC<HeaderActionsCellProps> = () => {
  const { densePadding, localization } = useDataGrid();

  return (
    <StyledTableHeaderCell
      densePadding={densePadding}
      style={{ textAlign: 'center' }}
    >
      {localization?.actions}
    </StyledTableHeaderCell>
  );
};

export default HeaderActionsCell;
