import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import MuiTextField from '@mui/material/TextField';
import { IconButton, InputAdornment, styled } from '@mui/material';
import React, { ChangeEvent, FC, useState } from 'react';

import { useDataGrid } from '../providers';
import { useAsyncDebounce } from 'react-table';

const TextField = styled(MuiTextField)({
  justifySelf: 'end',
});

interface SearchTextFieldProps {}

export const SearchTextField: FC<SearchTextFieldProps> = () => {
  const { localization, onSearchChange } = useDataGrid();
  const { searchProps, table } = useDataGrid();
  const [searchValue, setSearchValue] = useState<string>('');

  const handleChange = useAsyncDebounce((e) => {
    table.setGlobalFilter(e.target.value ?? undefined);
    onSearchChange?.(e);
  }, 200);

  const onClearFilter = () => {
    setSearchValue('');
    table.setGlobalFilter(undefined);
  };

  return (
    <TextField
      onChange={(e: ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value);
        handleChange(e.target.value);
      }}
      placeholder={localization?.search}
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
              aria-label={localization?.clear}
              disabled={searchValue.length === 0}
              onClick={onClearFilter}
              size="small"
              title={localization?.clear}
            >
              <CloseIcon />
            </IconButton>
          </InputAdornment>
        ),
      }}
      {...searchProps}
    />
  );
};

export default SearchTextField;
