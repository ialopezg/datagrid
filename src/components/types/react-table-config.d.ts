import {
  UseExpandedHooks,
  UseGroupByHooks,
  UseRowSelectHooks,
  UseSortByHooks,

} from 'react-table';
import {
  DataGridCell,
  DataGridColumnInstance,
  DataGridColumnInterface, DataGridInstance, DataGridOptions,
  DataGridRow,
  DataGridState,
} from '../index';

declare module 'react-table' {
  export interface TableOptions<D extends Record<string, unknown>>
    extends DataGridOptions<D> {
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
  > extends DataGridInstance<D> {
    rows: DataGridRow<D>[];
  }

  export interface TableState<
    D extends Record<string, unknown> = Record<string, unknown>,
  > extends DataGridState<D> {
  }

  export interface ColumnInterface<
    D extends Record<string, unknown> = Record<string, unknown>,
  > extends DataGridColumnInterface<D> {
  }

  export interface ColumnInstance<
    D extends Record<string, unknown> = Record<string, unknown>,
  > extends DataGridColumnInstance<D> {
  }

  export interface Cell<
    D extends Record<string, unknown> = Record<string, unknown>,
    V = any,
  > extends DataGridCell<D> {
  }

  export interface Row<
    D extends Record<string, unknown> = Record<string, unknown>,
  > extends DataGridRow<D> {
  }
}
