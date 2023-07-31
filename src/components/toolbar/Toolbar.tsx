import MuiToolbar from '@mui/material/Toolbar';
import { styled, Typography } from '@mui/material';
import React, { FC } from 'react';

import { useDataGrid } from '../providers';
import { SearchTextField } from '../inputs';

const StyledToolbar = styled(MuiToolbar)({
  padding: '0.5rem',
  display: 'flex',
  justifyContent: 'space-between',
});

interface ToolbarProps {}

export const Toolbar: FC<ToolbarProps> = () => {
  const { enableSearch, table, title, titleProps, CustomToolbarComponent } =
    useDataGrid();

  if (CustomToolbarComponent) {
    return <>{CustomToolbarComponent(table)}</>;
  }

  return (
    <StyledToolbar>
      {title ? <Typography {...titleProps}>{title}</Typography> : <span />}
      {enableSearch && <SearchTextField />}
    </StyledToolbar>
  );
};

export default Toolbar;
