import faker from '@faker-js/faker';
import { Meta, Story } from '@storybook/react';
import React from 'react';

import DataGrid, { DataGridProps } from '../../src';

const meta: Meta = {
  title: 'Features/Selection',
  component: DataGrid,
  parameters: {
    status: {
      type: 'stable',
    },
  },
};
export default meta;

const columns = [
  { accessor: 'firstName' as const, Header: 'First Name' },
  { accessor: 'lastName' as const, Header: 'Last Name' },
  { accessor: 'age' as const, Header: 'Age' },
  { accessor: 'address' as const, Header: 'Address' },
];

const data = [...Array(21)].map((_) => ({
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  age: faker.datatype.number(80),
  address: faker.address.streetAddress(),
}));

export const SelectionEnableDefault: Story<DataGridProps> = () => (
  <DataGrid columns={columns} data={data} enableRowSelection />
);

export const SelectAllDisabled: Story<DataGridProps> = () => (
  <DataGrid columns={columns} data={data} disableSelectAll enableRowSelection />
);

export const OnRowSelectChange: Story<DataGridProps> = () => (
  <DataGrid
    columns={columns}
    data={data}
    enableRowSelection
    onRowSelectChange={(e, row, selectedRows) => {
      console.log({ e, state: row, selectedRows });
    }}
  />
);
