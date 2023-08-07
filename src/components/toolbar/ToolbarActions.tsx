import { styled } from '@mui/material';
import React, { FC } from 'react';
import { useDataGrid } from '../providers';
import FiltersVisibilityAction from '../actions/FiltersVisibilityAction';
import { ColumnsVisibilityAction } from '../actions';
import DensePaddingAction from '../actions/DensePaddingAction';

export const ToolbarActionsContainer = styled('div')({
  display: 'flex',
  gap: '0.5rem',
});

interface ToolbarActionsProps {}

export const ToolbarActions: FC<ToolbarActionsProps> = () => {
  const { disableColumnHiding, disableDensePadding, disableFilters } =
    useDataGrid();

  return (
    <ToolbarActionsContainer>
      {!disableFilters && <FiltersVisibilityAction />}
      {!disableColumnHiding && <ColumnsVisibilityAction />}
      {!disableDensePadding && <DensePaddingAction />}
    </ToolbarActionsContainer>
  );
};

export default ToolbarActions;
