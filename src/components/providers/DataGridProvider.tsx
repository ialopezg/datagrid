import React, { FC, ReactNode } from 'react';
import { useTable } from 'react-table';

import { DataGridProps } from '../DataGrid';
import DataGridContext from './DataGridContext';

interface DataGridProviderProps extends DataGridProps {
  children: ReactNode;
}

export const DataGridProvider: FC<DataGridProviderProps> = ({
  columns,
  children,
  data,
  ...rest
}) => {
  const table = useTable({ columns, data });

  return (
    <DataGridContext.Provider value={{ table, ...rest }}>
      {children}
    </DataGridContext.Provider>
  );
};

export default DataGridProvider;
