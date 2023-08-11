import MuiToolbar from '@mui/material/Toolbar';
import { styled } from '@mui/material';
import React, { FC } from 'react';

import { useDataGrid } from '../providers';
import SearchTextField from '../inputs/SearchTextField';
import Pagination from './Pagination';
import ToolbarActions from './ToolbarActions';
import ToolbarAlertBanner from './ToolbarAlertBanner';

const StyledToolbar = styled(MuiToolbar)({
  display: 'grid',
  padding: '0 0.5rem !important',
});

const ToolbarTopRow = styled('div')({
  padding: '1rem 0.5rem',
  display: 'flex',
  justifyContent: 'space-between',
});

const ToolbarActionsContainer = styled('div')({
  display: 'flex',
  gap: '0.5rem',
  position: 'relative',
  zIndex: 3,
});

interface ToolbarTopProps {}

export const ToolbarTop: FC<ToolbarTopProps> = () => {
  const {
    customToolbarActions,
    disableGlobalFilter,
    hideToolbarActions,
    manualPagination,
    paginationPosition,
    table,
    toolbarActionsPosition,
    toolbarAlertBannerPosition,
    toolbarTopProps,
  } = useDataGrid();

  const toolbarProps =
    toolbarTopProps instanceof Function
      ? toolbarTopProps(table)
      : toolbarTopProps;

  return (
    <StyledToolbar variant="dense" {...toolbarProps}>
      {toolbarAlertBannerPosition === 'top' && <ToolbarAlertBanner />}

      <ToolbarTopRow>
        {customToolbarActions?.(table) ?? <span />}
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
