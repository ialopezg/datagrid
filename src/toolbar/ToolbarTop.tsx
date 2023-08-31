import { alpha, Box, Theme, Toolbar } from '@mui/material';
import React, { FC } from 'react';
import { DataGridInstance } from '../DataGrid';

import { useDataGrid } from '../providers';
import SearchTextField from '../inputs/SearchTextField';
import LinearProgressBar from '../table/LinearProgressBar';
import Pagination from './Pagination';
import ToolbarActions from './ToolbarActions';
import ToolbarAlertBanner from './ToolbarAlertBanner';

export const commonToolbarStyles = (theme: Theme, table: DataGridInstance) => ({
  backgroundColor: theme.palette.background.default,
  backgroundImage: `linear-gradient(${alpha(
    theme.palette.common.white,
    0.05,
  )},${alpha(theme.palette.common.white, 0.05)})`,
  display: 'grid',
  opacity: table.state.fullScreen ? 0.95 : 1,
  p: '0 !important',
  width: '100%',
  zIndex: 1,
});

interface ToolbarTopProps {}

export const ToolbarTop: FC<ToolbarTopProps> = () => {
  const {
    toolbarCustomActions,
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
    <Toolbar
      variant="dense"
      {...toolbarProps}
      sx={(theme) =>
        ({
          position: table.state.fullScreen ? 'sticky' : undefined,
          top: table.state.fullScreen ? '0' : undefined,
          ...commonToolbarStyles(theme, table),
          ...toolbarProps?.sx,
        } as any)
      }
    >
      {toolbarAlertBannerPosition === 'top' && <ToolbarAlertBanner />}

      <Box
        sx={{
          p: '0.5rem',
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        {toolbarCustomActions?.(table) ?? <span />}
        <Box
          sx={{
            display: 'flex',
            gap: '0.5rem',
            position: 'relative',
            zIndex: 3,
          }}
        >
          {!disableGlobalFilter && <SearchTextField />}
          {!hideToolbarActions && toolbarActionsPosition === 'top' && (
            <ToolbarActions />
          )}
        </Box>
      </Box>

      <div>
        {!manualPagination &&
          ['top', 'both'].includes(paginationPosition ?? '') && <Pagination />}
      </div>

      <LinearProgressBar />
    </Toolbar>
  );
};

export default ToolbarTop;
