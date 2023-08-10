import React, { FC } from 'react';
import { Checkbox } from '@mui/material';

import { useDataGrid } from '../providers';
import { ButtonCell } from '../table';

interface SelectAllRowsActionProps {}

export const SelectAllRowsAction: FC<SelectAllRowsActionProps> = () => {
  const { densePadding, disableSelectAll, localization, table } = useDataGrid();

  return (
    <ButtonCell densePadding={densePadding} variant="head">
      {!disableSelectAll ? (
        <Checkbox
          inputProps={{
            'aria-label': localization?.selectAll,
          }}
          {...table.getToggleAllPageRowsSelectedProps()}
        />
      ) : null}
    </ButtonCell>
  );
};

export default SelectAllRowsAction;
