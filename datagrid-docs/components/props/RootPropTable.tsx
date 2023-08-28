import { Link } from '@mui/material';
import React, { useMemo } from 'react';

import DataGrid from '../../../src';

const RootPropTable = () => {
  const columns = useMemo(
    () =>
      [
        {
          Header: 'Prop',
          accessor: 'prop' as const,
          Cell: (cell: any) =>
            cell.row.original.required ? (
              <strong>{cell.value}*</strong>
            ) : (
              cell.value
            ),
        },
        { Header: 'Type', accessor: 'type' as const, disableFilters: true },
        {
          Header: 'Default',
          accessor: 'default' as const,
          disableFilters: true,
        },
        {
          Header: 'Link to more info',
          accessor: 'link' as const,
          disableFilters: true,
          Cell: (cell: any) => (
            <Link href={cell.value} target="_blank">
              {' '}
              {cell.row.original.linkText}{' '}
            </Link>
          ),
        },
        { Header: 'Description', accessor: 'description' as const },
      ] as any[],
    [],
  );

  const data = useMemo(
    () => [
      {
        prop: 'bodyCellProps',
        type: 'TableCellProps',
        description:
          'Pass in custom props to every MUI TableBodyCell. Also available within the columns definition',
        link: 'https://mui.com/material-ui/api/table-cell',
        linkText: 'MUI TableCell API docs',
      },
      {
        prop: 'bodyCellEditProps',
        type: 'TextFieldProps',
        description:
          'Pass in custom props to the MUI TextField for editable cells',
        link: 'https://mui.com/material-ui/api/text-field',
        linkText: 'MUI TextField API docs',
      },
      {
        prop: 'bodyCellSkeletonProps',
        type: 'SkeletonProps',
        description:
          'Pass in custom props to the MUI TextField for editable cells',
        link: 'https://mui.com/material-ui/api/skeleton/',
        linkText: 'MUI TextField API docs',
      },
      {
        prop: 'bodyProps',
        type: 'TableBodyProps',
        description: 'Pass in custom props to the MUI TableBody',
        link: 'https://mui.com/material-ui/api/table-body',
        linkText: 'MUI TableBody API docs',
      },
      {
        prop: 'bodyRowProps',
        type: 'TableRowProps',
        description: 'Pass in custom props to every MUI TableBodyRow',
        link: 'https://mui.com/material-ui/api/table-row',
        linkText: 'MUI TableRow API docs',
      },
      {
        prop: 'columns',
        type: 'Array<DataGridColumn>',
        description: 'react-table column definitions',
        link: 'https://react-table.tanstack.com/docs/api/useTable#column-options',
        linkText: 'react-table column api docs',
        required: true,
      },
      {
        prop: 'containerProps',
        type: 'TableContainerProps',
        description: 'Pass in custom props to the MUI TableContainer',
        link: 'https://mui.com/material-ui/api/table-container',
        linkText: 'MUI TableContainer API docs',
      },
      {
        prop: 'data',
        type: 'Array<any>',
        description: 'An array of your data objects',
        link: '/docs/usage',
        linkText: 'DataGrid usage docs',
        required: true,
      },
      {
        prop: 'detailPanelProps',
        type: 'TableCellProps',
        description:
          'Pass in custom props to container element created for renderDetailPanel',
        link: 'https://mui.com/material-ui/api/table-cell',
        linkText: 'MUI TableCell API docs',
      },
      {
        prop: 'disableColumnActions',
        type: 'boolean',
        description: 'Hide column action buttons in table head cells',
      },
      {
        prop: 'disableColumnHiding',
        type: 'boolean',
        description:
          'Hide the toggle show/hide columns button in toolbar and column actions menu',
      },
      {
        prop: 'disableDensePadding',
        type: 'boolean',
        description: 'Hide the toggle dense padding button in toolbar',
      },
      {
        prop: 'disableExpandAll',
        type: 'boolean',
        description: 'Hide the expand all rows button in head row',
      },
      {
        prop: 'disableFullScreen',
        type: 'boolean',
        description: 'Hide the toggle full screen button in toolbar',
      },
      {
        prop: 'disableSelectAll',
        type: 'boolean',
        description: 'Hide the toggle select all checkbox in header row',
      },
      {
        prop: 'disableSubRowTree',
        type: 'boolean',
        description: 'Hide the expand/collapse sub rows button in every row',
      },
      {
        prop: 'enableColumnGrouping',
        type: 'boolean',
        description: 'Enable the column grouping feature',
        link: '/docs/guides/column-grouping',
        linkText: 'DataGrid column grouping docs',
      },
      {
        prop: 'enableColumnResizing',
        type: 'boolean',
        description: 'Enable the column resizing feature',
        link: '/docs/guides/column-resizing',
        linkText: 'DataGrid column resizing docs',
      },
      {
        prop: 'enableRowActions',
        type: 'boolean',
        description: 'Enable row actions menu button in each row',
        link: '/docs/guides/row-actions',
        linkText: 'MRT row actions docs',
      },
      {
        prop: 'enableRowEditing',
        type: 'boolean',
        description: 'Enable row edit button in each row',
        link: '/docs/guides/row-editing',
        linkText: 'DataGrid row editing docs',
      },
      {
        prop: 'enableRowSelection',
        type: 'boolean',
        description: 'Enable row selection checkboxes in each row',
        link: '/docs/guides/row-selection',
        linkText: 'DataGrid row selection docs',
      },
      {
        prop: 'filterTypes',
        type: 'Object<string, any>',
        description:
          'Override and define your own custom filter types and functions',
        link: '/docs/guides/filtering',
        linkText: 'DataGrid filtering docs',
      },
      {
        prop: 'footerCellProps',
        type: 'TableCellProps',
        description:
          'Pass in custom props to every MUI TableFooterCell. Also available within the columns definition',
        link: 'https://mui.com/material-ui/api/table-cell',
        linkText: 'MUI TableCell API docs',
      },
      {
        prop: 'footerProps',
        type: 'TableFooterProps',
        description: 'Pass in custom props to the MUI TableFooter',
        link: 'https://mui.com/material-ui/api/table-footer',
        linkText: 'MUI TableFooter API docs',
      },
      {
        prop: 'footerRowProps',
        type: 'TableRowProps',
        description: 'Pass in custom props to every MUI TableFooterRow',
        link: 'https://mui.com/api/table-row',
        linkText: 'MUI TableRow API docs',
      },
      {
        prop: 'headerCellFilterProps',
        type: 'TextFieldProps',
        description:
          'Pass in custom props to the MUI TextField for the filter input in every column header. Also available within the columns definition',
        link: 'https://mui.com/material-ui/api/text-field',
        linkText: 'MUI TextField API docs',
      },
      {
        prop: 'headerCellProps',
        type: 'TableCellProps',
        description:
          'Pass in custom props to every MUI TableHeadCell. Also available within the columns definition.',
        link: 'https://mui.com/material-ui/api/table-cell',
        linkText: 'MUI TableCell API docs',
      },
      {
        prop: 'headerProps',
        type: 'TableHeadProps',
        description: 'Pass in custom props to the MUI TableHead',
        link: 'https://mui.com/material-ui/api/table-head',
        linkText: 'MUI TableHead API docs',
      },
      {
        prop: 'headerRowProps',
        type: 'TableRowProps',
        description: 'Pass in custom props to every MUI TableHeadRow',
        link: 'https://mui.com/api/table-row',
        linkText: 'MUI TableRow API docs',
      },
      {
        prop: 'hideFooter',
        type: 'boolean',
        description: 'Hide the table footer rows (not toolbar with pagination)',
      },
      {
        prop: 'hideHeader',
        type: 'boolean',
        description: 'Hide the table head rows',
      },
      {
        prop: 'hideToolbarActions',
        type: 'boolean',
        description:
          'Hide all 5 of the default action icon buttons in top toolbar',
      },
      {
        prop: 'hideToolbarBottom',
        type: 'boolean',
        description:
          'Hide the toolbar at the below the table (also hides bottom pagination)',
      },
      {
        prop: 'hideToolbarTop',
        type: 'boolean',
        description:
          'Hide the toolbar at the above the table (also hides action buttons in toolbar)',
      },
      {
        prop: 'icons',
        type: 'DataGridIcons',
        description: 'Override the default MUI icons',
        link: '/docs/guides/customize-icons',
        linkText: 'DataGrid customize icons docs',
      },
      {
        prop: 'idPrefix',
        type: 'string',
        description:
          'Manually set a prefix for all html ids in the table. (Otherwise randomly generated)',
      },
      {
        prop: 'initialState',
        type: 'DataGridState',
        default: '{}',
        description:
          'Give the table a custom initial state. Useful for persisting state',
      },
      {
        prop: 'isFetching',
        type: 'boolean',
        description:
          'Shows a linear progress bar while data is loading or refreshing',
      },
      {
        prop: 'isLoading',
        type: 'boolean',
        description:
          'Shows skeleton loaders in table while data is loading for the first time',
      },
      {
        prop: 'linearProgressProps',
        type: 'LinearProgressProps',
        description: 'Override the default MUI LinearProgress props',
        link: 'https://mui.com/material-ui/api/linear-progress/#props',
        linkText: 'MUI LinearProgress docs',
      },
      {
        prop: 'localization',
        type: 'DataGridLocalization',
        description:
          'Override any of the default english strings to whatever you want',
      },
      {
        prop: 'onCellClick',
        type: '(event, cell) => void',
        description: 'Callback for when a cell is clicked',
      },
      {
        prop: 'onColumnHide',
        type: '(column, visibleColumns) => void',
        description: 'Callback for when a column is hidden',
      },
      {
        prop: 'paginationProps',
        type: 'TablePaginationProps',
        description: 'Pass in custom props to the MUI TablePagination',
        link: 'https://mui.com/material-ui/api/table-pagination',
        linkText: 'MUI TablePagination API docs',
      },
      {
        prop: 'searchBoxProps',
        type: 'TextFieldProps',
        description:
          'Pass in custom props to the MUI TextField for the search input',
        link: 'https://mui.com/material-ui/api/text-field',
        linkText: 'MUI TextField API docs',
      },
      {
        prop: 'showRowNumbers',
        type: 'boolean',
        description: 'Show row numbers in the first column',
        link: '/docs/guides/row-numbers',
        linkText: 'DataGrid row numbers docs',
      },
      {
        prop: 'tableProps',
        type: 'TableProps',
        description: 'Pass in custom props to the MUI Table',
        link: 'https://mui.com/material-ui/api/table',
        linkText: 'MUI Table API docs',
      },
      {
        prop: 'toolbarAlertBannerProps',
        type: 'AlertProps',
        description:
          'Pass in custom props to the MUI Alert that appears in the toolbar',
        link: 'https://mui.com/material-ui/api/alert',
        linkText: 'MUI Alert API docs',
      },
      {
        prop: 'toolbarBottomProps',
        type: 'ToolbarProps',
        description:
          'Pass in custom props to the MUI TableToolbar at the bottom of the table',
        link: 'https://mui.com/material-ui/api/toolbar',
        linkText: 'MUI Toolbar API docs',
      },
      {
        prop: 'toolbarTopProps',
        type: 'ToolbarProps',
        description:
          'Pass in custom props to the MUI TableToolbar at the top of the table',
        link: 'https://mui.com/material-ui/api/toolbar',
        linkText: 'MUI Toolbar API docs',
      },
    ],
    [],
  );

  return (
    <DataGrid
      columns={columns}
      data={data}
      manualPagination
      hideToolbarBottom
      initialState={{
        densePadding: true,
        hiddenColumns: ['default'],
        showFilters: true,
        showSearch: true,
        sortBy: [{ id: 'prop', desc: false }],
      }}
    />
  );
};

export default RootPropTable;
