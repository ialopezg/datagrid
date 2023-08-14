import { Checkbox, Tooltip } from '@mui/material';
import React, { ChangeEvent, FC } from 'react';
import { DataGridRow } from '../DataGrid';

import { useDataGrid } from '../providers';
import { ButtonCell } from '../table';

interface SelectRowActionProps {
  row?: DataGridRow;
  selectAll?: boolean;
}

export const ToggleSelectRowAction: FC<SelectRowActionProps> = ({
  row,
  selectAll,
}) => {
  const {
    densePadding,
    localization,
    onSelectChange,
    onSelectAllChange,
    table,
  } = useDataGrid();

  const onRowSelectedChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (selectAll) {
      table?.toggleAllRowsSelected?.(e.target.checked);
      onSelectAllChange?.(e, table.selectedFlatRows);
    } else if (row) {
      row?.getToggleRowSelectedProps()?.onChange?.(e);
      onSelectChange?.(e, row, table.selectedFlatRows);
    }
  };

  const checkboxProps = selectAll
    ? table.getToggleAllRowsSelectedProps()
    : row?.getToggleRowSelectedProps();

  return (
    <ButtonCell densePadding={densePadding}>
      <Tooltip
        arrow
        enterDelay={1000}
        enterNextDelay={1000}
        title={
          selectAll ? localization.selectAllRows : localization.selectRow
        }
      >
        <Checkbox
          inputProps={{
            'aria-label': selectAll
              ? localization.selectAllRows
              : localization.selectRow,
          }}
          onChange={onRowSelectedChange}
          {...checkboxProps}
          title={undefined}
        />
      </Tooltip>
    </ButtonCell>
  );
};

export default ToggleSelectRowAction;
