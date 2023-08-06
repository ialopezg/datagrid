import faker from '@faker-js/faker';
import { Meta, Story } from '@storybook/react';
import React from 'react';

import { DataGrid, DataGridProps } from '../../src';

const meta: Meta = {
  title: 'Features/Loading',
  component: DataGrid,
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

const data = [...Array(100)].map((_) => ({
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  address: faker.address.streetAddress(),
  state: faker.address.state(),
  phoneNumber: faker.phone.phoneNumber(),
}));

export const Loading: Story<DataGridProps> = () => (
  <DataGrid columns={columns} data={data} isLoading />
);

export const Reloading: Story<DataGridProps> = () => (
  <DataGrid columns={columns} data={data} isFetching />
);
