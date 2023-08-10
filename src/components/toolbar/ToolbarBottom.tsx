import MuiToolbar from '@mui/material/Toolbar';
import { styled } from '@mui/material';
import React, { FC } from 'react';

import { useDataGrid } from '../providers';
import ToolbarActions from './ToolbarActions';
import Pagination from './Pagination';

const StyledToolbar = styled(MuiToolbar)({
  display: 'flex',
  justifyContent: 'space-between',
});

interface ToolbarBottomProps {}

export const ToolbarBottom: FC<ToolbarBottomProps> = () => {
  const {
    hideToolbarActions,
    manualPagination,
    paginationPosition,
    table,
    toolbarBottomProps,
    toolbarActionsPosition,
  } = useDataGrid();

  const toolbarProps =
    toolbarBottomProps instanceof Function
      ? toolbarBottomProps(table)
      : toolbarBottomProps;

  return (
    <StyledToolbar style={{ padding: 0 }} variant="dense" {...toolbarProps}>
      {!hideToolbarActions && toolbarActionsPosition === 'bottom' ? (
        <ToolbarActions />
      ) : (
        <span />
      )}

      {!manualPagination &&
        ['bottom', 'both'].includes(paginationPosition ?? '') && <Pagination />}
    </StyledToolbar>
  );
};

export default ToolbarBottom;
