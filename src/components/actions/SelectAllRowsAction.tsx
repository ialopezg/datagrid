import React, { FC } from 'react';
import { Checkbox, TableCell } from '@mui/material';
import { useDataGrid } from '../providers';

interface SelectAllRowsActionProps {}

export const SelectAllRowsAction: FC<SelectAllRowsActionProps> = () => {
  const { densePadding, disableSelectAll, table } = useDataGrid();

  return (
    <TableCell
      style={{
        width: '2rem',
        padding: densePadding ? '0' : '0.6rem',
        transition: 'all 0.2s ease-in-out',
      }}
      variant="head"
    >
      {!disableSelectAll ? (
        <Checkbox
          aria-label=""
          {...table.getToggleAllPageRowsSelectedProps()}
        />
      ) : null}
    </TableCell>
  );
};

export default SelectAllRowsAction;
