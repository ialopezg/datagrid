import { IconButton, InputAdornment, TextField, Tooltip } from '@mui/material';
import { useAsyncDebounce } from 'react-table';
import React, { FC, useState } from 'react';

import { DataGridHeaderGroup } from '../DataGrid';
import { useDataGrid } from '../providers';

interface FilterTextFieldProps {
  column: DataGridHeaderGroup;
}

export const FilterTextField: FC<FilterTextFieldProps> = ({ column }) => {
  const {
    icons: { CloseIcon, FilteringOnIcon },
    localization,
  } = useDataGrid();
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
      placeholder={localization.filterByColumn?.replace(
        '{column}',
        String(column.Header),
      )}
      value={filterValue ?? ''}
      variant="standard"
      InputProps={{
        startAdornment: (
          <Tooltip
            arrow
            title={localization.filterByColumn?.replace(
              '{column}',
              String(column.Header),
            )}
          >
            <InputAdornment position="start">
              <FilteringOnIcon />
            </InputAdornment>
          </Tooltip>
        ),
        endAdornment: (
          <InputAdornment position="end">
            <Tooltip arrow title={localization.clearFilter}>
              <span>
                <IconButton
                  aria-label={localization.clearFilter}
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
