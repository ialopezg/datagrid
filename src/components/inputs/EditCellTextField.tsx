import { TextField } from '@mui/material';
import React, { ChangeEvent, FC } from 'react';
import { DataGridCell } from '../DataGrid';

import { useDataGrid } from '../providers';

interface EditCellTextFieldProps {
  cell: DataGridCell;
}

export const EditCellTextField: FC<EditCellTextFieldProps> = ({ cell }) => {
  const { bodyCellEditProps, itemForUpdate, setItemForUpdate } = useDataGrid();

  const tableEditCellTextFieldProps =
    bodyCellEditProps instanceof Function
      ? bodyCellEditProps(cell)
      : bodyCellEditProps;
  const columnEditCellTextFieldProps =
    cell.column.bodyCellEditProps instanceof Function
      ? cell.column.bodyCellEditProps(cell)
      : cell.column.bodyCellEditProps;
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
    cell.column.onCellEditChange?.(e, cell);
  };

  if (cell.column.editable && cell.column.Edit) {
    return <>{cell.column.Edit({ ...textFieldProps, cell })}</>;
  }

  return (
    <TextField
      margin="dense"
      onChange={handleChange}
      placeholder={String(cell.column.Header)}
      onClick={(e) => e.stopPropagation()}
      value={cell.value}
      variant="standard"
      {...textFieldProps}
    />
  );
};

export default EditCellTextField;
