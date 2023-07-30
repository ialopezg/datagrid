import { Checkbox, TableCell } from '@mui/material';
import { Row } from 'react-table';
import React, { ChangeEvent, FC } from 'react';
import { useDataGrid } from '../providers';

interface SelectRowProps {
  row: Row<object>;
}

export const SelectRow: FC<SelectRowProps> = ({ row }) => {
  const { onRowSelect } = useDataGrid();

  const onRowSelectChange = (e: ChangeEvent<HTMLInputElement>) => {
    row.getToggleRowSelectedProps()?.onChange?.(e);
    onRowSelect?.(e, row.state);
  };

  return (
    <TableCell style={{ width: '2rem' }}>
      <Checkbox {...row.getToggleRowSelectedProps()} onChange={onRowSelectChange} />
    </TableCell>
  );
};

export default SelectRow;
