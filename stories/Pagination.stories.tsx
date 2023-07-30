import faker from '@faker-js/faker';
import { Meta, Story } from '@storybook/react';
import React from 'react';

import DataGrid, { DataGridProps } from '../src';
import { Column } from 'react-table';

const meta: Meta = {
  title: 'Features/Pagination',
};

export default meta;

const columns: Column<any>[] = [
  { accessor: 'firstName', Header: 'First Name' },
  { accessor: 'lastName', Header: 'Last Name' },
  { accessor: 'age', Header: 'Age' },
  { accessor: 'address', Header: 'Address' },
];

const data = [...Array(21)].map((_) => ({
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  age: faker.datatype.number(80),
  address: faker.address.streetAddress(),
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
