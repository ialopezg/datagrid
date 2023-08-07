import MuiToolbar from '@mui/material/Toolbar';
import { styled } from '@mui/material';
import React, { FC } from 'react';

import { useDataGrid } from '../providers';
import ToolbarActions from './ToolbarActions';
import Pagination from './Pagination';

const StyledToolbar = styled(MuiToolbar)({
  padding: 0,
  display: 'flex',
  justifyContent: 'space-between',
});

interface ToolbarBottomProps {}

export const ToolbarBottom: FC<ToolbarBottomProps> = () => {
  const {
    disableColumnHiding,
    disableFilters,
    disableGlobalFilter,
    hideToolbarActions,
    manualPagination,
    paginationPosition,
    table,
    title,
    toolbarBottomProps,
    toolbarActionsPosition,
  } = useDataGrid();

  if (
    !toolbarBottomProps &&
    !title &&
    disableColumnHiding &&
    disableFilters &&
    !disableGlobalFilter
  ) {
    return null;
  }

  const toolbarProps =
    toolbarBottomProps instanceof Function
      ? toolbarBottomProps(table)
      : toolbarBottomProps;

  return (
    <StyledToolbar variant="dense" {...toolbarProps}>
      {!hideToolbarActions && toolbarActionsPosition === 'bottom' ? (
        <ToolbarActions />
      ) : (
        <span />
      )}

      {!manualPagination &&
        ['bottom', 'both'].includes(paginationPosition ?? '') && (
          <Pagination />
        )}
    </StyledToolbar>
  );
};

export default ToolbarBottom;
