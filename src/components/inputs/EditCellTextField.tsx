import { TextField } from '@mui/material';
import { Cell } from 'react-table';
import React, { ChangeEvent, FC } from 'react';
import { useDataGrid } from '../providers';

interface EditCellTextFieldProps {
  cell: Cell;
}

export const EditCellTextField: FC<EditCellTextFieldProps> = ({ cell }) => {
  const { itemForUpdate, localization, setItemForUpdate } = useDataGrid();

  // @ts-ignore
  if (cell.Edit) {
    // @ts-ignore
    return <>{cell.Edit({ cell })}</>
  }

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (itemForUpdate) {
      setItemForUpdate({
        ...itemForUpdate,
        values: { ...cell.row.values, [cell.row.id]: e.target.value },
      });
    }
  };

  return (
    <TextField
      margin="dense"
      placeholder={localization?.edit}
      onChange={onChange}
      onClick={(e) => e.stopPropagation()}
      value={itemForUpdate?.values?.[cell.column.id]}
      variant="standard"
    />
  );
};

export default EditCellTextField;
