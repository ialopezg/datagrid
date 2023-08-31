import { Box, Toolbar } from '@mui/material';
import React, { FC } from 'react';

import { useDataGrid } from '../providers';
import LinearProgressBar from '../table/LinearProgressBar';
import ToolbarActions from './ToolbarActions';
import Pagination from './Pagination';
import ToolbarAlertBanner from './ToolbarAlertBanner';
import { commonToolbarStyles } from './ToolbarTop';

interface ToolbarBottomProps {}

export const ToolbarBottom: FC<ToolbarBottomProps> = () => {
  const {
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
          bottom: table.state.fullScreen ? '0' : undefined,
          position: table.state.fullScreen ? 'fixed' : undefined,
          ...commonToolbarStyles(theme, table),
          ...toolbarProps?.sx,
        } as any)
      }
    >
      <LinearProgressBar />
      <Box
        sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}
      >
        {!hideToolbarActions && toolbarActionsPosition === 'bottom' ? (
          <ToolbarActions />
        ) : (
          <span />
        )}

        {toolbarAlertBannerPosition === 'bottom' && <ToolbarAlertBanner />}

        {!manualPagination &&
          ['bottom', 'both'].includes(paginationPosition ?? '') && (
            <Pagination />
          )}
      </Box>
    </Toolbar>
  );
};

export default ToolbarBottom;
