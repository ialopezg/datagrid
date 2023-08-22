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
import FilterModeMenu from '../menus/FilterModeMenu';
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
  const filterChipLabel = ['empty', 'notEmpty'].includes(filterType);
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
            width: filterChipLabel ? 0 : 'auto',
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
          filterChipLabel
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
              {filterChipLabel && (
                <Chip
                  label={
                    localization[filterType === 'empty' ? 'empty' : 'notEmpty']
                  }
                  onDelete={onDeleteFilterModeChip}
                />
              )}
            </InputAdornment>
          ),
          endAdornment: !filterChipLabel && (
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
        sx={{
          m: '0 -0.25rem',
          minWidth: !filterChipLabel ? '5rem' : 'auto',
          width: 'calc(100% + 0.5rem)',
          ...textFieldProps?.sx,
        }}
      />

      <FilterModeMenu
        anchorEl={anchorEl}
        column={column}
        setAnchorEl={setAnchorEl}
      />
    </>
  );
};

export default FilterTextField;
