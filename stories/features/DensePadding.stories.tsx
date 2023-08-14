import faker from '@faker-js/faker';
import { Meta, Story } from '@storybook/react';
import React from 'react';

import DataGrid, { DataGridProps } from '../../src';

const meta: Meta = {
  title: 'Features/Dense Padding',
  component: DataGrid,
  parameters: {
    status: {
      type: 'beta',
    },
  },
};
export default meta;

const columns = [
  { accessor: 'firstName' as const, Header: 'First Name' },
  { accessor: 'lastName' as const, Header: 'Last Name' },
  { accessor: 'address' as const, Header: 'Address' },
  { accessor: 'city' as const, Header: 'City' },
  { accessor: 'state' as const, Header: 'State' },
  { accessor: 'zipCode' as const, Header: 'Zip Code' },
  { accessor: 'phoneNumber' as const, Header: 'Phone Number' },
];
const data = [...Array(25)].map((_) => ({
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  address: faker.address.streetAddress(),
  city: faker.address.city(),
  state: faker.address.state(),
  zipCode: faker.address.zipCode(),
  phoneNumber: faker.phone.phoneNumber(),
}));

export const DensePaddingEnabledDefault: Story<DataGridProps> = () => (
  <DataGrid columns={columns} data={data} initialState={{ pageSize: 25 }} />
);

export const DensePaddingDisabled: Story<DataGridProps> = () => (
  <DataGrid
    columns={columns}
    data={data}
    disableDensePadding
    initialState={{ pageSize: 25 }}
  />
);

export const DefaultToDensePadding: Story<DataGridProps> = () => (
  <DataGrid
    columns={columns}
    data={data}
    initialState={{ pageSize: 25, densePadding: true }}
  />
);
