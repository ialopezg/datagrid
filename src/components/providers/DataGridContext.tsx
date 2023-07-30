import { TableInstance } from 'react-table';
import { createContext } from 'react';

import { DataGridProps } from '../DataGrid';

export interface DataGridContextProps extends DataGridProps {
  table: TableInstance<object>;
}

export const DataGridContext = createContext<DataGridContextProps>(
  {} as DataGridContextProps
);

export default DataGridContext;
