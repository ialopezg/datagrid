import faker from '@faker-js/faker';
import { Meta, Story } from '@storybook/react';
import React from 'react';

import DataGrid, { DataGridProps } from '../../src';

const meta: Meta = {
  title: 'Features/Search',
  component: DataGrid,
  parameters: {
    status: {
      type: 'stable',
    },
  },
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

export const SearchEnabledDefault: Story<DataGridProps> = () => (
  <DataGrid columns={columns} data={data} />
);

export const ShowSearchBoxByDefault: Story<DataGridProps> = () => (
  <DataGrid columns={columns} data={data} defaultShowSearch />
);

export const JustASearchBox: Story<DataGridProps> = () => (
  <DataGrid
    columns={columns}
    data={data}
    defaultShowSearch
    hideToolbarActions
  />
);

export const SearchDisabled: Story<DataGridProps> = () => (
  <DataGrid columns={columns} data={data} disableGlobalFilter />
);

export const CustomizeSearchTextBox: Story<DataGridProps> = () => (
  <DataGrid
    columns={columns}
    data={data}
    defaultShowSearch
    searchBoxProps={{
      variant: 'outlined',
      placeholder: 'Search 100 rows',
      label: 'Search',
      InputLabelProps: { shrink: true },
    }}
  />
);
