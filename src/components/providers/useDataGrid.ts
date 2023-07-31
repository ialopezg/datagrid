import { useContext } from 'react';

import { DataGridContext, DataGridContextProps } from './DataGridContext';

export const useDataGrid = <D extends {}>(): DataGridContextProps<D> =>
  //@ts-ignore
  useContext<DataGridContextProps<D>>(DataGridContext);
