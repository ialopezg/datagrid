import { alpha, Box, Toolbar } from '@mui/material';
import React, { FC } from 'react';

import { useDataGrid } from '../providers';
import SearchTextField from '../inputs/SearchTextField';
import Pagination from './Pagination';
import ToolbarActions from './ToolbarActions';
import ToolbarAlertBanner from './ToolbarAlertBanner';

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
          display: 'grid',
          p: '0 !important',
          position: table.state.fullScreen ? 'sticky' : undefined,
          top: table.state.fullScreen ? '0' : undefined,
          width: '100%',
          zIndex: 1,
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
        {customToolbarActions?.(table) ?? <span />}
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
    </Toolbar>
  );
};

export default ToolbarTop;
