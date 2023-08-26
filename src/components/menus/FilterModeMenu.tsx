import { Menu, MenuItem } from '@mui/material';
import React, { FC, useMemo } from 'react';

import {
  DATAGRID_FILTER_TYPE,
  DataGridFilterType,
  DataGridHeaderGroup,
} from '../DataGrid';
import { useDataGrid } from '../providers';

const commonMenuItemStyles = {
  py: '6px',
  my: 0,
  alignItems: 'center',
};

interface FilterModeMenuProps {
  anchorEl: HTMLElement | null;
  column: DataGridHeaderGroup;
  onSelect?: () => void;
  setAnchorEl: (value: HTMLElement | null) => void;
}

export const FilterModeMenu: FC<FilterModeMenuProps> = ({
  anchorEl,
  column,
  onSelect,
  setAnchorEl,
}) => {
  const { localization, setCurrentFilterTypes, table } = useDataGrid();

  const filterTypes: {
    type: DATAGRID_FILTER_TYPE;
    label: string;
    divider: boolean;
  }[] = useMemo(
    () => [
      {
        type: DATAGRID_FILTER_TYPE.FUZZY,
        label: localization.fuzzy,
        divider: false,
      },
      {
        type: DATAGRID_FILTER_TYPE.CONTAINS,
        label: localization.contains,
        divider: true,
      },
      {
        type: DATAGRID_FILTER_TYPE.STARTS_WITH,
        label: localization.startsWidth,
        divider: false,
      },
      {
        type: DATAGRID_FILTER_TYPE.ENDS_WITH,
        label: localization.endsWidth,
        divider: true,
      },
      {
        type: DATAGRID_FILTER_TYPE.EQUALS,
        label: localization.equals,
        divider: false,
      },
      {
        type: DATAGRID_FILTER_TYPE.NOT_EQUALS,
        label: localization.notEquals,
        divider: true,
      },
      {
        type: DATAGRID_FILTER_TYPE.EMPTY,
        label: localization.empty,
        divider: false,
      },
      {
        type: DATAGRID_FILTER_TYPE.NOT_EMPTY,
        label: localization.notEmpty,
        divider: false,
      },
    ],
    [],
  );

  const filterType = table.state.currentFilterTypes[column.id];

  const onFilterModeChange = (value: DATAGRID_FILTER_TYPE) => {
    setAnchorEl(null);
    setCurrentFilterTypes(
      (prevState: { [key: string]: DataGridFilterType }) => ({
        ...prevState,
        [column.id]: value,
      }),
    );

    if (
      [DATAGRID_FILTER_TYPE.EMPTY, DATAGRID_FILTER_TYPE.NOT_EMPTY].includes(
        value,
      )
    ) {
      column.setFilter(' ');
    }

    onSelect?.();
  };

  return (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'center', horizontal: 'right' }}
      onClose={() => setAnchorEl(null)}
      open={!!anchorEl}
      MenuListProps={{
        dense: table.state.densePadding,
        disablePadding: true,
      }}
    >
      {filterTypes.map(({ type, label, divider }, index) => (
        <MenuItem
          divider={divider}
          key={index}
          onClick={() => onFilterModeChange(type)}
          selected={type === filterType}
          sx={commonMenuItemStyles}
          value={type}
        >
          {label}
        </MenuItem>
      ))}
    </Menu>
  );
};

export default FilterModeMenu;
