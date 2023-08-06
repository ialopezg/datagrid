import FilterListOffIcon from '@mui/icons-material/FilterListOff';
import FilterListIcon from '@mui/icons-material/FilterList';
import { IconButton } from '@mui/material';
import React, { FC } from 'react';
import { useDataGrid } from '../providers';

interface FiltersVisibilityActionProps {}

export const FiltersVisibilityAction: FC<FiltersVisibilityActionProps> = () => {
  const { localization, setShowFilters, showFilters } = useDataGrid();

  return (
    <IconButton
      aria-label={localization?.toggleFilters}
      onClick={() => setShowFilters(!showFilters)}
      size="small"
      title={localization?.toggleFilters}
    >
      {showFilters ? <FilterListOffIcon /> : <FilterListIcon />}
    </IconButton>
  );
};

export default FiltersVisibilityAction;
