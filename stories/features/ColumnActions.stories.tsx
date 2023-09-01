import faker from '@faker-js/faker';
import { Meta, Story } from '@storybook/react';
import React from 'react';

import DataGrid, { DataGridProps } from './../../src';

const meta: Meta = {
  title: 'Features/Column Actions',
  component: DataGrid,
  parameters: {
    status: {
      type: 'stable',
    },
  },
};
export default meta;

const columns = [
  {
    accessor: 'firstName' as const,
    Header: 'First Name',
  },
  {
    accessor: 'lastName' as const,
    Header: 'Last Name',
  },
  {
    accessor: 'address' as const,
    Header: 'Address',
  },
  {
    accessor: 'state' as const,
    Header: 'State',
  },
  {
    accessor: 'zip' as const,
    Header: 'Zip',
  },
  {
    accessor: 'phoneNumber' as const,
    Header: 'Phone Number',
  },
] as any[];

const data = [...Array(100)].map((_) => ({
  firstName: faker.name.firstName(),
  middleName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  address: faker.address.streetAddress(),
  state: faker.address.state(),
  zip: faker.address.zipCode(),
  phoneNumber: faker.phone.phoneNumber(),
}));

export const ColumnActionsEnabled: Story<DataGridProps> = () => (
  <DataGrid columns={columns} data={data} />
);

export const ColumnActionsDisabled: Story<DataGridProps> = () => (
  <DataGrid columns={columns} data={data} disableColumnActions />
);
