import faker from '@faker-js/faker';
import { Meta, Story } from '@storybook/react';
import React from 'react';

import DataGrid, { DataGridProps } from '../../src';

const meta: Meta = {
  title: 'Features/Column Resizing',
  component: DataGrid,
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
    accessor: 'zipCode' as const,
    Header: 'Zip Code',
  },
  {
    accessor: 'phoneNumber' as const,
    Header: 'Phone Number',
  },
];

export const ColumnResizingEnabled: Story<DataGridProps> = () => (
  <DataGrid
    columns={columns}
    data={[...Array(8)].map((_) => ({
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      address: faker.address.streetAddress(),
      state: faker.address.state(),
      zipCode: faker.address.zipCode(),
      phoneNumber: faker.phone.phoneNumber(),
    }))}
    enableColumnResizing
  />
);
