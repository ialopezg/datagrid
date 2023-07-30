import faker from '@faker-js/faker';
import { Meta, Story } from '@storybook/react';
import React from 'react';

import DataGrid, { DataGridProps } from '../src';
import { Column } from 'react-table';

const meta: Meta = {
  title: 'Features/Row',
};

export default meta;

const columns: Column<any>[] = [
  { accessor: 'firstName', Header: 'First Name' },
  { accessor: 'lastName', Header: 'Last Name' },
  { accessor: 'age', Header: 'Age' },
  { accessor: 'address', Header: 'Address' },
];

const data = [...Array(21)].map((_) => ({
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  age: faker.datatype.number(80),
  address: faker.address.streetAddress(),
}));

export const SelectionRow: Story<DataGridProps> = () => (
  <DataGrid columns={columns} data={data} enableSelection />
);

export const SelectAllRows: Story<DataGridProps> = () => (
  <DataGrid columns={columns} data={data} enableSelection enableSelectAll />
);

export const OnRowSelect: Story<DataGridProps> = () => (
  <DataGrid
    columns={columns}
    data={data}
    enableSelection
    onRowSelect={(e, state, selectedRows) => {
      alert(`Rows Selected: ${selectedRows.length}`);
      console.log({ e, state, selectedRows });
    }}
  />
);
