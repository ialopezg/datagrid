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
  const { searchProps, table } = useDataGrid();
  const [searchValue, setSearchValue] = useState<string>('');

  const onSearchChange = useAsyncDebounce((value) => {
    table.setGlobalFilter(value ?? undefined);
  }, 200);

  const onClearFilter = () => {
    setSearchValue('');
    table.setGlobalFilter(undefined);
  };

  return (
    <TextField
      onChange={(e: ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value);
        onSearchChange(e.target.value);
      }}
      placeholder="Search..."
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
            <IconButton onClick={onClearFilter} size="small">
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
