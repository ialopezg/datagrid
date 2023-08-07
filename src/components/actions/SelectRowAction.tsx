import { Checkbox, TableCell } from '@mui/material';
import { Row } from 'react-table';
import React, { ChangeEvent, FC } from 'react';

import { useDataGrid } from '../providers';

interface SelectRowActionProps {
  row: Row;
}

export const SelectRowAction: FC<SelectRowActionProps> = ({ row }) => {
  const { onRowSelectChange, table } = useDataGrid();

  const onSelectChange = (e: ChangeEvent<HTMLInputElement>) => {
    row.getToggleRowSelectedProps()?.onChange?.(e);
    onRowSelectChange?.(e, row, table.selectedFlatRows);
  };

  return (
    <TableCell style={{ width: '2rem', padding: '0.5rem' }}>
      <Checkbox
        {...row.getToggleRowSelectedProps()}
        onChange={onSelectChange}
      />
    </TableCell>
  );
};

export default SelectRowAction;
