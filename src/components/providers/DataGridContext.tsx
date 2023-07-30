import { TableInstance } from 'react-table';
import { createContext } from 'react';

import { DataGridOptionalProps, DataGridOptions } from '../DataGrid';

export interface DataGridContextProps extends DataGridOptionalProps {
  table: TableInstance<object>;
  options: DataGridOptions;
}

export const DataGridContext = createContext<DataGridContextProps>(
  {} as DataGridContextProps
);

export default DataGridContext;
