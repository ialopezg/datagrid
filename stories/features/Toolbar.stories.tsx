import faker from '@faker-js/faker';
import { Meta, Story } from '@storybook/react';
import React from 'react';

import DataGrid, { DataGridProps } from '../../src';

const meta: Meta = {
  title: 'Features/ToolbarBottom',
  component: DataGrid,
};
export default meta;

const columns = [
  { accessor: 'firstName' as const, Header: 'First Name' },
  { accessor: 'lastName' as const, Header: 'Last Name' },
  { accessor: 'address' as const, Header: 'Address' },
  { accessor: 'phoneNumber' as const, Header: 'Phone Number' },
];

const data = [...Array(100)].map((_) => ({
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  address: faker.address.streetAddress(),
  state: faker.address.state(),
  phoneNumber: faker.phone.phoneNumber(),
}));

export const ToolbarEnabledDefault: Story<DataGridProps> = () => (
  <DataGrid columns={columns} data={data} title="DataGrid" />
);

export const TopToolbarHidden: Story<DataGridProps> = () => (
  <DataGrid columns={columns} data={data} hideToolbarTop />
);

export const BottomToolbarHidden: Story<DataGridProps> = () => (
  <DataGrid columns={columns} data={data} hideToolbarBottom />
);

export const NoToolbars: Story<DataGridProps> = () => (
  <DataGrid columns={columns} data={data} hideToolbarTop hideToolbarBottom />
);

export const HideToolbarActions: Story<DataGridProps> = () => (
  <DataGrid columns={columns} data={data} hideToolbarActions />
);

export const ToolbarActionsOnBottom: Story<DataGridProps> = () => (
  <DataGrid
    columns={columns}
    data={data}
    title="My People Table"
    paginationPosition="bottom"
  />
);

export const ToolbarWithStyledTitle: Story<DataGridProps> = () => (
  <DataGrid
    columns={columns}
    data={data}
    title="My People Table"
    titleProps={{ variant: 'h4' }}
  />
);
