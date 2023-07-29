import { TableInstance } from 'react-table';
import { createContext } from 'react';

import { DataGridOptions } from '../DataGrid';

export interface DataGridContextProps extends DataGridOptions {
  table: TableInstance<object>;
}

export const DataGridContext = createContext<DataGridContextProps>(
  {} as DataGridContextProps
);

export default DataGridContext;
