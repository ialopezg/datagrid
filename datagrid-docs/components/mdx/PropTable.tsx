import { Link } from '@mui/material';
import DataGrid from '@ialopezg/datagrid';
import React, { useMemo } from 'react';

export const PropTable = () => {
  const columns = useMemo(
    () =>
      [
        {
          Header: 'Prop',
          accessor: 'prop' as const,
        },
        {
          Header: 'Type',
          accessor: 'type' as const,
        },
        {
          Header: 'Default',
          accessor: 'default' as const,
        },
        {
          Header: 'Description',
          accessor: 'description' as const,
        },
        {
          Header: 'Link to more info',
          accessor: 'link' as const,
          Cell: (cell: any) => (
            <Link href={cell.value} target="_blank">
              {cell.row.original.linkText}
            </Link>
          ),
        },
      ] as any[],
    [],
  );

  const data = useMemo(
    () => [
      {
        prop: 'columns',
        type: 'Array<Column>',
        default: null,
        description: 'react-table columns definition',
        link: 'https://react-table.tanstack.com/docs/api/useTable#column-options',
        linkText: 'react-table column api docs',
      },
      {
        prop: 'data',
        type: 'Array<any>',
        default: null,
        description: 'An array of your data objects',
        link: '/docs/usage',
        linkText: 'DataGrid usage docs',
      },
      {
        prop: 'disableColumnActions',
        type: 'boolean',
        default: null,
        description: 'Hide column action buttons in table head cells',
      },
      {
        prop: 'disableColumnHiding',
        type: 'boolean',
        default: null,
        description:
          'Hide the toggle show/hide columns button in toolbar and column actions menu',
      },
      {
        prop: 'disableDensePadding',
        type: 'boolean',
        default: null,
        description: 'Hide the toggle dense padding button in toolbar',
      },
      {
        prop: 'disableExpandAll',
        type: 'boolean',
        default: null,
        description: 'Hide the expand all rows button in head row',
      },
      {
        prop: 'disableFullScreen',
        type: 'boolean',
        default: null,
        description: 'Hide the toggle full screen button in toolbar',
      },
      {
        prop: 'disableSelectAll',
        type: 'boolean',
        default: null,
        description: 'Hide the toggle select all checkbox in header row',
      },
      {
        prop: 'disableSubRowTree',
        type: 'boolean',
        default: null,
        description: 'Hide the expand/collapse sub rows button in every row',
      },
      {
        prop: 'enableColumnGrouping',
        type: 'boolean',
        default: null,
        description: 'Enable the column grouping feature',
        link: '/docs/features/column-grouping',
        linkText: 'DataGrid column grouping docs',
      },
      {
        prop: 'enableColumnResizing',
        type: 'boolean',
        default: null,
        description: 'Enable the column resizing feature',
        link: '/docs/features/column-resizing',
        linkText: 'DataGrid column resizing docs',
      },
      {
        prop: 'enableRowActions',
        type: 'boolean',
        default: null,
        description: 'Enable row actions menu button in each row',
        link: '/docs/features/row-actions',
        linkText: 'DataGrid row actions docs',
      },
      {
        prop: 'enableRowEditing',
        type: 'boolean',
        default: null,
        description: 'Enable row edit button in each row',
        link: '/docs/features/row-editing',
        linkText: 'DataGrid row editing docs',
      },
      {
        prop: 'enableRowSelection',
        type: 'boolean',
        default: null,
        description: 'Enable row selection checkboxes in each row',
        link: '/docs/features/row-selection',
        linkText: 'DataGrid row selection docs',
      },
      {
        prop: 'hideFooter',
        type: 'boolean',
        default: null,
        description: 'Hide the table footer rows (not toolbar with pagination)',
      },
      {
        prop: 'hideHeader',
        type: 'boolean',
        default: null,
        description: 'Hide the table head rows',
      },
      {
        prop: 'hideToolbarActions',
        type: 'boolean',
        default: null,
        description:
          'Hide all 5 of the default action icon buttons in top toolbar',
      },
      {
        prop: 'hideToolbarBottom',
        type: 'boolean',
        default: null,
        description:
          'Hide the toolbar at the below the table (also hides bottom pagination)',
      },
      {
        prop: 'hideToolbarTop',
        type: 'boolean',
        default: null,
        description:
          'Hide the toolbar at the above the table (also hides action buttons in toolbar)',
      },
      {
        prop: 'icons',
        type: 'DataGridIcons',
        default: null,
        description: 'Override the default Mui icons',
        link: '/docs/features/customize-icons',
        linkText: 'DataGrid customize icons docs',
      },
      {
        prop: 'showRowNumbers',
        type: 'boolean',
        default: null,
        description: 'Show row numbers in the first column',
        link: '/docs/features/row-numbers',
        linkText: 'DataGrid row numbers docs',
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
        // @ts-ignore
        sortBy: [{ id: 'prop', desc: false }],
        hiddenColumns: ['default'],
        showSearch: true,
        densePadding: true,
      }}
    />
  );
};

export default PropTable;
