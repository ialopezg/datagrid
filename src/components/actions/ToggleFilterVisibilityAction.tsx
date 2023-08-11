import FilterListOffIcon from '@mui/icons-material/FilterListOff';
import FilterListIcon from '@mui/icons-material/FilterList';
import { IconButton, Tooltip } from '@mui/material';
import React, { FC } from 'react';

import { useDataGrid } from '../providers';

interface FiltersVisibilityActionProps {}

export const ToggleFilterVisibilityAction: FC<FiltersVisibilityActionProps> = () => {
  const { localization, setShowFilters, showFilters } = useDataGrid();

  return (
    <Tooltip arrow title={localization?.toggleFilters}>
      <IconButton
        aria-label={localization?.toggleFilters}
        onClick={() => setShowFilters(!showFilters)}
        size="small"
      >
        {showFilters ? <FilterListOffIcon /> : <FilterListIcon />}
      </IconButton>
    </Tooltip>
  );
};

export default ToggleFilterVisibilityAction;
