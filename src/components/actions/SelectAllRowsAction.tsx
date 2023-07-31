import React, { FC } from 'react';
import { Checkbox, TableCell } from '@mui/material';
import { useDataGrid } from '../providers';

interface SelectAllRowsActionProps {}

export const SelectAllRowsAction: FC<SelectAllRowsActionProps> = () => {
  const { table, enableSelectAll } = useDataGrid();

  return (
    <TableCell style={{ width: '2rem' }} variant="head">
      {enableSelectAll ? (
        <Checkbox {...table.getToggleAllPageRowsSelectedProps()} />
      ) : null}
    </TableCell>
  );
};

export default SelectAllRowsAction;
