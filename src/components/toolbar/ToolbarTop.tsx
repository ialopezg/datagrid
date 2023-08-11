import { alpha, styled, Toolbar } from '@mui/material';
import React, { FC } from 'react';

import { useDataGrid } from '../providers';
import SearchTextField from '../inputs/SearchTextField';
import Pagination from './Pagination';
import ToolbarActions from './ToolbarActions';
import ToolbarAlertBanner from './ToolbarAlertBanner';

const StyledToolbar = styled(Toolbar, {
  shouldForwardProp: (prop) => prop !== 'fullScreen',
})<{ fullScreen?: boolean }>(({ fullScreen, theme }) => ({
  backgroundColor: theme.palette.background.default,
  backgroundImage: `linear-gradient(${alpha(
    theme.palette.common.white,
    0.05,
  )}, ${alpha(theme.palette.common.white, 0.05)})`,
  display: 'grid',
  padding: '0 0.5rem !important',
  position: fullScreen ? 'sticky' : undefined,
  top: fullScreen ? '0' : undefined,
  width: 'calc(100% - 1rem)',
  zIndex: 1,
}));

const ToolbarTopRow = styled('div')({
  padding: '0.5rem',
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
    fullScreen,
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
    <StyledToolbar fullScreen={fullScreen} variant="dense" {...toolbarProps}>
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
