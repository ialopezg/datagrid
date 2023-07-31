import faker from '@faker-js/faker';
import { Meta, Story } from '@storybook/react';
import React from 'react';

import DataGrid, { DataGridProps } from '../src';

const meta: Meta = {
  title: 'Features/DetailPanel',
};

export default meta;

export const DetailPanelEnabled: Story<DataGridProps> = () => (
  <DataGrid
    columns={[
      { accessor: 'firstName' as const, Header: 'First Name' },
      { accessor: 'lastName' as const, Header: 'Last Name' },
      { accessor: 'address' as const, Header: 'Address' },
    ]}
    data={[...Array(5)].map((_) => ({
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      address: faker.address.streetAddress(),
      city: faker.address.city(),
      state: faker.address.state(),
      zipCode: faker.address.zipCode(),
      phoneNumber: faker.phone.phoneNumber(),
    }))}
    detailPanel={(row) => {
      console.log(row);
      return (
        <div style={{ display: 'grid' }}>
          <span>{row.original?.address}</span>
          <span>{row.original?.city}</span>
          <span>{row.original?.state}</span>
          <span>{row.original?.zipCode}</span>
        </div>
      );
    }}
    enableSearch
    showToolbar
  />
);
