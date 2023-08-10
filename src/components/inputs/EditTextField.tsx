import { TextField } from '@mui/material';
import { Cell } from 'react-table';
import React, { ChangeEvent, FC, useState } from 'react';
import { useDataGrid } from '../providers';

interface EditCellTextFieldProps {
  cell: Cell;
}

export const EditTextField: FC<EditCellTextFieldProps> = ({ cell }) => {
  const {
    bodyCellEditTextFieldProps,
    itemForUpdate,
    localization,
    setItemForUpdate,
  } = useDataGrid();

  // ** State
  const [error, setError] = useState<boolean | string>(false);

  const textFieldProps = {
    ...bodyCellEditTextFieldProps,
    ...cell.column.bodyCellEditTextFieldProps,
    style: {
      // @ts-ignore
      ...bodyCellEditTextFieldProps?.style,
      // @ts-ignore
      ...cell.column.bodyCellEditTextFieldProps?.style,
    },
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (itemForUpdate) {
      setItemForUpdate({
        ...itemForUpdate,
        values: { ...cell.row.values, [cell.column.id]: e.target.value },
      });
      const err = cell.column.validator?.(e.target.value) ?? true;
      setError(err !== true && err);
    }
  };

  if (cell.column.editable && cell.column.Edit) {
    return <>{cell.column.Edit({ ...textFieldProps, cell })}</>;
  }

  return (
    <TextField
      error={!!error}
      helperText={error}
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
