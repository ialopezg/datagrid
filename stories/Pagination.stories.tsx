import fake from '@faker-js/faker';
import { Meta } from '@storybook/react';
import React from 'react';

import DataGrid from '../src';
import { Column } from 'react-table';

const meta: Meta = {
  title: 'Examples/Pagination',
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
  <DataGrid columns={columns} data={data} />
);

export const Disabled = () => (
  <DataGrid columns={columns} data={data} enablePagination={false} />
);

export const PositionOnBottom = () => (
  <DataGrid columns={columns} data={data} />
);

export const PositionOnTop = () => (
  <DataGrid columns={columns} data={data} paginationPosition="top" />
);

export const PositionOnBottomAndTop = () => (
  <DataGrid columns={columns} data={data} paginationPosition="both" />
);
