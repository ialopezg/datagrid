import React, { FC } from 'react';
import MuiTableCell from '@mui/material/TableCell';
import { Checkbox, styled } from '@mui/material';
import { useDataGrid } from '../providers';

const TableCell = styled(MuiTableCell, {
  shouldForwardProp: (prop: PropertyKey) => prop !== 'densePadding',
})<{ densePadding?: boolean }>(({ densePadding }) => ({
  padding: densePadding ? '0' : '0.6rem',
  transition: 'all 0.2s ease-in-out',
}));

interface SelectAllRowsActionProps {
}

export const SelectAllRowsAction: FC<SelectAllRowsActionProps> = () => {
  const { densePadding, disableSelectAll, localization, table } = useDataGrid();

  return (
    <TableCell densePadding={densePadding} variant='head'>
      {!disableSelectAll ? (
        <Checkbox
          aria-label={localization?.selectAll}
          {...table.getToggleAllPageRowsSelectedProps()}
        />
      ) : null}
    </TableCell>
  );
};

export default SelectAllRowsAction;
