import fake from '@faker-js/faker';
import { Meta } from '@storybook/react';
import React from 'react';

import DataGrid from '../src';
import { Column } from 'react-table';

const meta: Meta = {
  title: 'Examples/Row Selection',
};

export default meta;

const columns: Column<any>[] = [
  { accessor: 'firstName', Header: 'First Name' },
  { accessor: 'lastName', Header: 'Last Name' },
  { accessor: 'age', Header: 'Age' },
  { accessor: 'address', Header: 'Address' },
];

const data = [...Array(21)].map((_) => ({
  firstName: fake.name.firstName(),
  lastName: fake.name.lastName(),
  age: fake.datatype.number(80),
  address: fake.address.streetAddress(),
}));

export const Enabled = () => (
  <DataGrid columns={columns} data={data} enableSelection />
);

export const EnableSelectAll = () => (
  <DataGrid columns={columns} data={data} enableSelection enableSelectAll />
);

export const OnRowSelectionChange = () => (
  <DataGrid
    columns={columns}
    data={data}
    enableSelection
    onRowSelect={(e, state) => {
      alert('Row Selected');
      console.log({ e, state });
    }}
  />
);
