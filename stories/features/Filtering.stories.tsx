import faker from '@faker-js/faker';
import { Meta, Story } from '@storybook/react';
import React from 'react';

import DataGrid, { DataGridProps } from '../../src';

const meta: Meta = {
  title: 'Features/Filtering',
  component: DataGrid,
};
export default meta;

const columns = [
  { accessor: 'firstName' as const, Header: 'First Name' },
  { accessor: 'lastName' as const, Header: 'Last Name' },
  { accessor: 'address' as const, Header: 'Address' },
  { accessor: 'state' as const, Header: 'State' },
];
const data = [...Array(100)].map((_) => ({
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  address: faker.address.streetAddress(),
  state: faker.address.state(),
}));

export const FilteringEnabled: Story<DataGridProps> = () => (
  <DataGrid columns={columns} data={data} />
);

export const FilteringEnabledAndShown: Story<DataGridProps> = () => (
  <DataGrid columns={columns} data={data} defaultShowFilters />
);

export const FilteringDisabled: Story<DataGridProps> = () => (
  <DataGrid columns={columns} data={data} disableFilters />
);

export const FilteringDisabledForCertainColumns: Story<DataGridProps> = () => (
  <DataGrid
    columns={[
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
        disableFilters: true,
      },
      {
        Header: 'State',
        accessor: 'state' as const,
      },
    ] as any[]}
    data={data}
    defaultShowFilters
  />
);
