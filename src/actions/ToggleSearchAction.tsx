import { IconButton, IconButtonProps, Tooltip } from '@mui/material';
import React, { FC } from 'react';

import { useDataGrid } from '../providers';

interface ToggleSearchActionProps extends IconButtonProps {}

export const ToggleSearchAction: FC<ToggleSearchActionProps> = ({
  ...rest
}) => {
  const {
    icons: { SearchIcon, SearchOffIcon },
    idPrefix,
    localization,
    searchTextFieldProps,
    setShowSearch,
    table: {
      state: { showSearch },
    },
  } = useDataGrid();

  const onToggleSearchBox = () => {
    setShowSearch(!showSearch);
    setTimeout(
      () =>
        document
          .getElementById(
            searchTextFieldProps?.id ?? `datagrid-${idPrefix}-search-box`,
          )
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
