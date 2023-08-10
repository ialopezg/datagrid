import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import { IconButton, Tooltip } from '@mui/material';
import React, { FC } from 'react';

import { useDataGrid } from '../providers';

interface ToggleFullScreenActionProps {}

export const ToggleFullScreenAction: FC<ToggleFullScreenActionProps> = () => {
  const { fullScreen, localization, setFullScreen } = useDataGrid();

  return (
    <Tooltip arrow title={localization?.toggleFullScreen}>
      <IconButton
        aria-label={localization?.toggleFullScreen}
        onClick={() => setFullScreen(!fullScreen)}
        size="small"
      >
        {fullScreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
      </IconButton>
    </Tooltip>
  );
};

export default ToggleFullScreenAction;
