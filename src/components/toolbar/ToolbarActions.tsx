import { styled } from '@mui/material';
import React, { FC } from 'react';
import { useDataGrid } from '../providers';
import FiltersVisibilityAction from '../actions/FiltersVisibilityAction';
import { ColumnsVisibilityAction } from '../actions';
import ToggleDensePaddingAction from '../actions/ToggleDensePaddingAction';
import ToggleSearchAction from '../actions/ToggleSearchAction';
import ToggleFullScreenAction from '../actions/ToggleFullScreenAction';

export const ToolbarActionsContainer = styled('div')({
  display: 'flex',
  gap: '0.5rem',
  alignItems: 'center',
});

interface ToolbarActionsProps {}

export const ToolbarActions: FC<ToolbarActionsProps> = () => {
  const {
    disableColumnHiding,
    disableDensePadding,
    disableFilters,
    disableFullScreen,
    disableGlobalFilter,
  } = useDataGrid();

  return (
    <ToolbarActionsContainer>
      {!disableGlobalFilter && <ToggleSearchAction />}
      {!disableFilters && <FiltersVisibilityAction />}
      {!disableColumnHiding && <ColumnsVisibilityAction />}
      {!disableDensePadding && <ToggleDensePaddingAction />}
      {!disableFullScreen && <ToggleFullScreenAction />}
    </ToolbarActionsContainer>
  );
};

export default ToolbarActions;
