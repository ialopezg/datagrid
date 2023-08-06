import faker from '@faker-js/faker';
import { Meta, Story } from '@storybook/react';
import React from 'react';

import DataGrid, { DataGridProps } from './../../src';

const meta: Meta = {
  title: 'Features/Column Actions',
  component: DataGrid,
};
export default meta;

export const ColumnActionsEnabled: Story<DataGridProps> = () => (
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
        Header: 'Phone Number',
        accessor: 'phoneNumber',
      },
    ]}
    data={[...Array(100)].map((_) => ({
      firstName: faker.name.firstName(),
      middleName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      address: faker.address.streetAddress(),
      state: faker.address.state(),
      zip: faker.address.zipCode(),
      phoneNumber: faker.phone.phoneNumber(),
    }))}
    enableColumnActions
    enableColumnHiding
    enableFiltering
    showFiltersInColumnHeader={false}
  />
);
