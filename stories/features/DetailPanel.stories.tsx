import faker from '@faker-js/faker';
import { Meta, Story } from '@storybook/react';
import React from 'react';

import DataGrid, { DataGridProps } from '../../src';

const meta: Meta = {
  title: 'Features/DetailPanel',
  component: DataGrid,
  parameters: {
    status: {
      type: 'beta',
    },
  },
};

export default meta;

export const DetailPanelEnabled: Story<DataGridProps> = () => (
  <DataGrid
    // @ts-ignore
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
      return (
        <div style={{ display: 'grid' }}>
          <span>{row.original?.address}</span>
          <span>{row.original?.city}</span>
          <span>{row.original?.state}</span>
          <span>{row.original?.zipCode}</span>
        </div>
      );
    }}
    enableColumnGrouping
  />
);

export const DetailPanelExpandAllDisabled: Story<DataGridProps> = () => (
  <DataGrid
    // @ts-ignore
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
    ]}
    data={[...Array(5)].map((_) => ({
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      address: faker.address.streetAddress(),
      city: faker.address.city(),
      state: faker.address.state(),
      zipCode: faker.address.zipCode(),
      phone: faker.phone.phoneNumber(),
    }))}
    disableExpandAll
    detailPanel={(row) => (
      <div style={{ display: 'grid' }}>
        <span>City: {row.original.city}</span>
        <span>State: {row.original.state}</span>
        <span>Zip: {row.original.zipCode}</span>
        <span>Phone: {row.original.phone}</span>
      </div>
    )}
  />
);
