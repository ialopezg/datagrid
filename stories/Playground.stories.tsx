import fake from '@faker-js/faker';
import { Meta, Story } from '@storybook/react';
import React from 'react';

import DataGrid, { DataGridProps } from '../src';

const meta: Meta = {
  title: 'Playground',
  component: DataGrid,
};

export default meta;

const columns = [
  {
    Footer: 'Name',
    Header: 'Name',
    columns: [
      {
        accessor: 'firstName' as const,
        Footer: 'First Name',
        Header: 'First Name',
      },
      {
        accessor: 'lastName' as const,
        Footer: 'Last Name',
        Header: 'Last Name',
      },
    ],
  },
  {
    Footer: 'Info',
    Header: 'Info',
    columns: [
      { accessor: 'address' as const, Footer: 'Address', Header: 'Address' },
      { accessor: 'state' as const, Footer: 'State', Header: 'State' },
    ],
  },
];
const data = [...Array(3)].map((_) => ({
  firstName: fake.name.firstName(),
  lastName: fake.name.lastName(),
  state: fake.address.state(),
  address: fake.address.streetAddress(),
}));

export const Basic: Story<DataGridProps> = () => (
  <DataGrid
    columns={columns}
    data={data}
    enableFiltering
    enablePagination
    enableSearch
    enableSelection
    enableSelectAll
    paginationPosition="both"
    showToolbar
  />
);
