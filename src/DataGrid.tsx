import {
  AlertProps,
  IconButtonProps,
  LinearProgressProps,
  SkeletonProps,
  TableBodyProps,
  TableCellProps,
  TableContainerProps,
  TableFooterProps,
  TableHeadProps,
  TablePaginationProps,
  TableProps,
  TableRowProps,
  TextFieldProps,
  ToolbarProps,
} from '@mui/material';
import {
  Cell,
  Column,
  ColumnInstance,
  ColumnInterface,
  FilterType,
  HeaderGroup,
  Row,
  TableInstance,
  TableOptions,
  TableState,
  UseColumnOrderInstanceProps,
  UseColumnOrderState,
  UseExpandedInstanceProps,
  UseExpandedOptions,
  UseExpandedRowProps,
  UseExpandedState,
  UseFiltersColumnOptions,
  UseFiltersColumnProps,
  UseFiltersInstanceProps,
  UseFiltersOptions,
  UseFiltersState,
  UseGlobalFiltersColumnOptions,
  UseGlobalFiltersInstanceProps,
  UseGlobalFiltersOptions,
  UseGlobalFiltersState,
  UseGroupByCellProps,
  UseGroupByColumnOptions,
  UseGroupByColumnProps,
  UseGroupByInstanceProps,
  UseGroupByOptions,
  UseGroupByRowProps,
  UseGroupByState,
  UsePaginationInstanceProps,
  UsePaginationOptions,
  UsePaginationState,
  UseResizeColumnsColumnProps,
  UseResizeColumnsOptions,
  UseResizeColumnsState,
  UseRowSelectInstanceProps,
  UseRowSelectOptions,
  UseRowSelectRowProps,
  UseRowSelectState,
  UseRowStateCellProps,
  UseRowStateInstanceProps,
  UseRowStateOptions,
  UseRowStateRowProps,
  UseRowStateState,
  UseSortByColumnOptions,
  UseSortByColumnProps,
  UseSortByInstanceProps,
  UseSortByOptions,
  UseSortByState,
  UseTableHeaderGroupProps,
  UseTableInstanceProps,
  UseTableOptions,
} from 'react-table';
import React, { ChangeEvent, FC, MouseEvent, ReactNode } from 'react';
import { defaultFilters } from './DataGridFilters';
import { DATAGRID_FILTER_TYPE } from './DataGridFilterType';

import DataGridProvider from './providers/DataGridProvider';
import DataGridContainer from './table/DataGridContainer';
import {
  DefaultLocalization,
  DataGridLocalization,
} from './DataGridLocalization';
import { DataGridIcons, DefaultDataGridIcons } from './DataGridIcons';

export type DataGridOptions<D extends {} = {}> = TableOptions<D> &
  UseExpandedOptions<D> &
  UseFiltersOptions<D> &
  UseGlobalFiltersOptions<D> &
  UseGroupByOptions<D> &
  UsePaginationOptions<D> &
  UseResizeColumnsOptions<D> &
  UseRowSelectOptions<D> &
  UseRowStateOptions<D> &
  UseSortByOptions<D> & {
    columns: DataGridColumnInterface[];
    data: D[];
    initialState?: Partial<DataGridState>;
  };

export type DataGridInstance<D extends {} = {}> = TableInstance<D> &
  UseTableInstanceProps<D> &
  UseColumnOrderInstanceProps<D> &
  UseExpandedInstanceProps<D> &
  UseFiltersInstanceProps<D> &
  UseGlobalFiltersInstanceProps<D> &
  UseGroupByInstanceProps<D> &
  UsePaginationInstanceProps<D> &
  UseRowSelectInstanceProps<D> &
  UseRowStateInstanceProps<D> &
  UseSortByInstanceProps<D> & {
    columns: (Column<D> & DataGridColumnInstance<D>)[];
    footerGroups: DataGridHeaderGroup<D>[];
    getToggleAllRowsExpandedProps: () => void;
    headerGroups: DataGridHeaderGroup<D>[];
    page: DataGridRow<D>[];
    resetResizing: () => void;
    rows: DataGridRow<D>[];
    state: DataGridState<D>;
  };

export type DataGridColumnInterface<D extends {} = {}> = ColumnInterface<D> &
  UseFiltersColumnOptions<D> &
  UseGlobalFiltersColumnOptions<D> &
  UseGroupByColumnOptions<D> &
  UseResizeColumnsColumnProps<D> &
  UseSortByColumnOptions<D> & {
    accessor?: string;
    bodyCellProps?:
      | TableCellProps
      | ((cell: DataGridCell<D>) => TableCellProps);
    bodyCellEditProps?:
      | TextFieldProps
      | ((cell: DataGridCell<D>) => TextFieldProps);
    columns?: DataGridColumnInterface<D>[];
    disableClickToCopy?: boolean;
    disableEditing?: boolean;
    disableFilters?: boolean;
    filter?: DataGridFilterType | string | FilterType<D>;
    filterSelectOptions?: (
      | string
      | {
          text: string;
          value: string;
        }
    )[];
    filterTypes?: (DATAGRID_FILTER_TYPE | string)[];
    footerCellProps?: TableCellProps | ((column: Column<D>) => TableCellProps);
    headerCellProps?: TableCellProps | ((column: Column<D>) => TableCellProps);
    headerCellFilterProps?:
      | TextFieldProps
      | ((column: Column<D>) => TextFieldProps);
    onCellEditChange?: (
      e: ChangeEvent<HTMLInputElement>,
      cell: DataGridCell<D>,
    ) => void;
    onFilterChange?: (e: ChangeEvent<HTMLInputElement>, value: any) => void;
    Edit?: ({
      cell,
      onChange,
    }: {
      cell: DataGridCell<D>;
      onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
    }) => ReactNode;
    Filter?: ({ column }: { column: DataGridHeaderGroup<D> }) => ReactNode;
    Footer?: string;
    Header?: string;
  };

export type DataGridColumnInstance<D extends {} = {}> = ColumnInstance<D> &
  UseFiltersColumnProps<D> &
  UseGroupByColumnProps<D> &
  UseResizeColumnsColumnProps<D> &
  UseSortByColumnProps<D> &
  DataGridColumnInterface<D> & {
    columns?: DataGridColumnInstance<D>[];
  };

export type DataGridHeaderGroup<D extends {} = {}> = HeaderGroup<D> &
  DataGridColumnInstance<D> &
  UseTableHeaderGroupProps<D> & {
    headers: DataGridHeaderGroup<D>[];
  };

export type DataGridRow<D extends {} = {}> = Row<D> &
  UseExpandedRowProps<D> &
  UseGroupByRowProps<D> &
  UseRowSelectRowProps<D> &
  UseRowStateRowProps<D> & {
    cells: DataGridCell<D>[];
  };

export type DataGridCell<D extends {} = {}, _V = any> = Cell<D> &
  UseGroupByCellProps<D> &
  UseRowStateCellProps<D> & {
    column: DataGridColumnInstance<D>;
  };

export type DataGridFilterType = DATAGRID_FILTER_TYPE | Function;

export type DataGridState<D extends {} = {}> = TableState<D> &
  UseColumnOrderState<D> &
  UseExpandedState<D> &
  UseFiltersState<D> &
  UseGlobalFiltersState<D> &
  UseGroupByState<D> &
  UsePaginationState<D> &
  UseResizeColumnsState<D> &
  UseRowSelectState<D> &
  UseRowStateState<D> &
  UseSortByState<D> & {
    currentEditingRow: DataGridRow<D> | null;
    currentFilterTypes: {
      [key: string]: DataGridFilterType;
    };
    densePadding: boolean;
    fullScreen: boolean;
    showFilters: boolean;
    showSearch: boolean;
  };

export type DataGridProps<D extends {} = {}> = UseTableOptions<D> &
  UseExpandedOptions<D> &
  UseFiltersOptions<D> &
  UseGlobalFiltersOptions<D> &
  UseGroupByOptions<D> &
  UsePaginationOptions<D> &
  UseResizeColumnsOptions<D> &
  UseRowSelectOptions<D> &
  UseRowStateOptions<D> &
  UseSortByOptions<D> &
  DataGridOptions<D> & {
    bodyCellProps?:
      | TableCellProps
      | ((cell?: DataGridCell<D>) => TableCellProps);
    bodyCellEditProps?:
      | TextFieldProps
      | ((cell?: DataGridCell<D>) => TextFieldProps);
    bodyCellSkeletonProps?:
      | SkeletonProps
      | ((cell?: DataGridCell<D>) => SkeletonProps);
    bodyProps?:
      | TableBodyProps
      | ((table: DataGridInstance<D>) => TableBodyProps);
    bodyRowProps?: TableRowProps | ((row: Row<D>) => TableRowProps);
    containerProps?:
      | TableContainerProps
      | ((table: DataGridInstance<D>) => TableContainerProps);
    detailPanel?: (row: DataGridRow<D>) => ReactNode;
    detailPanelProps?: TableCellProps | ((row: Row<D>) => TableCellProps);
    disableColumnActions?: boolean;
    disableColumnHiding?: boolean;
    disableDensePadding?: boolean;
    disableExpandAll?: boolean;
    disableFullScreen?: boolean;
    disableSelectAll?: boolean;
    disableSubRowTree?: boolean;
    enableClickToCopy?: boolean;
    enableColumnGrouping?: boolean;
    enableColumnResizing?: boolean;
    enableRowActions?: boolean;
    enableRowEditing?: boolean;
    enableSelection?: boolean;
    filterTypes?: { [key in DATAGRID_FILTER_TYPE]: any };
    footerCellProps?: TableCellProps | ((column: Column<D>) => TableCellProps);
    footerProps?:
      | TableFooterProps
      | ((table: DataGridInstance<D>) => TableFooterProps);
    footerRowProps?:
      | TableRowProps
      | ((footerGroup: DataGridHeaderGroup<D>) => TableRowProps);
    headerCellFilterProps?:
      | TextFieldProps
      | ((column: Column<D>) => TextFieldProps);
    headerCellProps?: TableCellProps | ((column: Column<D>) => TableCellProps);
    headerProps?:
      | TableHeadProps
      | ((table: DataGridInstance<D>) => TableHeadProps);
    headerRowProps?:
      | TableRowProps
      | ((row: DataGridHeaderGroup<D>) => TableRowProps);
    hideFooter?: boolean;
    hideHeader?: boolean;
    hideToolbarActions?: boolean;
    hideToolbarBottom?: boolean;
    hideToolbarTop?: boolean;
    icons?: Partial<DataGridIcons>;
    idPrefix?: string;
    isFetching?: boolean;
    isLoading?: boolean;
    localization?: Partial<DataGridLocalization>;
    linearProgressProps?:
      | LinearProgressProps
      | ((table: DataGridInstance<D>) => LinearProgressProps);
    onCellClick?: (
      e: MouseEvent<HTMLTableCellElement>,
      cell: DataGridCell<D>,
    ) => void;
    onColumnHide?: (column: Column<D>, hiddenColumns?: string[]) => void;
    onDetailPanelClick?: (
      e: MouseEvent<HTMLTableCellElement>,
      row: Row<D>,
    ) => void;
    onGlobalFilterChange?: (e: ChangeEvent<HTMLInputElement>) => void;
    onRowClick?: (e: MouseEvent<HTMLTableRowElement>, row: Row<D>) => void;
    onRowEditSubmit?: (row: Row<D>) => Promise<void> | void;
    onRowExpandedChange?: (
      e: MouseEvent<HTMLButtonElement>,
      row: Row<D>,
    ) => void;
    onSelectAllChange?: (e: ChangeEvent, selectedRows: Row<D>[]) => void;
    onSelectChange?: (
      e: ChangeEvent,
      row: Row<D>,
      selectedRows: Row<D>[],
    ) => void;
    paginationPosition?: 'bottom' | 'both' | 'top';
    paginationProps?:
      | Partial<TablePaginationProps>
      | ((table: DataGridInstance<D>) => Partial<TablePaginationProps>);
    rowActions?: (row: Row<D>, table: DataGridInstance<D>) => ReactNode;
    rowActionsColumn?: 'first' | 'last';
    rowActionMenuItems?: (
      row: Row<D>,
      table: DataGridInstance<D>,
      onCloseMenu: () => void,
    ) => ReactNode[];
    searchTextFieldProps?: TextFieldProps;
    showRowNumbers?: boolean;
    tableProps?: TableProps | ((table: DataGridInstance<D>) => TableProps);
    toolbarActionsPosition?: 'bottom' | 'top';
    toolbarAlertBannerPosition?: 'bottom' | 'top';
    toolbarAlertBannerProps?:
      | AlertProps
      | ((table: DataGridInstance<D>) => AlertProps);
    toolbarBottomProps?:
      | ToolbarProps
      | ((table: DataGridInstance<D>) => ToolbarProps);
    toolbarCustomActions?: (table: DataGridInstance<D>) => ReactNode;
    toolbarDefaultActions?: (
      table: TableInstance<D>,
      {
        ToggleColumnVisibilityAction,
        ToggleDensePaddingAction,
        ToggleFilterVisibilityAction,
        ToggleFullScreenAction,
        ToggleSearchAction,
      }: {
        ToggleColumnVisibilityAction: FC<IconButtonProps>;
        ToggleDensePaddingAction: FC<IconButtonProps>;
        ToggleFilterVisibilityAction: FC<IconButtonProps>;
        ToggleFullScreenAction: FC<IconButtonProps>;
        ToggleSearchAction: FC<IconButtonProps>;
      },
    ) => ReactNode;
    toolbarTopProps?:
      | ToolbarProps
      | ((table: DataGridInstance<D>) => ToolbarProps);
  };

export default <D extends {} = {}>({
  defaultColumn = { minWidth: 50, maxWidth: 1000 },
  filterTypes,
  globalFilter = 'fuzzy',
  icons,
  localization,
  rowActionsColumn = 'first',
  paginationPosition = 'bottom',
  toolbarActionsPosition = 'top',
  toolbarAlertBannerPosition = 'top',
  ...rest
}: DataGridProps<D>) => (
  <DataGridProvider
    // @ts-ignore
    defaultColumn={defaultColumn}
    // @ts-ignore
    filterTypes={{ defaultFilters, ...filterTypes }}
    // @ts-ignore
    globalFilter={globalFilter}
    icons={{ ...DefaultDataGridIcons, ...icons }}
    localization={{ ...DefaultLocalization, ...localization }}
    paginationPosition={paginationPosition}
    rowActionsColumn={rowActionsColumn}
    toolbarActionsPosition={toolbarActionsPosition}
    toolbarAlertBannerPosition={toolbarAlertBannerPosition}
    {...rest}
  >
    <DataGridContainer />
  </DataGridProvider>
);
