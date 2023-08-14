import { Context, createContext } from 'react';

import { DataGridInstance, DataGridProps, DataGridRow } from '../DataGrid';
import { DataGridIcons } from '../DataGridIcons';
import { DataGridLocalization } from '../localization';

export interface DataGridContextProps<D extends {}> extends DataGridProps<D> {
  densePadding: boolean;
  fullScreen: boolean;
  hasExpandableRows: boolean;
  hasExpandedRows: boolean;
  icons: DataGridIcons;
  itemForUpdate: DataGridRow<D> | null;
  localization: DataGridLocalization;
  setDensePadding: (value: boolean) => void;
  setFullScreen: (value: boolean) => void;
  setItemForUpdate: (value: DataGridRow<D> | null) => void;
  setShowFilters: (value: boolean) => void;
  setShowSearch: (value: boolean) => void;
  showFilters: boolean;
  showSearch: boolean;
  table: DataGridInstance<D>;
}

export const DataGridContext = (<D extends {}>() =>
  createContext<DataGridContextProps<D>>(
    {} as DataGridContextProps<D>,
  ) as Context<DataGridContextProps<D>>)();

export default DataGridContext;
