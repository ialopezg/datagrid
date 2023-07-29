import { useContext } from 'react';

import DataGridContext, { DataGridContextProps } from './DataGridContext';

export const useDataGrid = (): DataGridContextProps =>
  useContext(DataGridContext);
