import React, { FC } from 'react';
import { Switch, Tooltip } from '@mui/material';
import { useDataGrid } from '../providers';

interface DensePaddingSwitchProps {}

export const DensePaddingSwitch: FC<DensePaddingSwitchProps> = () => {
  const { densePadding, setDensePadding, localization } = useDataGrid();

  return (
    <Tooltip arrow title={localization?.toggleDensePadding}>
      <Switch
        inputProps={{
          'aria-label': localization?.toggleDensePadding,
        }}
        color="default"
        checked={densePadding}
        size="small"
        onChange={() => setDensePadding(!densePadding)}
      />
    </Tooltip>
  );
};

export default DensePaddingSwitch;
