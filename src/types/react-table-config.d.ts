import { TableCellProps, TextFieldProps } from '@mui/material';
import { ChangeEvent, ReactNode } from 'react';
import {
  Cell,
  Column, HeaderGroup,
  UseColumnOrderInstanceProps,
  UseColumnOrderState,
  UseExpandedHooks,
  UseExpandedInstanceProps,
  UseExpandedOptions,
  UseExpandedRowProps,
  UseExpandedState,
  UseFiltersColumnOptions,
  UseFiltersColumnProps,
  UseFiltersInstanceProps,
  UseFiltersOptions,
  UseFiltersState,
  UseGlobalFiltersColumnOptions,
  UseGlobalFiltersInstanceProps,
  UseGlobalFiltersOptions,
  UseGlobalFiltersState,
  UseGroupByCellProps,
  UseGroupByColumnOptions,
  UseGroupByColumnProps,
  UseGroupByHooks,
  UseGroupByInstanceProps,
  UseGroupByOptions,
  UseGroupByRowProps,
  UseGroupByState,
  UsePaginationInstanceProps,
  UsePaginationOptions,
  UsePaginationState,
  UseResizeColumnsColumnOptions,
  UseResizeColumnsColumnProps,
  UseResizeColumnsOptions,
  UseResizeColumnsState,
  UseRowSelectHooks,
  UseRowSelectInstanceProps,
  UseRowSelectOptions,
  UseRowSelectRowProps,
  UseRowSelectState,
  UseRowStateCellProps,
  UseRowStateInstanceProps,
  UseRowStateOptions,
  UseRowStateRowProps,
  UseRowStateState,
  UseSortByColumnOptions,
  UseSortByColumnProps,
  UseSortByHooks,
  UseSortByInstanceProps,
  UseSortByOptions,
  UseSortByState,
} from 'react-table';

export interface DataGridColumn<D extends {} = {}> extends UseFiltersColumnOptions<D>,
  UseGlobalFiltersColumnOptions<D>,
  UseGroupByColumnOptions<D>,
  UseResizeColumnsColumnOptions<D>,
  UseSortByColumnOptions<D> {
  bodyCellProps?: TableCellProps | ((cell: Cell<D>) => TableCellProps);
  editCellTextFieldProps?: TextFieldProps | ((cell: Cell<D>) => TextFieldProps);
  footerCellProps?: TableCellProps | ((column: Column<D>) => TableCellProps);
  headerCellProps?: TableCellProps | ((column: Column<D>) => TableCellProps);
  headerCellFilterTextFieldProps?: TextFieldProps | ((column: Column<D>) => TextFieldProps);
  disableFilters?: boolean;
  editable?: boolean;
  onEditCellChange?: (e: ChangeEvent<HTMLInputElement>, cell: Cell<D>) => void;
  Edit?: ({ cell, onChange }: { cell: Cell<D> }) => ReactNode;
  Filter?: ({ column }: { column: HeaderGroup<D> }) => ReactNode;
}

declare module 'react-table' {
  export interface TableOptions<D extends Record<string, unknown>>
    extends UseExpandedOptions<D>,
      UseFiltersOptions<D>,
      UseGlobalFiltersOptions<D>,
      UseGroupByOptions<D>,
      UsePaginationOptions<D>,
      UseResizeColumnsOptions<D>,
      UseRowSelectOptions<D>,
      UseRowStateOptions<D>,
      UseSortByOptions<D>,
      Record<string, any> {
  }

  export interface Hooks<
    D extends Record<string, unknown> = Record<string, unknown>,
  > extends UseExpandedHooks<D>,
    UseGroupByHooks<D>,
    UseRowSelectHooks<D>,
    UseSortByHooks<D> {
  }

  export interface TableInstance<
    D extends Record<string, unknown> = Record<string, unknown>,
  > extends UseColumnOrderInstanceProps<D>,
    UseExpandedInstanceProps<D>,
    UseFiltersInstanceProps<D>,
    UseGlobalFiltersInstanceProps<D>,
    UseGroupByInstanceProps<D>,
    UsePaginationInstanceProps<D>,
    UseRowSelectInstanceProps<D>,
    UseRowStateInstanceProps<D>,
    UseSortByInstanceProps<D> {
  }

  export interface TableState<
    D extends Record<string, unknown> = Record<string, unknown>,
  > extends UseColumnOrderState<D>,
    UseExpandedState<D>,
    UseFiltersState<D>,
    UseGlobalFiltersState<D>,
    UseGroupByState<D>,
    UsePaginationState<D>,
    UseResizeColumnsState<D>,
    UseRowSelectState<D>,
    UseRowStateState<D>,
    UseSortByState<D> {
  }

  export interface ColumnInterface<
    D extends Record<string, unknown> = Record<string, unknown>,
  > extends DataGridColumn {
  }

  export interface ColumnInstance<
    D extends Record<string, unknown> = Record<string, unknown>,
  > extends UseFiltersColumnProps<D>,
    UseGroupByColumnProps<D>,
    UseResizeColumnsColumnProps<D>,
    UseSortByColumnProps<D> {
  }

  export interface Cell<
    D extends Record<string, unknown> = Record<string, unknown>,
    V = any,
  > extends UseGroupByCellProps<D>,
    UseRowStateCellProps<D> {
  }

  export interface Row<
    D extends Record<string, unknown> = Record<string, unknown>,
  > extends UseExpandedRowProps<D>,
    UseGroupByRowProps<D>,
    UseRowSelectRowProps<D>,
    UseRowStateRowProps<D> {
  }
}
