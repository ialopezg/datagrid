import React, { FC } from 'react';
import { Checkbox, TableCell } from '@mui/material';
import { useDataGrid } from '../providers';

interface SelectAllRowsActionProps {}

export const SelectAllRowsAction: FC<SelectAllRowsActionProps> = () => {
  const { table, enableSelectAll } = useDataGrid();

  return (
    <TableCell style={{ width: '2rem', padding: '0.5rem' }} variant="head">
      {enableSelectAll ? (
        <Checkbox aria-label="" {...table.getToggleAllPageRowsSelectedProps()} />
      ) : null}
    </TableCell>
  );
};

export default SelectAllRowsAction;
