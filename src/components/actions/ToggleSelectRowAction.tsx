import { Checkbox, Tooltip } from '@mui/material';
import { Row } from 'react-table';
import React, { ChangeEvent, FC } from 'react';

import { useDataGrid } from '../providers';
import { ButtonCell } from '../table';

interface SelectRowActionProps {
  row?: Row;
  selectAll?: boolean;
}

export const ToggleSelectRowAction: FC<SelectRowActionProps> = ({
  row,
  selectAll,
}) => {
  const {
    densePadding,
    localization,
    onRowSelectChange,
    onSelectAllChange,
    table,
  } = useDataGrid();

  const onSelectChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (selectAll) {
      onSelectAllChange?.(e, table.selectedFlatRows);
      table.toggleAllRowsSelected(e.target.checked);
    } else if (row) {
      row.getToggleRowSelectedProps()?.onChange?.(e);
      onRowSelectChange?.(e, row, table.selectedFlatRows);
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
          selectAll ? localization?.selectAllRows : localization?.selectRow
        }
      >
        <Checkbox
          inputProps={{
            'aria-label': selectAll
              ? localization?.selectAllRows
              : localization?.selectRow,
          }}
          onChange={onSelectChange}
          {...checkboxProps}
          title={undefined}
        />
      </Tooltip>
    </ButtonCell>
  );
};

export default ToggleSelectRowAction;
