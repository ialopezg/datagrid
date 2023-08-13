import { IconButton, IconButtonProps, Tooltip } from '@mui/material';
import React, { FC } from 'react';

import { useDataGrid } from '../providers';

interface FiltersVisibilityActionProps extends IconButtonProps {}

export const ToggleFilterVisibilityAction: FC<FiltersVisibilityActionProps> = ({
  ...rest
}) => {
  const {
    icons: { FilteringOffIcon, FilteringOnIcon },
    localization,
    setShowFilters,
    showFilters,
  } = useDataGrid();

  return (
    <Tooltip arrow title={localization.toggleFilters}>
      <IconButton
        aria-label={localization.toggleFilters}
        onClick={() => setShowFilters(!showFilters)}
        size="small"
        {...rest}
      >
        {showFilters ? <FilteringOffIcon /> : <FilteringOnIcon />}
      </IconButton>
    </Tooltip>
  );
};

export default ToggleFilterVisibilityAction;
