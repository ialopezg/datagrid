import React from 'react';
import { Meta, Story } from '@storybook/react';
import DataGrid, { DataGridProps } from '../../src';
import faker from '@faker-js/faker';

const meta: Meta = {
  title: 'Features/Full Screen',
  parameters: {
    status: {
      type: 'alpha',
    },
  },
};

export default meta;

const columns = [
  {
    Header: 'First Name',
    accessor: 'firstName' as const,
  },
  {
    Header: 'Last Name',
    accessor: 'lastName' as const,
  },
  {
    Header: 'Address',
    accessor: 'address' as const,
  },
  {
    Header: 'State',
    accessor: 'state' as const,
  },
  {
    Header: 'Phone Number',
    accessor: 'phoneNumber' as const,
  },
];

const data = [...Array(50)].map((_) => ({
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  address: faker.address.streetAddress(),
  state: faker.address.state(),
  phoneNumber: faker.phone.phoneNumber(),
}));

export const FullScreenToggleEnabledDefault: Story<DataGridProps> = () => (
  <DataGrid columns={columns} data={data} />
);

export const DisableFullScreenToggle: Story<DataGridProps> = () => (
  <DataGrid columns={columns} data={data} disableFullScreen />
);

export const DefaultFullScreenOn: Story<DataGridProps> = () => (
  <DataGrid columns={columns} data={data} defaultFullScreen />
);
