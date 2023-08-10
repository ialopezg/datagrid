import SearchIcon from '@mui/icons-material/Search';
import SearchOffIcon from '@mui/icons-material/SearchOff';
import { IconButton, Tooltip } from '@mui/material';
import React, { FC } from 'react';

import { useDataGrid } from '../providers';

interface ToggleSearchActionProps {}

export const ToggleSearchAction: FC<ToggleSearchActionProps> = () => {
  const { localization, setShowSearch, showSearch } = useDataGrid();

  return (
    <Tooltip arrow title={localization?.toggleSearch}>
      <IconButton onClick={() => setShowSearch(!showSearch)} size="small">
        {showSearch ? <SearchOffIcon /> : <SearchIcon />}
      </IconButton>
    </Tooltip>
  );
};

export default ToggleSearchAction;
