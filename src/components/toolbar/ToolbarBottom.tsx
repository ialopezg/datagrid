import { alpha, Toolbar } from '@mui/material';
import React, { FC } from 'react';

import { useDataGrid } from '../providers';
import ToolbarActions from './ToolbarActions';
import Pagination from './Pagination';
import ToolbarAlertBanner from './ToolbarAlertBanner';

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
    <Toolbar
      variant="dense"
      {...toolbarProps}
      sx={(theme) =>
        ({
          backgroundColor: theme.palette.background.default,
          backgroundImage: `linear-gradient(${alpha(
            theme.palette.common.white,
            0.05,
          )},${alpha(theme.palette.common.white, 0.05)})`,
          bottom: fullScreen ? '0' : undefined,
          display: 'flex',
          justifyContent: 'space-between',
          overflowY: 'hidden',
          p: '0 0.5rem !important',
          position: fullScreen ? 'fixed' : undefined,
          width: 'calc(100% - 1rem)',
          zIndex: 1,
          ...toolbarProps?.sx,
        } as any)
      }
    >
      {!hideToolbarActions && toolbarActionsPosition === 'bottom' ? (
        <ToolbarActions />
      ) : (
        <span />
      )}

      {toolbarAlertBannerPosition === 'bottom' && <ToolbarAlertBanner />}

      {!manualPagination &&
        ['bottom', 'both'].includes(paginationPosition ?? '') && <Pagination />}
    </Toolbar>
  );
};

export default ToolbarBottom;
