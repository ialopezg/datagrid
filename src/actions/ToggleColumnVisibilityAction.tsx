import { IconButton, IconButtonProps, Tooltip } from '@mui/material';
import React, { FC, MouseEvent, useState } from 'react';
import ColumnVisibilityMenu from '../menus/ColumnVisibilityMenu';

import { useDataGrid } from '../providers';

interface ColumnsVisibilityActionProps extends IconButtonProps {}

export const ToggleColumnVisibilityAction: FC<ColumnsVisibilityActionProps> = ({
  ...rest
}) => {
  const {
    localization,
    icons: { ColumnVisibilityIcon },
  } = useDataGrid();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const onToggleMenuAction = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <>
      <Tooltip arrow title={localization.toggleColumnVisibility}>
        <IconButton
          aria-label={localization.toggleColumnVisibility}
          onClick={onToggleMenuAction}
          size="small"
          {...rest}
        >
          <ColumnVisibilityIcon />
        </IconButton>
      </Tooltip>

      <ColumnVisibilityMenu anchorEl={anchorEl} setAnchorEl={setAnchorEl} />
    </>
  );
};

export default ToggleColumnVisibilityAction;
