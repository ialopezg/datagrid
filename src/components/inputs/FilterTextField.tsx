import CloseIcon from '@mui/icons-material/Close';
import FilterIcon from '@mui/icons-material/FilterList';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import { HeaderGroup, useAsyncDebounce } from 'react-table';
import React, { FC, useState } from 'react';

interface FilterTextFieldProps {
  column: HeaderGroup;
}

export const FilterTextField: FC<FilterTextFieldProps> = ({ column }) => {
  const [filterValue, setFilterValue] = useState<string>('');

  const onFilterChange = useAsyncDebounce((value) => {
    column.setFilter(value ?? undefined);
  }, 150);

  const onClearFilter = () => {
    setFilterValue('');
    column.setFilter(undefined);
  };

  return (
    <TextField
      margin="dense"
      onChange={(e) => {
        setFilterValue(e.target.value);
        onFilterChange(e.target.value);
      }}
      onClick={(e) => e.stopPropagation()}
      placeholder="Filter"
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
            <IconButton onClick={onClearFilter} size="small">
              <CloseIcon />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default FilterTextField;
