import { Switch, Tooltip } from '@mui/material';
import React, { FC } from 'react';

import { useDataGrid } from '../providers';

interface DensePaddingActionProps {}

export const DensePaddingAction: FC<DensePaddingActionProps> = () => {
  const { densePadding, localization, setDensePadding } = useDataGrid();

  return (
    <Tooltip arrow title={localization?.toggleDensePadding}>
      <Switch
        color="default"
        checked={densePadding}
        inputProps={{
          'aria-label': localization?.toggleDensePadding,
        }}
        onChange={() => setDensePadding(!densePadding)}
        size="small"
      />
    </Tooltip>
  );
};

export default DensePaddingAction;
