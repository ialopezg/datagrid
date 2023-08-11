import { styled } from '@mui/material';
import React, { FC } from 'react';
import { useDataGrid } from '../providers';
import ToggleFilterVisibilityAction from '../actions/ToggleFilterVisibilityAction';
import ToggleColumnVisibilityAction from '../actions/ToggleColumnVisibilityAction';
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
    defaultToolbarActions,
    disableColumnHiding,
    disableDensePadding,
    disableFilters,
    disableFullScreen,
    disableGlobalFilter,
    table,
  } = useDataGrid();

  if (defaultToolbarActions) {
    return (
      <>
        {defaultToolbarActions(table, {
          ToggleSearchAction,
          ToggleFilterVisibilityAction,
          ToggleColumnVisibilityAction,
          ToggleDensePaddingAction,
          ToggleFullScreenAction,
        })}
      </>
    );
  }

  return (
    <ToolbarActionsContainer>
      {!disableGlobalFilter && <ToggleSearchAction />}
      {!disableFilters && <ToggleFilterVisibilityAction />}
      {!disableColumnHiding && <ToggleColumnVisibilityAction />}
      {!disableDensePadding && <ToggleDensePaddingAction />}
      {!disableFullScreen && <ToggleFullScreenAction />}
    </ToolbarActionsContainer>
  );
};

export default ToolbarActions;
