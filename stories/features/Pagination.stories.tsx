import faker from '@faker-js/faker';
import { Meta, Story } from '@storybook/react';
import React from 'react';

import DataGrid, { DataGridProps } from '../../src';

const meta: Meta = {
  title: 'Features/Pagination',
  component: DataGrid,
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

export const PaginationEnabled: Story<DataGridProps> = () => (
  <DataGrid columns={columns} data={data} />
);

export const PaginationDisabled: Story<DataGridProps> = () => (
  <DataGrid columns={columns} data={data} enablePagination={false} />
);

export const PaginationOnBottom: Story<DataGridProps> = () => (
  <DataGrid columns={columns} data={data} />
);

export const PaginationOnTop: Story<DataGridProps> = () => (
  <DataGrid columns={columns} data={data} paginationPosition="top" />
);

export const PaginationOnBothToolbars: Story<DataGridProps> = () => (
  <DataGrid columns={columns} data={data} paginationPosition="both" />
);
