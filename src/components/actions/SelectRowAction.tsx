import { Checkbox, TableCell } from '@mui/material';
import { Row } from 'react-table';
import React, { ChangeEvent, FC } from 'react';

import { useDataGrid } from '../providers';

interface SelectRowActionProps {
  row: Row;
}

export const SelectRowAction: FC<SelectRowActionProps> = ({ row }) => {
  const { onRowSelect, table } = useDataGrid();

  const onRowSelectChange = (e: ChangeEvent<HTMLInputElement>) => {
    row.getToggleRowSelectedProps()?.onChange?.(e);
    onRowSelect?.(e, row.state, table.selectedFlatRows);
  };

  return (
    <TableCell style={{ width: '2rem' }}>
      <Checkbox {...row.getToggleRowSelectedProps()} onChange={onRowSelectChange} />
    </TableCell>
  );
};

export default SelectRowAction;
