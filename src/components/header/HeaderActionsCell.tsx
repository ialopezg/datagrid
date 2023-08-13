import React, { FC } from 'react';

import { useDataGrid } from '../providers';
import { StyledHeaderCell } from './HeaderCell';

interface HeaderActionsCellProps {}

export const HeaderActionsCell: FC<HeaderActionsCellProps> = () => {
  const { densePadding, localization } = useDataGrid();

  return (
    <StyledHeaderCell
      densePadding={densePadding}
      style={{ textAlign: 'center' }}
    >
      {localization.actions}
    </StyledHeaderCell>
  );
};

export default HeaderActionsCell;
