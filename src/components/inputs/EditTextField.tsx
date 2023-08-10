import { TextField } from '@mui/material';
import { Cell } from 'react-table';
import React, { ChangeEvent, FC } from 'react';

import { useDataGrid } from '../providers';

interface EditCellTextFieldProps {
  cell: Cell;
}

export const EditTextField: FC<EditCellTextFieldProps> = ({ cell }) => {
  const { editTextFieldProps, itemForUpdate, localization, setItemForUpdate } =
    useDataGrid();

  const textFieldProps = {
    ...editTextFieldProps,
    ...cell.column.bodyCellEditTextFieldProps,
    style: {
      // @ts-ignore
      ...editTextFieldProps?.style,
      // @ts-ignore
      ...cell.column.bodyCellEditTextFieldProps?.style,
    },
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (itemForUpdate) {
      cell.row.values[cell.column.id] = e.target.value;
      setItemForUpdate({ ...itemForUpdate });
    }
    cell.column.onCellEditChange?.(e, cell);
  };

  if (cell.column.editable && cell.column.Edit) {
    return <>{cell.column.Edit({ ...textFieldProps, cell })}</>;
  }

  return (
    <TextField
      margin="dense"
      onChange={handleChange}
      placeholder={localization?.edit}
      onClick={(e) => e.stopPropagation()}
      value={itemForUpdate?.values?.[cell.column.id]}
      variant="standard"
      {...textFieldProps}
    />
  );
};

export default EditTextField;
