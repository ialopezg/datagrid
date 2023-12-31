import { Context, createContext, Dispatch, SetStateAction } from 'react';

import {
  DataGridFilterType,
  DataGridInstance,
  DataGridProps,
  DataGridRow,
} from '../DataGrid';
import { DATAGRID_FILTER_TYPE } from '../DataGridFilterType';
import { DataGridIcons } from '../DataGridIcons';
import { DataGridLocalization } from '../DataGridLocalization';

export type DataGridContextProps<D extends {} = {}> = DataGridProps<D> & {
  hasExpandableRows: boolean;
  hasExpandedRows: boolean;
  icons: DataGridIcons;
  idPrefix: string;
  filterTypes: { [key in DATAGRID_FILTER_TYPE]: any };
  localization: DataGridLocalization;
  setCurrentEditingRow: Dispatch<SetStateAction<DataGridRow<D> | null>>;
  setCurrentFilterTypes: Dispatch<
    SetStateAction<{
      [key: string]: DataGridFilterType;
    }>
  >;
  setDensePadding: (value: boolean) => void;
  setFullScreen: (value: boolean) => void;
  setShowFilters: (value: boolean) => void;
  setShowSearch: (value: boolean) => void;
  table: DataGridInstance<D>;
};

export const DataGridContext = (<D extends {} = {}>() =>
  createContext<DataGridContextProps<D>>(
    {} as DataGridContextProps<D>,
  ) as Context<DataGridContextProps<D>>)();

export default DataGridContext;
