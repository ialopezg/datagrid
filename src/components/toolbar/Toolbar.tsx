import MuiToolbar from '@mui/material/Toolbar';
import { styled, Typography } from '@mui/material';
import React, { FC } from 'react';

import { useDataGrid } from '../providers';
import { SearchTextField } from '../inputs';
import { ColumnsVisibilityAction } from '../actions/ColumnsVisibilityAction';

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
    customToolbarComponent,
  } = useDataGrid();

  if (customToolbarComponent) {
    return <>{customToolbarComponent(table)}</>;
  }

  if (!enableSearch && !title && !tableProps) {
    return null;
  }

  return (
    <StyledToolbar variant="dense" {...toolbarProps}>
      {title ? <Typography {...titleProps}>{title}</Typography> : <span />}
      {enableSearch && <SearchTextField />}
      {enableColumnHiding && <ColumnsVisibilityAction />}
    </StyledToolbar>
  );
};

export default Toolbar;
