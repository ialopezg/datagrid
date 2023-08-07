import CloseIcon from '@mui/icons-material/Close';
import FilterIcon from '@mui/icons-material/FilterList';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import { HeaderGroup, useAsyncDebounce } from 'react-table';
import React, { FC, useState } from 'react';
import { useDataGrid } from '../providers';

interface FilterTextFieldProps {
  column: HeaderGroup;
}

export const FilterTextField: FC<FilterTextFieldProps> = ({ column }) => {
  const { localization } = useDataGrid();
  const [filterValue, setFilterValue] = useState<string>('');

  const onFilterChange = useAsyncDebounce((value) => {
    column.setFilter(value ?? undefined);
  }, 150);

  const onClearFilter = () => {
    setFilterValue('');
    column.setFilter(undefined);
  };

  if (column.Filter) {
    // @ts-ignore
    return <>{column.Filter({ column })}</>;
  }

  return (
    <TextField
      margin="dense"
      onChange={(e) => {
        setFilterValue(e.target.value);
        onFilterChange(e.target.value);
      }}
      onClick={(e) => e.stopPropagation()}
      placeholder={localization?.filter}
      value={filterValue ?? ''}
      variant="standard"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <FilterIcon />
          </InputAdornment>
        ),
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label={localization?.clear}
              disabled={filterValue?.length === 0}
              onClick={onClearFilter}
              size="small"
              title={localization?.clear}
            >
              <CloseIcon />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default FilterTextField;
