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
    Header: 'Zip Code',
    accessor: 'zipCode',
  },
  {
    Header: 'Phone Number',
    accessor: 'phoneNumber',
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
