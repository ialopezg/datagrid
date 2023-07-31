import faker from '@faker-js/faker';
import { Meta, Story } from '@storybook/react';
import React from 'react';

import DataGrid, { DataGridProps } from '../../src';
import { Column } from 'react-table';

const meta: Meta = {
  title: 'Features/Toolbar',
  component: DataGrid,
};

export default meta;

const columns: Column<any>[] = [
  { accessor: 'firstName' as const, Header: 'First Name' },
  { accessor: 'lastName' as const, Header: 'Last Name' },
  { accessor: 'address' as const, Header: 'Address' },
  { accessor: 'phone' as const, Header: 'Phone Number' },
];

const data = [...Array(100)].map((_) => ({
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  address: faker.address.streetAddress(),
  state: faker.address.state(),
  phoneNumber: faker.phone.phoneNumber(),
}));

export const ToolbarEnabled: Story<DataGridProps> = () => (
  <DataGrid columns={columns} data={data} showToolbar />
);

export const ToolbarWithTitle: Story<DataGridProps> = () => (
  <DataGrid columns={columns} data={data} showToolbar title="People Sample" />
);

export const ToolbarWithSearch: Story<DataGridProps> = () => (
  <DataGrid
    columns={columns}
    data={data}
    enableSearch
    showToolbar
    title="People Sample"
  />
);
