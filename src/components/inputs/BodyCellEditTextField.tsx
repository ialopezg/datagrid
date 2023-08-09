import { TextField, TextFieldProps } from '@mui/material';
import { Cell } from 'react-table';
import React, { ChangeEvent, FC } from 'react';
import { useDataGrid } from '../providers';

interface EditCellTextFieldProps {
  cell: Cell;
}

export const BodyCellEditTextField: FC<EditCellTextFieldProps> = ({ cell }) => {
  const {
    bodyCellEditTextFieldProps,
    itemForUpdate,
    localization,
    setItemForUpdate,
  } = useDataGrid();

  const textFieldProps = {
    ...bodyCellEditTextFieldProps,
    ...cell.column.bodyCellEditTextFieldProps,
    style: {
      ...(bodyCellEditTextFieldProps as TextFieldProps)?.style,
      ...(cell.column.bodyCellEditTextFieldProps as TextFieldProps)?.style,
    },
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (itemForUpdate) {
      setItemForUpdate({
        ...itemForUpdate,
        values: { ...cell.row.values, [cell.column.id]: e.target.value },
      } as any);
    }
  };

  if (cell.column.editable && cell.column.Edit) {
    return (
      <>
        {cell.column.Edit({ ...textFieldProps, cell, onChange: handleChange } as any)}
      </>
    );
  }

  return (
    <TextField
      margin='dense'
      placeholder={localization?.edit}
      onChange={handleChange}
      onClick={(e) => e.stopPropagation()}
      value={itemForUpdate?.values?.[cell.column.id]}
      variant='standard'
      {...textFieldProps}
    />
  );
};

export default BodyCellEditTextField;
