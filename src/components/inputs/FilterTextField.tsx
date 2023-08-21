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
    headerCellFilterProps,
    icons: { CloseIcon, FilteringOnIcon },
    idPrefix,
    localization,
  } = useDataGrid();

  const defaultTextFieldProps =
    headerCellFilterProps instanceof Function
      ? headerCellFilterProps(column)
      : headerCellFilterProps;
  const columnTextFieldProps =
    column.headerCellFilterProps instanceof Function
      ? column.headerCellFilterProps(column)
      : headerCellFilterProps;
  const textFieldProps = {
    ...defaultTextFieldProps,
    ...columnTextFieldProps,
    style: {
      ...defaultTextFieldProps?.style,
      ...columnTextFieldProps?.style,
    },
  };

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
    <Tooltip
      arrow
      enterDelay={1000}
      enterNextDelay={1000}
      title={localization.filterByColumn?.replace(
        '{column}',
        String(column.Header),
      )}
    >
      <TextField
        fullWidth
        id={`datagrid-${idPrefix}-${column.id}-filter-column`}
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
            <InputAdornment position="start">
              <IconButton
                size="small"
                sx={{ height: '1.75rem', width: '1.75rem' }}
              >
                <FilteringOnIcon />
              </IconButton>
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <Tooltip arrow placement="right" title={localization.clearFilter}>
                <span>
                  <IconButton
                    aria-label={localization.clearFilter}
                    disabled={filterValue?.length === 0}
                    onClick={onClearFilter}
                    size="small"
                    sx={{ height: '1.75rem', width: '1.75rem' }}
                  >
                    <CloseIcon />
                  </IconButton>
                </span>
              </Tooltip>
            </InputAdornment>
          ),
        }}
        {...textFieldProps}
        sx={{ minWidth: '6rem' }}
      />
    </Tooltip>
  );
};

export default FilterTextField;
