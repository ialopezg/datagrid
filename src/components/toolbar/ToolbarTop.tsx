import MuiToolbar from '@mui/material/Toolbar';
import { styled, Typography } from '@mui/material';
import React, { FC } from 'react';

import { useDataGrid } from '../providers';
import SearchTextField from '../inputs/SearchTextField';
import Pagination from './Pagination';
import ToolbarActions from './ToolbarActions';

const StyledToolbar = styled(MuiToolbar)({
  display: 'grid',
});

const ToolbarTopRow = styled('div')({
  padding: '0.5rem',
  display: 'flex',
  justifyContent: 'space-between',
});

const ToolbarActionsContainer = styled('div')({
  display: 'flex',
  gap: '0.5rem',
});

interface ToolbarTopProps {}

export const ToolbarTop: FC<ToolbarTopProps> = () => {
  const {
    disableColumnHiding,
    disableFilters,
    disableGlobalFilter,
    hideToolbarActions,
    manualPagination,
    paginationPosition,
    table,
    title,
    titleProps,
    toolbarActionsPosition,
    toolbarTopProps,
  } = useDataGrid();

  if (
    !toolbarTopProps &&
    !title &&
    disableColumnHiding &&
    disableFilters &&
    !disableGlobalFilter
  ) {
    return null;
  }

  const toolbarProps =
    toolbarTopProps instanceof Function
      ? toolbarTopProps(table)
      : toolbarTopProps;

  return (
    <StyledToolbar variant="dense" {...toolbarProps}>
      <ToolbarTopRow>
        {title ? (
          <Typography variant="h5" {...titleProps}>
            {title}
          </Typography>
        ) : (
          <span />
        )}

        <ToolbarActionsContainer>
          {!disableGlobalFilter && <SearchTextField />}
          {!hideToolbarActions && toolbarActionsPosition === 'top' && (
            <ToolbarActions />
          )}
        </ToolbarActionsContainer>
      </ToolbarTopRow>

      <div>
        {!manualPagination &&
          ['top', 'both'].includes(paginationPosition ?? '') && <Pagination />}
      </div>
    </StyledToolbar>
  );
};

export default ToolbarTop;
