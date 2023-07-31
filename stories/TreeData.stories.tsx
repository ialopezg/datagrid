import faker from '@faker-js/faker';
import { Meta, Story } from '@storybook/react';
import React from 'react';

import DataGrid, { DataGridProps } from '../src';

const meta: Meta = {
  title: 'Features/TreeData',
  component: DataGrid,
};

export default meta;

const columns = [
  { accessor: 'firstName' as const, Header: 'First Name' },
  { accessor: 'lastName' as const, Header: 'Last Name' },
  { accessor: 'address' as const, Header: 'Address' },
  { accessor: 'state' as const, Header: 'State' },
  { accessor: 'phone' as const, Header: 'Phone' },
];
const data = [...Array(100)].map((_) => ({
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  address: faker.address.streetAddress(),
  state: faker.address.state(),
  phone: faker.phone.phoneNumber(),
  subRows: [...Array(faker.datatype.number(4))].map((_) => ({
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    address: faker.address.streetAddress(),
    state: faker.address.state(),
    phone: faker.phone.phoneNumber(),
    subRows: [...Array(2)].map((_) => ({
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      address: faker.address.streetAddress(),
      state: faker.address.state(),
      phone: faker.phone.phoneNumber(),
    })),
  })),
}));

export const RowTree: Story<DataGridProps> = () => (
  <DataGrid columns={columns} data={data} enableRowTree />
);
