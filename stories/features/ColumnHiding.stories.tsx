import faker from '@faker-js/faker';
import { Meta, Story } from '@storybook/react';
import React from 'react';

import DataGrid, { DataGridProps } from '../../src';

const meta: Meta = {
  title: 'Features/Column Hiding',
  component: DataGrid,
  parameters: {
    status: {
      type: 'stable',
    },
  },
};
export default meta;

const data = [...Array(100)].map((_) => ({
  firstName: faker.name.firstName(),
  middleName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  address: faker.address.streetAddress(),
  state: faker.address.state(),
  zip: faker.address.zipCode(),
  email: faker.internet.email(),
  phoneNumber: faker.phone.phoneNumber(),
}));

export const ColumnHidingEnabled: Story<DataGridProps> = () => (
  <DataGrid
    columns={[
      {
        Header: 'First Name',
        accessor: 'firstName',
      },
      {
        Header: 'Last Name',
        accessor: 'lastName',
      },
      {
        Header: 'Address',
        accessor: 'address',
      },
      {
        Header: 'State',
        accessor: 'state',
      },
      {
        Header: 'Zip',
        accessor: 'zip',
      },
      {
        Header: 'Email Address',
        accessor: 'email' as const,
      },
      {
        Header: 'Phone Number',
        accessor: 'phoneNumber',
      },
    ]}
    data={data}
    disableColumnHiding
  />
);

export const ColumnHidingWithHeaderGroups: Story<DataGridProps> = () => (
  <DataGrid
    columns={[
      {
        Header: 'Name',
        columns: [
          {
            Header: 'First Name',
            accessor: 'firstName' as const,
          },
          {
            Header: 'Last Name',
            accessor: 'lastName' as const,
          },
        ],
      },
      {
        Header: 'Mailing Info',
        columns: [
          {
            Header: 'Address',
            accessor: 'address' as const,
          },
          {
            Header: 'State',
            accessor: 'state' as const,
          },
          {
            Header: 'Zip',
            accessor: 'zip' as const,
          },
        ],
      },
      {
        Header: 'Contact Info',
        columns: [
          {
            Header: 'Email Address',
            accessor: 'email' as const,
          },
          {
            Header: 'Phone Number',
            accessor: 'phoneNumber' as const,
          },
        ],
      },
    ]}
    data={data}
  />
);
