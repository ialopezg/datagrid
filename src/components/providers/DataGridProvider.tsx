import React, { FC, ReactNode } from 'react';
import { usePagination, useSortBy, useTable } from 'react-table';

import { DataGridProps } from '../DataGrid';
import DataGridContext from './DataGridContext';
import { defaultOptions } from '../defaultOptions';

interface DataGridProviderProps extends DataGridProps {
  children: ReactNode;
}

export const DataGridProvider: FC<DataGridProviderProps> = ({
  columns,
  children,
  data,
  options,
  ...rest
}) => {
  const table = useTable({ columns, data }, useSortBy, usePagination);

  return (
    <DataGridContext.Provider
      value={{ options: { ...defaultOptions, ...options }, table, ...rest }}
    >
      {children}
    </DataGridContext.Provider>
  );
};

export default DataGridProvider;
