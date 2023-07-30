import { TableInstance } from 'react-table';
import { createContext } from 'react';

import { DataGridOptionalProps } from '../DataGrid';

export interface DataGridContextProps extends DataGridOptionalProps {
  table: TableInstance<object>;
}

export const DataGridContext = createContext<DataGridContextProps>(
  {} as DataGridContextProps
);

export default DataGridContext;
