import {
  Chip,
  IconButton,
  InputAdornment,
  MenuItem,
  TextField,
  TextFieldProps,
  Tooltip,
} from '@mui/material';
import { useAsyncDebounce } from 'react-table';
import React, { FC, MouseEvent, useState } from 'react';

import { DataGridHeaderGroup } from '../DataGrid';
import { DATAGRID_FILTER_TYPE } from '../DataGridFilterType';
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

  const [filterValue, setFilterValue] = useState<string>(column.filterValue);
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
    setCurrentFilterTypes((prev) => ({
      ...prev,
      [column.id]: DATAGRID_FILTER_TYPE.FUZZY,
    }));
  };

  if (column.Filter) {
    return <>{column.Filter?.({ column })}</>;
  }

  const filterType = table.state.currentFilterTypes[column.id];
  const isSelectFilter = !!column.filterSelectOptions;
  const isCustomFilter = filterType instanceof Function;
  const filterChipLabel =
    !isCustomFilter &&
    [DATAGRID_FILTER_TYPE.EMPTY, DATAGRID_FILTER_TYPE.NOT_EMPTY].includes(
      filterType as DATAGRID_FILTER_TYPE,
    );
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
          disabled: filterChipLabel,
          sx: {
            textOverflow: 'ellipsis',
            width: filterChipLabel ? 0 : undefined,
          },
          title: placeholder,
        }}
        label={isSelectFilter && !filterValue ? placeholder : undefined}
        margin="none"
        onChange={(e) => {
          setFilterValue(e.target.value);
          onFilterChange(e.target.value);
        }}
        onClick={(e) => e.stopPropagation()}
        placeholder={
          filterChipLabel || isSelectFilter ? undefined : placeholder
        }
        select={isSelectFilter}
        value={column.filterValue ?? ''}
        variant="standard"
        InputLabelProps={{
          shrink: false,
          sx: {
            maxWidth: 'calc(100% - 2.5rem)',
          },
          title: placeholder,
        }}
        InputProps={{
          startAdornment: !isSelectFilter && (
            <InputAdornment position="start">
              <Tooltip arrow title={localization.changeFilterMode}>
                <span>
                  <IconButton
                    onClick={onFilterModeClick}
                    size="small"
                    sx={{ height: '1.75rem', width: '1.75rem' }}
                  >
                    <FilteringOnIcon />
                  </IconButton>
                </span>
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
              <Tooltip
                arrow
                disableHoverListener={isSelectFilter}
                placement="right"
                title={localization.clearFilter}
              >
                <span>
                  <IconButton
                    aria-label={localization.clearFilter}
                    disabled={!filterValue?.length}
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
          mt: isSelectFilter && !filterValue ? '-1rem' : undefined,
          '& .MuiSelect-icon': { mr: '1.5rem' },
          ...textFieldProps?.sx,
        }}
      >
        {isSelectFilter && (
          <MenuItem divider disabled={!filterValue} value="">
            {localization.clearFilter}
          </MenuItem>
        )}
        {column?.filterSelectOptions?.map((option) => {
          let value;
          let text;
          if (typeof option === 'string') {
            value = option;
            text = option;
          } else if (typeof option === 'object') {
            value = option.value;
            text = option.text;
          }

          return (
            <MenuItem key={value} value={value}>
              {text}
            </MenuItem>
          );
        })}
      </TextField>

      <FilterModeMenu
        anchorEl={anchorEl}
        column={column}
        setAnchorEl={setAnchorEl}
      />
    </>
  );
};

export default FilterTextField;
