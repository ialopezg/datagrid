import { Checkbox } from '@mui/material';
import { Row } from 'react-table';
import React, { ChangeEvent, FC } from 'react';

import { useDataGrid } from '../providers';
import { TableButtonCell } from '../table';

interface SelectRowActionProps {
  row: Row;
}

export const SelectRowAction: FC<SelectRowActionProps> = ({ row }) => {
  const { densePadding, localization, onRowSelectChange, table } =
    useDataGrid();

  const onSelectChange = (e: ChangeEvent<HTMLInputElement>) => {
    row.getToggleRowSelectedProps()?.onChange?.(e);
    onRowSelectChange?.(e, row, table.selectedFlatRows);
  };

  return (
    <TableButtonCell densePadding={densePadding}>
      <Checkbox
        inputProps={{
          'aria-label': localization?.selectRow,
        }}
        onChange={onSelectChange}
        {...row.getToggleRowSelectedProps()}
      />
    </TableButtonCell>
  );
};

export default SelectRowAction;
