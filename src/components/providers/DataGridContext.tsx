import { TableInstance } from 'react-table';
import { Context, createContext } from 'react';

import { DataGridProps } from '../DataGrid';
import { RowOptions } from '../helpers';

export interface DataGridContextProps<D extends {}>
  extends DataGridProps<D>,
    RowOptions {
  densePadding: boolean;
  itemForUpdate: string | null;
  setItemForUpdate: (value: string | null) => void;
  setDensePadding: (value: boolean) => void;
  showFilters: boolean;
  setShowFilters: (value: boolean) => void;
  table: TableInstance<D>;
}

export const DataGridContext = (<D extends {}>() =>
  createContext<DataGridContextProps<D>>(
    {} as DataGridContextProps<D>,
  ) as Context<DataGridContextProps<D>>)();

export default DataGridContext;
