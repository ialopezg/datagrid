import { IconButton, IconButtonProps, Tooltip } from '@mui/material';
import React, { FC } from 'react';

import { useDataGrid } from '../providers';

interface DensePaddingActionProps extends IconButtonProps {}

export const ToggleDensePaddingAction: FC<DensePaddingActionProps> = ({
  ...rest
}) => {
  const {
    icons: { DensityPaddingMediumIcon, DensityPaddingSmallIcon },
    localization,
    setDensePadding,
    table: {
      state: { densePadding },
    },
  } = useDataGrid();

  return (
    <Tooltip arrow title={localization.toggleDensePadding}>
      <IconButton
        aria-label={localization.toggleDensePadding}
        onClick={() => setDensePadding(!densePadding)}
        size="small"
        {...rest}
      >
        {densePadding ? (
          <DensityPaddingSmallIcon />
        ) : (
          <DensityPaddingMediumIcon />
        )}
      </IconButton>
    </Tooltip>
  );
};

export default ToggleDensePaddingAction;
