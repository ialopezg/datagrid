import faker from '@faker-js/faker';
import { Meta, Story } from '@storybook/react';
import React from 'react';

import DataGrid, { DataGridProps } from '../../src';

const meta: Meta = {
  title: 'Features/Header Groups',
  component: DataGrid,
};

export default meta;

const columns = [
  {
    Header: 'Name',
    columns: [
      {
        accessor: 'firstName' as const,
        Header: 'First Name',
      },
      {
        accessor: 'lastName' as const,
        Header: 'Last Name',
      },
    ],
  },
  {
    Header: 'Info',
    columns: [
      { accessor: 'city' as const, Header: 'City' },
      { accessor: 'state' as const, Header: 'State' },
    ],
  },
];
const data = [...Array(5)].map((_) => ({
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  address: faker.address.streetAddress(),
  city: faker.address.city(),
  state: faker.address.state(),
  zipCode: faker.address.zipCode(),
  phoneNumber: faker.phone.phoneNumber(),
}));

export const Header: Story<DataGridProps> = () => (
  <DataGrid columns={columns} data={data} />
);

export const HeaderAndFooter: Story<DataGridProps> = () => (
  <DataGrid
    columns={[
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
    ]}
    data={data}
  />
);
