import MuiToolbar from '@mui/material/Toolbar';
import { styled, Typography } from '@mui/material';
import React, { FC } from 'react';

import { useDataGrid } from '../providers';
import { SearchTextField } from '../inputs';
import { HideColumnsAction } from '../actions/HideColumnsAction';

const StyledToolbar = styled(MuiToolbar)({
  padding: '0.5rem',
  display: 'flex',
  justifyContent: 'space-between',
});

interface ToolbarProps {}

export const Toolbar: FC<ToolbarProps> = () => {
  const {
    enableColumnHiding,
    enableSearch,
    table,
    tableProps,
    title,
    titleProps,
    toolbarProps,
    CustomToolbarComponent,
  } = useDataGrid();

  if (CustomToolbarComponent) {
    return <>{CustomToolbarComponent(table)}</>;
  }

  if (!enableSearch && !title && !tableProps && !enableColumnHiding) {
    return null;
  }

  return (
    <StyledToolbar variant="dense" {...toolbarProps}>
      {title ? <Typography {...titleProps}>{title}</Typography> : <span />}
      {enableSearch && <SearchTextField />}
      {enableColumnHiding && <HideColumnsAction />}
    </StyledToolbar>
  );
};

export default Toolbar;
