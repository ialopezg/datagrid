import { Menu, MenuItem, MenuList } from '@mui/material';
import React, { FC, useMemo } from 'react';
import { DataGridFilterType, DataGridHeaderGroup } from '../DataGrid';
import { useDataGrid } from '../providers';

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
    type: DataGridFilterType;
    label: string;
    divider: boolean;
  }[] = useMemo(
    () => [
      {
        type: 'fuzzy',
        label: localization.fuzzyMatch,
        divider: false,
      },
      {
        type: 'contains',
        label: localization.containsExact,
        divider: true,
      },
      {
        type: 'startsWidth',
        label: localization.startsWidth,
        divider: false,
      },
      {
        type: 'endsWidth',
        label: localization.endsWith,
        divider: true,
      },
      {
        type: 'equals',
        label: localization.equals,
        divider: false,
      },
      {
        type: 'notEquals',
        label: localization.notEquals,
        divider: true,
      },
      {
        type: 'empty',
        label: localization.empty,
        divider: false,
      },
      {
        type: 'notEmpty',
        label: localization.notEmpty,
        divider: false,
      },
    ],
    [],
  );

  const filterType = table.state.currentFilterTypes[column.id];

  const onFilterModeChange = (value: DataGridFilterType) => {
    setAnchorEl(null);
    setCurrentFilterTypes(
      (prevState: { [key: string]: DataGridFilterType }) => ({
        ...prevState,
        [column.id]: value,
      }),
    );

    if (['empty', 'notEmpty'].includes(value)) {
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
    >
      <MenuList dense={table.state.densePadding} disablePadding>
        {filterTypes.map(({ type, label, divider }) => (
          <MenuItem
            divider={divider}
            key={type}
            onClick={() => onFilterModeChange(type)}
            selected={type === filterType}
            value={type}
          >
            {label}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

export default FilterModeMenu;
