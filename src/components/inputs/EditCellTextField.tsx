import { TextField } from '@mui/material';
import { Cell } from 'react-table';
import React, { ChangeEvent, FC } from 'react';

import { useDataGrid } from '../providers';

interface EditCellTextFieldProps {
  cell: Cell;
}

export const EditCellTextField: FC<EditCellTextFieldProps> = ({ cell }) => {
  const {
    editCellTextFieldProps,
    itemForUpdate,
    localization,
    setItemForUpdate,
  } = useDataGrid();

  const tableEditCellTextFieldProps =
    editCellTextFieldProps instanceof Function
      ? editCellTextFieldProps(cell)
      : editCellTextFieldProps;
  const columnEditCellTextFieldProps =
    cell.column.editCellTextFieldProps instanceof Function
      ? cell.column.editCellTextFieldProps(cell)
      : cell.column.editCellTextFieldProps;
  const textFieldProps = {
    ...tableEditCellTextFieldProps,
    ...columnEditCellTextFieldProps,
    style: {
      ...tableEditCellTextFieldProps?.style,
      ...columnEditCellTextFieldProps?.style,
    },
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (itemForUpdate) {
      cell.row.values[cell.column.id] = e.target.value;
      setItemForUpdate({ ...itemForUpdate });
    }
    cell.column.onEditCellChange?.(e, cell);
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
      value={cell.value}
      variant="standard"
      {...textFieldProps}
    />
  );
};

export default EditCellTextField;
