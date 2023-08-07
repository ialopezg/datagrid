import MuiToolbar from '@mui/material/Toolbar';
import { styled, Typography } from '@mui/material';
import React, { FC } from 'react';

import { useDataGrid } from '../providers';
import SearchTextField from '../inputs/SearchTextField';
import ToolbarActions, { ToolbarActionsContainer } from './ToolbarActions';

const StyledToolbar = styled(MuiToolbar)({
  padding: '0.5rem',
  display: 'flex',
  justifyContent: 'space-between',
});

interface ToolbarProps {}

export const Toolbar: FC<ToolbarProps> = () => {
  const {
    disableColumnHiding,
    disableFilters,
    disableGlobalFilter,
    table,
    title,
    titleProps,
    toolbarProps: defaultToolbarProps,
  } = useDataGrid();

  if (
    !defaultToolbarProps &&
    !title &&
    disableColumnHiding &&
    disableFilters &&
    !disableGlobalFilter
  ) {
    return null;
  }

  const toolbarProps =
    defaultToolbarProps instanceof Function
      ? defaultToolbarProps(table)
      : defaultToolbarProps;

  return (
    <StyledToolbar variant="dense" {...toolbarProps}>
      {title ? (
        <Typography variant="h5" {...titleProps}>
          {title}
        </Typography>
      ) : (
        <span />
      )}
      <ToolbarActionsContainer>
        {!disableGlobalFilter && <SearchTextField />}
        <ToolbarActions />
      </ToolbarActionsContainer>
    </StyledToolbar>
  );
};

export default Toolbar;
