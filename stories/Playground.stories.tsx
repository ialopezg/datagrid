import faker from '@faker-js/faker';
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
      { accessor: 'city' as const, Footer: 'City', Header: 'City' },
      { accessor: 'state' as const, Footer: 'State', Header: 'State' },
    ],
  },
];
const data = [...Array(3)].map((_) => ({
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  address: faker.address.streetAddress(),
  city: faker.address.city(),
  state: faker.address.state(),
  zipCode: faker.address.zipCode(),
  phoneNumber: faker.phone.phoneNumber(),
}));

export const Basic: Story<DataGridProps> = () => (
  <DataGrid
    columns={columns}
    data={data}
    detailPanel={(row: any) => {
      console.log(row);
      return (
        <div style={{display: 'grid'}}>
          <span>{row.original?.address}</span>
          <span>{row.original?.city}</span>
          <span>{row.original?.state}</span>
          <span>{row.original?.zipCode}</span>
        </div>
      );
    }}
    enableFiltering
    enablePagination
    enableSearch
    enableSelection
    enableSelectAll
    paginationPosition="both"
    showToolbar
  />
);
