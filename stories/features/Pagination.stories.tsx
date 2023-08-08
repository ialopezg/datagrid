import faker from '@faker-js/faker';
import { Meta, Story } from '@storybook/react';
import React from 'react';

import DataGrid, { DataGridProps } from '../../src';

const meta: Meta = {
  title: 'Features/Pagination',
  component: DataGrid,
  parameters: {
    status: {
      type: 'stable',
    },
  },
};

export default meta;

const columns = [
  { accessor: 'firstName' as const, Header: 'First Name' },
  { accessor: 'lastName' as const, Header: 'Last Name' },
  { accessor: 'address' as const, Header: 'Address' },
  { accessor: 'state' as const, Header: 'State' },
  { accessor: 'phone' as const, Header: 'Phone' },
];

const data = [...Array(21)].map((_) => ({
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  address: faker.address.streetAddress(),
  state: faker.address.state(),
  phone: faker.phone.phoneNumber(),
}));

export const PaginationEnabledDefault: Story<DataGridProps> = () => (
  <DataGrid columns={columns} data={data} />
);

export const PaginationDisabledOrOverriden: Story<DataGridProps> = () => (
  <DataGrid columns={columns} data={data} manualPagination />
);

export const PaginationPositionBottom: Story<DataGridProps> = () => (
  <DataGrid columns={columns} data={data} />
);

export const PaginationPositionTop: Story<DataGridProps> = () => (
  <DataGrid columns={columns} data={data} paginationPosition="top" />
);

export const PaginationPositionTopAndBottom: Story<DataGridProps> = () => (
  <DataGrid columns={columns} data={data} paginationPosition="both" />
);

export const CustomizePaginationComponents: Story<DataGridProps> = () => (
  <DataGrid
    columns={columns}
    data={data}
    initialState={{ pageSize: 5 }}
    paginationProps={{
      rowsPerPageOptions: [5, 10, 20],
      showFirstButton: false,
      showLastButton: false,
      SelectProps: { native: true },
      labelRowsPerPage: 'Number of rows visible',
    }}
  />
);
