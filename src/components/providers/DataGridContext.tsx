import { Row, TableInstance } from 'react-table';
import { Context, createContext } from 'react';

import { DataGridProps } from '../DataGrid';
import { RowOptions } from '../helpers';

export interface DataGridContextProps<D extends {}>
  extends DataGridProps<D>,
    RowOptions {
  densePadding: boolean;
  setDensePadding: (value: boolean) => void;
  itemForUpdate: Row<D> | null;
  setItemForUpdate: (value: Row<D> | null) => void;
  showFilters: boolean;
  setShowFilters: (value: boolean) => void;
  showSearch: boolean;
  setShowSearch: (value: boolean) => void;
  table: TableInstance<D>;
}

export const DataGridContext = (<D extends {}>() =>
  createContext<DataGridContextProps<D>>(
    {} as DataGridContextProps<D>,
  ) as Context<DataGridContextProps<D>>)();

export default DataGridContext;
