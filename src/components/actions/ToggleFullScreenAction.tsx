import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import { IconButton, IconButtonProps, Tooltip } from '@mui/material';
import React, { FC } from 'react';

import { useDataGrid } from '../providers';

interface ToggleFullScreenActionProps extends IconButtonProps {}

export const ToggleFullScreenAction: FC<ToggleFullScreenActionProps> = ({
  ...rest
}) => {
  const { fullScreen, localization, setFullScreen } = useDataGrid();

  return (
    <Tooltip arrow title={localization?.toggleFullScreen}>
      <IconButton
        aria-label={localization?.toggleFullScreen}
        onClick={() => setFullScreen(!fullScreen)}
        size="small"
        {...rest}
      >
        {fullScreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
      </IconButton>
    </Tooltip>
  );
};

export default ToggleFullScreenAction;
