import FilterListOffIcon from '@mui/icons-material/FilterListOff';
import FilterListIcon from '@mui/icons-material/FilterList';
import { IconButton, IconButtonProps, Tooltip } from '@mui/material';
import React, { FC } from 'react';

import { useDataGrid } from '../providers';

interface FiltersVisibilityActionProps extends IconButtonProps {}

export const ToggleFilterVisibilityAction: FC<FiltersVisibilityActionProps> = ({
  ...rest
}) => {
  const { localization, setShowFilters, showFilters } = useDataGrid();

  return (
    <Tooltip arrow title={localization?.toggleFilters}>
      <IconButton
        aria-label={localization?.toggleFilters}
        onClick={() => setShowFilters(!showFilters)}
        size="small"
        {...rest}
      >
        {showFilters ? <FilterListOffIcon /> : <FilterListIcon />}
      </IconButton>
    </Tooltip>
  );
};

export default ToggleFilterVisibilityAction;
