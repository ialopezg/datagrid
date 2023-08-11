import { alpha, styled, Toolbar } from '@mui/material';
import React, { FC } from 'react';

import { useDataGrid } from '../providers';
import ToolbarActions from './ToolbarActions';
import Pagination from './Pagination';
import ToolbarAlertBanner from './ToolbarAlertBanner';

const StyledToolbar = styled(Toolbar, {
  shouldForwardProp: (prop) => prop !== 'fullScreen',
})<{ fullScreen?: boolean }>(({ fullScreen, theme }) => ({
  backgroundColor: theme.palette.background.default,
  backgroundImage: `linear-gradient(${alpha(
    theme.palette.common.white,
    0.05,
  )}, ${alpha(theme.palette.common.white, 0.05)})`,
  bottom: fullScreen ? '0' : undefined,
  display: 'flex',
  justifyContent: 'space-between',
  overflowY: 'hidden',
  padding: '0 0.5rem !important',
  position: fullScreen ? 'fixed' : undefined,
  width: 'calc(100% - 1rem)',
  zIndex: 1,
}));

interface ToolbarBottomProps {}

export const ToolbarBottom: FC<ToolbarBottomProps> = () => {
  const {
    fullScreen,
    hideToolbarActions,
    manualPagination,
    paginationPosition,
    table,
    toolbarBottomProps,
    toolbarActionsPosition,
    toolbarAlertBannerPosition,
  } = useDataGrid();

  const toolbarProps =
    toolbarBottomProps instanceof Function
      ? toolbarBottomProps(table)
      : toolbarBottomProps;

  return (
    <StyledToolbar fullScreen={fullScreen} variant="dense" {...toolbarProps}>
      {!hideToolbarActions && toolbarActionsPosition === 'bottom' ? (
        <ToolbarActions />
      ) : (
        <span />
      )}

      {toolbarAlertBannerPosition === 'bottom' && <ToolbarAlertBanner />}

      {!manualPagination &&
        ['bottom', 'both'].includes(paginationPosition ?? '') && <Pagination />}
    </StyledToolbar>
  );
};

export default ToolbarBottom;
