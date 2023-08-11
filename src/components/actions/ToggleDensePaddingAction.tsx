import DensityMediumIcon from '@mui/icons-material/DensityMedium';
import DensitySmallIcon from '@mui/icons-material/DensitySmall';
import { IconButton, Tooltip } from '@mui/material';
import React, { FC } from 'react';

import { useDataGrid } from '../providers';

interface DensePaddingActionProps {}

export const ToggleDensePaddingAction: FC<DensePaddingActionProps> = () => {
  const { densePadding, localization, setDensePadding } = useDataGrid();

  return (
    <Tooltip arrow title={localization?.toggleDensePadding}>
      <IconButton
        aria-label={localization?.toggleDensePadding}
        onClick={() => setDensePadding(!densePadding)}
        size="small"
      >
        {densePadding ? <DensitySmallIcon /> : <DensityMediumIcon />}
      </IconButton>
    </Tooltip>
  );
};

export default ToggleDensePaddingAction;
