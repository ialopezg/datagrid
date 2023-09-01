import { Menu, MenuItem } from '@mui/material';
import React, { FC, useMemo } from 'react';

import { DataGridFilterType, DataGridHeaderGroup } from '../DataGrid';
import {
  contains,
  empty,
  endsWidth,
  equals,
  fuzzy,
  greaterThan,
  lessThan,
  notEmpty,
  notEquals,
  startsWidth,
} from '../DataGridFilters';
import { DATAGRID_FILTER_TYPE } from '../DataGridFilterType';
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
    fn: Function;
  }[] = useMemo(
    () =>
      [
        {
          type: DATAGRID_FILTER_TYPE.FUZZY,
          label: localization.fuzzy,
          divider: false,
          fn: fuzzy,
        },
        {
          type: DATAGRID_FILTER_TYPE.CONTAINS,
          label: localization.contains,
          divider: true,
          fn: contains,
        },
        {
          type: DATAGRID_FILTER_TYPE.STARTS_WITH,
          label: localization.startsWidth,
          divider: false,
          fn: startsWidth,
        },
        {
          type: DATAGRID_FILTER_TYPE.ENDS_WITH,
          label: localization.endsWidth,
          divider: true,
          fn: endsWidth,
        },
        {
          type: DATAGRID_FILTER_TYPE.EQUALS,
          label: localization.equals,
          divider: false,
          fn: equals,
        },
        {
          type: DATAGRID_FILTER_TYPE.NOT_EQUALS,
          label: localization.notEquals,
          divider: true,
          fn: notEquals,
        },
        {
          type: DATAGRID_FILTER_TYPE.GREATER_THAN,
          label: localization.greaterThan,
          divider: false,
          fn: greaterThan,
        },
        {
          type: DATAGRID_FILTER_TYPE.LESS_THAN,
          label: localization.lessThan,
          divider: true,
          fn: lessThan,
        },
        {
          type: DATAGRID_FILTER_TYPE.EMPTY,
          label: localization.empty,
          divider: false,
          fn: empty,
        },
        {
          type: DATAGRID_FILTER_TYPE.NOT_EMPTY,
          label: localization.notEmpty,
          divider: false,
          fn: notEmpty,
        },
      ].filter(
        (filter) =>
          !column.filterTypes || column.filterTypes.includes(filter.type),
      ),
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
      {filterTypes.map(({ type, label, divider, fn }, index) => (
        <MenuItem
          divider={divider}
          key={index}
          onClick={() => onFilterModeChange(type)}
          selected={type === filterType || fn === filterType}
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
