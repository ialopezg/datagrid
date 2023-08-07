import { IconButton, Tooltip } from '@mui/material';
import ViewColumnIcon from '@mui/icons-material/ViewColumn';
import React, { FC, MouseEvent, useState } from 'react';

import { useDataGrid } from '../providers';
import ColumnVisibilityMenu from '../menus/ColumnVisibilityMenu';

interface ColumnsVisibilityActionProps {}

export const ColumnsVisibilityAction: FC<ColumnsVisibilityActionProps> = () => {
  const { localization } = useDataGrid();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const onToggleMenuAction = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <>
      <Tooltip arrow title={localization?.hideColumns}>
        <IconButton
          aria-label={localization?.hideColumns}
          onClick={onToggleMenuAction}
          size="small"
        >
          <ViewColumnIcon />
        </IconButton>
      </Tooltip>

      <ColumnVisibilityMenu anchorEl={anchorEl} setAnchorEl={setAnchorEl} />
    </>
  );
};

export default ColumnsVisibilityAction;
