import MuiTextField from '@mui/material/TextField';
import { Collapse, IconButton, InputAdornment, styled } from '@mui/material';
import { useAsyncDebounce } from 'react-table';
import React, { ChangeEvent, FC, useState } from 'react';

import { useDataGrid } from '../providers';

const TextField = styled(MuiTextField)({
  justifySelf: 'end',
});

interface SearchTextFieldProps {}

export const SearchTextField: FC<SearchTextFieldProps> = () => {
  const {
    icons: { CloseIcon, SearchIcon },
    localization,
    onGlobalFilterChange,
    searchBoxProps,
    showSearch,
    table,
  } = useDataGrid();
  const [searchValue, setSearchValue] = useState<string>('');

  const onSearchAction = useAsyncDebounce(
    (e: ChangeEvent<HTMLInputElement>) => {
      table.setGlobalFilter(e.target.value ?? undefined);
      onGlobalFilterChange?.(e);
    },
    200,
  );

  const onClearFilter = () => {
    setSearchValue('');
    table.setGlobalFilter(undefined);
  };

  return (
    <Collapse in={showSearch} orientation="horizontal">
      <TextField
        id="datagrid-search-box"
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          setSearchValue(e.target.value);
          onSearchAction(e);
        }}
        placeholder={localization.search}
        value={searchValue ?? ''}
        variant="standard"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon fontSize="small" />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label={localization.clearSearch}
                disabled={searchValue.length === 0}
                onClick={onClearFilter}
                size="small"
                title={localization.clearSearch}
              >
                <CloseIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
        {...searchBoxProps}
      />
    </Collapse>
  );
};

export default SearchTextField;
