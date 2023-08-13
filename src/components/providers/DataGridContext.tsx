import { Row, TableInstance } from 'react-table';
import { Context, createContext } from 'react';

import { DataGridProps } from '../DataGrid';
import { DataGridIcons } from '../DataGridIcons';
import { Localization } from '../localization';

export interface DataGridContextProps<D extends {}>
  extends DataGridProps<D> {
  densePadding: boolean;
  fullScreen: boolean;
  hasExpandableRows: boolean;
  hasExpandedRows: boolean;
  icons: DataGridIcons,
  itemForUpdate: Row<D> | null;
  localization: Localization;
  setDensePadding: (value: boolean) => void;
  setFullScreen: (value: boolean) => void;
  setItemForUpdate: (value: Row<D> | null) => void;
  setShowFilters: (value: boolean) => void;
  setShowSearch: (value: boolean) => void;
  showFilters: boolean;
  showSearch: boolean;
  table: TableInstance<D>;
}

export const DataGridContext = (<D extends {}>() =>
  createContext<DataGridContextProps<D>>(
    {} as DataGridContextProps<D>,
  ) as Context<DataGridContextProps<D>>)();

export default DataGridContext;
