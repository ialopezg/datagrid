import React, { FC } from 'react';
import { Checkbox, TableCell } from '@mui/material';
import { useDataGrid } from '../providers';

interface SelectAllRowsProps {}

export const SelectAllRows: FC<SelectAllRowsProps> = () => {
  const { table, enableSelectAll } = useDataGrid();

  return (
    <TableCell style={{ width: '2rem' }} variant="head">
      {enableSelectAll ? (
        <Checkbox {...table.getToggleAllPageRowsSelectedProps()} />
      ) : null}
    </TableCell>
  );
};

export default SelectAllRows;
