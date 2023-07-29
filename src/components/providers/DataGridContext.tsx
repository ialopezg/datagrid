import { createContext } from 'react';
import { TableInstance } from 'react-table';

export interface DataGridContextProps {
  table: TableInstance<object>;
}

export const DataGridContext = createContext<DataGridContextProps>(
  {} as DataGridContextProps
);

export default DataGridContext;
