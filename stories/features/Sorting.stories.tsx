import faker from '@faker-js/faker';
import { Meta, Story } from '@storybook/react';
import React from 'react';

import DataGrid, { DataGridProps } from '../../src';

const meta: Meta = {
  title: 'Features/Sorting',
};

export default meta;

const columns = [
  { accessor: 'firstName' as const, Header: 'First Name' },
  { accessor: 'lastName' as const, Header: 'Last Name' },
  { accessor: 'address' as const, Header: 'Address' },
  { accessor: 'state' as const, Header: 'State' },
  { accessor: 'phoneNumber' as const, Header: 'Phone Number' },
];

const data = [...Array(100)].map((_) => ({
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  address: faker.address.streetAddress(),
  state: faker.address.state(),
  phoneNumber: faker.phone.phoneNumber(),
}));

export const SortingEnabledDefault: Story<DataGridProps> = () => (
  <DataGrid columns={columns} data={data} />
);

export const SortingDisabled: Story<DataGridProps> = () => (
  <DataGrid columns={columns} data={data} disableSortBy />
);

export const FilteringDisabledForCertainColumns: Story<DataGridProps> = () => (
  <DataGrid
    columns={[
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
        accessor: 'phoneNumber' as const,
        Header: 'Phone Number',
        disableSortBy: true,
      },
    ] as any[]}
    data={data}
  />
);
