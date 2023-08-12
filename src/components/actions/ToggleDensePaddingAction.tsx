import DensityMediumIcon from '@mui/icons-material/DensityMedium';
import DensitySmallIcon from '@mui/icons-material/DensitySmall';
import { IconButton, IconButtonProps, Tooltip } from '@mui/material';
import React, { FC } from 'react';

import { useDataGrid } from '../providers';

interface DensePaddingActionProps extends IconButtonProps {}

export const ToggleDensePaddingAction: FC<DensePaddingActionProps> = ({
  ...rest
}) => {
  const { densePadding, localization, setDensePadding } = useDataGrid();

  return (
    <Tooltip arrow title={localization?.toggleDensePadding}>
      <IconButton
        aria-label={localization?.toggleDensePadding}
        onClick={() => setDensePadding(!densePadding)}
        size="small"
        {...rest}
      >
        {densePadding ? <DensitySmallIcon /> : <DensityMediumIcon />}
      </IconButton>
    </Tooltip>
  );
};

export default ToggleDensePaddingAction;
