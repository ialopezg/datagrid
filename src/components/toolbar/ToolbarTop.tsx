import MuiToolbar from '@mui/material/Toolbar';
import { styled } from '@mui/material';
import React, { FC } from 'react';

import { useDataGrid } from '../providers';
import SearchTextField from '../inputs/SearchTextField';
import Pagination from './Pagination';
import ToolbarActions from './ToolbarActions';

const StyledToolbar = styled(MuiToolbar)({
  display: 'grid',
  padding: '0 0.5rem !important',
});

const ToolbarTopRow = styled('div')({
  padding: '0.5rem',
  display: 'flex',
  justifyContent: 'space-between',
});

const ToolbarActionsContainer = styled('div')({
  display: 'flex',
  gap: '0.5rem !important',
});

interface ToolbarTopProps {}

export const ToolbarTop: FC<ToolbarTopProps> = () => {
  const {
    disableGlobalFilter,
    hideToolbarActions,
    manualPagination,
    paginationPosition,
    table,
    toolbarActions,
    toolbarActionsPosition,
    toolbarTopProps,
  } = useDataGrid();

  const toolbarProps =
    toolbarTopProps instanceof Function
      ? toolbarTopProps(table)
      : toolbarTopProps;

  return (
    <StyledToolbar variant="dense" {...toolbarProps}>
      <ToolbarTopRow>
        {toolbarActions?.(table) ?? <span />}
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
