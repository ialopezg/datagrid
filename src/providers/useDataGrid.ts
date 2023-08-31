import { Context, useContext } from 'react';

import { DataGridContext, DataGridContextProps } from './DataGridContext';

export const useDataGrid = <D extends {} = {}>(): DataGridContextProps<D> =>
  useContext<DataGridContextProps<D>>(
    DataGridContext as unknown as Context<DataGridContextProps<D>>,
  );
