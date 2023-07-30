import { Checkbox, TableCell } from '@mui/material';
import { Row } from 'react-table';
import React, { FC } from 'react';

interface SelectRowProps {
  row: Row<object>;
}

export const SelectRow: FC<SelectRowProps> = ({ row }) => {
  return (
    <TableCell style={{ width: '2rem' }}>
      <Checkbox {...row.getToggleRowSelectedProps()} />
    </TableCell>
  );
};

export default SelectRow;
