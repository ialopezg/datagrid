import React, { FC } from 'react';
import { Checkbox } from '@mui/material';

import { useDataGrid } from '../providers';
import { TableButtonCell } from '../table';

interface SelectAllRowsActionProps {}

export const SelectAllRowsAction: FC<SelectAllRowsActionProps> = () => {
  const { densePadding, disableSelectAll, localization, table } = useDataGrid();

  return (
    <TableButtonCell densePadding={densePadding} variant="head">
      {!disableSelectAll ? (
        <Checkbox
          inputProps={{
            'aria-label': localization?.selectAll,
          }}
          {...table.getToggleAllPageRowsSelectedProps()}
        />
      ) : null}
    </TableButtonCell>
  );
};

export default SelectAllRowsAction;
