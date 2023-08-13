import { IconButton, IconButtonProps, Tooltip } from '@mui/material';
import React, { FC } from 'react';

import { useDataGrid } from '../providers';

interface ToggleSearchActionProps extends IconButtonProps {}

export const ToggleSearchAction: FC<ToggleSearchActionProps> = ({
  ...rest
}) => {
  const {
    icons: { SearchIcon, SearchOffIcon },
    localization,
    searchBoxProps,
    setShowSearch,
    showSearch,
  } = useDataGrid();

  const onToggleSearchBox = () => {
    setShowSearch(!showSearch);
    setTimeout(
      () =>
        document
          .getElementById(searchBoxProps?.id ?? 'datagrid-search-box')
          ?.focus(),
      200,
    );
  };

  return (
    <Tooltip arrow title={localization.toggleSearch}>
      <IconButton onClick={onToggleSearchBox} size="small" {...rest}>
        {showSearch ? <SearchOffIcon /> : <SearchIcon />}
      </IconButton>
    </Tooltip>
  );
};

export default ToggleSearchAction;
