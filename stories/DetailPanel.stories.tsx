import faker from '@faker-js/faker';
import { Meta, Story } from '@storybook/react';
import React from 'react';

import DataGrid, { DataGridProps } from '../src';
import { Column } from 'react-table';

const meta: Meta = {
  title: 'Features/DetailPanel',
};

export default meta;

const columns: Column<any>[] = [
  { accessor: 'firstName' as const, Header: 'First Name' },
  { accessor: 'lastName' as const, Header: 'Last Name' },
  { accessor: 'city' as const, Header: 'City' },
  { accessor: 'state' as const, Header: 'State' },
];

const data = [...Array(100)].map((_) => ({
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  address: faker.address.streetAddress(),
  city: faker.address.city(),
  state: faker.address.state(),
  zipCode: faker.address.zipCode(),
  phoneNumber: faker.phone.phoneNumber(),
}));

export const DetailPanelEnabled: Story<DataGridProps> = () => (
  <DataGrid
    columns={columns}
    data={data}
    detailPanel={(row: any) => {
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
