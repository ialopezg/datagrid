import { IconButton, IconButtonProps, Tooltip } from '@mui/material';
import React, { FC } from 'react';

import { useDataGrid } from '../providers';

interface ToggleFullScreenActionProps extends IconButtonProps {}

export const ToggleFullScreenAction: FC<ToggleFullScreenActionProps> = ({
  ...rest
}) => {
  const {
    icons: { FullScreenOffIcon, FullScreenOnIcon },
    localization,
    setFullScreen,
    table: {
      state: { fullScreen },
    },
  } = useDataGrid();

  return (
    <Tooltip arrow title={localization.toggleFullScreen}>
      <IconButton
        aria-label={localization.toggleFullScreen}
        onClick={() => setFullScreen(!fullScreen)}
        size="small"
        {...rest}
      >
        {fullScreen ? <FullScreenOffIcon /> : <FullScreenOnIcon />}
      </IconButton>
    </Tooltip>
  );
};

export default ToggleFullScreenAction;
