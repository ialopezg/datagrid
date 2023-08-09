import MuiTableCell from '@mui/material/TableCell';
import { Checkbox, styled } from '@mui/material';
import { Row } from 'react-table';
import React, { ChangeEvent, FC } from 'react';

import { useDataGrid } from '../providers';

const TableCell = styled(MuiTableCell, {
  shouldForwardProp: (prop: PropertyKey) => prop !== 'densePadding',
})<{ densePadding?: boolean }>(({ densePadding }) => ({
  padding: densePadding ? '0' : '0.6rem',
  transition: 'all 0.2s ease-in-out',
}));

interface SelectRowActionProps {
  row: Row;
}

export const SelectRowAction: FC<SelectRowActionProps> = ({ row }) => {
  const { densePadding, localization, onRowSelectChange, table } = useDataGrid();

  const onSelectChange = (e: ChangeEvent<HTMLInputElement>) => {
    row.getToggleRowSelectedProps()?.onChange?.(e);
    onRowSelectChange?.(e, row, table.selectedFlatRows);
  };

  return (
    <TableCell densePadding={densePadding}>
      <Checkbox
        inputProps={{
          'aria-label': localization?.selectRow,
        }}
        onChange={onSelectChange}
        {...row.getToggleRowSelectedProps()}
      />
    </TableCell>
  );
};

export default SelectRowAction;
