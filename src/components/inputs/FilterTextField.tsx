import {
  Chip,
  IconButton,
  InputAdornment,
  TextField,
  TextFieldProps,
  Tooltip,
} from '@mui/material';
import { useAsyncDebounce } from 'react-table';
import React, { FC, MouseEvent, useState } from 'react';

import { DataGridHeaderGroup } from '../DataGrid';
import FilterTypeMenu from '../menus/FilterTypeMenu';
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
    setCurrentFilterTypes,
    table,
  } = useDataGrid();

  const defaultTextFieldProps =
    headerCellFilterProps instanceof Function
      ? headerCellFilterProps(column)
      : headerCellFilterProps;
  const columnTextFieldProps =
    column.headerCellFilterProps instanceof Function
      ? column.headerCellFilterProps(column)
      : column.headerCellFilterProps;
  const textFieldProps = {
    ...defaultTextFieldProps,
    ...columnTextFieldProps,
    style: {
      ...defaultTextFieldProps?.style,
      ...columnTextFieldProps?.style,
    },
  } as TextFieldProps;

  const [filterValue, setFilterValue] = useState<string>('');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const onFilterModeClick = (e: MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const onFilterChange = useAsyncDebounce((value) => {
    column.setFilter(value ?? undefined);
  }, 150);

  const onClearFilter = () => {
    setFilterValue('');
    column.setFilter(undefined);
  };

  const onDeleteFilterModeChip = () => {
    setFilterValue('');
    column.setFilter(undefined);
    setCurrentFilterTypes((prev) => ({ ...prev, [column.id]: 'fuzzy' }));
  };

  if (column.Filter) {
    return <>{column.Filter?.({ column })}</>;
  }

  const filterType = table.state.currentFilterTypes[column.id];
  const showFilterChip = ['empty', 'notEmpty'].includes(filterType);
  const placeholder = localization.filterByColumn?.replace(
    '{column}',
    String(column.Header),
  );

  return (
    <>
      <TextField
        fullWidth
        id={`datagrid-${idPrefix}-${column.id}-filter-column`}
        inputProps={{
          style: {
            textOverflow: 'ellipsis',
          },
          title: placeholder,
        }}
        margin="none"
        onChange={(e) => {
          setFilterValue(e.target.value);
          onFilterChange(e.target.value);
        }}
        onClick={(e) => e.stopPropagation()}
        placeholder={
          showFilterChip
            ? ''
            : localization.filterByColumn?.replace(
                '{column}',
                String(column.Header),
              )
        }
        value={filterValue ?? ''}
        variant="standard"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Tooltip arrow title={localization.changeFilterMode}>
                <IconButton
                  onClick={onFilterModeClick}
                  size="small"
                  sx={{ height: '1.75rem', width: '1.75rem' }}
                >
                  <FilteringOnIcon />
                </IconButton>
              </Tooltip>
              {showFilterChip && (
                <Chip
                  label={
                    localization[filterType === 'empty' ? 'empty' : 'notEmpty']
                  }
                  onDelete={onDeleteFilterModeChip}
                />
              )}
            </InputAdornment>
          ),
          endAdornment: !showFilterChip && (
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
        sx={{ minWidth: '6rem', ...textFieldProps?.sx }}
      />

      <FilterTypeMenu
        anchorEl={anchorEl}
        column={column}
        setAnchorEl={setAnchorEl}
      />
    </>
  );
};

export default FilterTextField;
