import { TableInstance } from 'react-table';
import { Context, createContext } from 'react';

import { DataGridProps } from '../DataGrid';

export interface DataGridContextProps<D extends {}> extends DataGridProps<D> {
  table: TableInstance<D>;
}

export const DataGridContext = (<D extends {}>() =>
  createContext<DataGridContextProps<D>>(
    {} as DataGridContextProps<D>
  ) as Context<DataGridContextProps<D>>)();

export default DataGridContext;
