import CloseIcon from '@mui/icons-material/Close';
import FilterIcon from '@mui/icons-material/FilterList';
import { IconButton, InputAdornment, TextField, Tooltip } from '@mui/material';
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
    return <>{column.Filter?.({ column })}</>;
  }

  return (
    <TextField
      fullWidth
      id={`datagrid-filter-${column.id}-column`}
      inputProps={{
        style: {
          textOverflow: 'ellipsis',
        },
      }}
      margin="dense"
      onChange={(e) => {
        setFilterValue(e.target.value);
        onFilterChange(e.target.value);
      }}
      onClick={(e) => e.stopPropagation()}
      placeholder={localization?.filterByColumn?.replace(
        '{column}',
        String(column.Header),
      )}
      value={filterValue ?? ''}
      variant="standard"
      InputProps={{
        startAdornment: (
          <Tooltip
            arrow
            title={localization?.filterByColumn?.replace(
              '{column}',
              String(column.Header),
            )}
          >
            <InputAdornment position="start">
              <FilterIcon />
            </InputAdornment>
          </Tooltip>
        ),
        endAdornment: (
          <InputAdornment position="end">
            <Tooltip arrow title={localization?.clearFilter}>
              <span>
                <IconButton
                  aria-label={localization?.clearFilter}
                  disabled={filterValue?.length === 0}
                  onClick={onClearFilter}
                  size="small"
                >
                  <CloseIcon />
                </IconButton>
              </span>
            </Tooltip>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default FilterTextField;
