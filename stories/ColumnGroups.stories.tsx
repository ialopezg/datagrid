import faker from '@faker-js/faker';
import { Meta, Story } from '@storybook/react';
import React from 'react';

import DataGrid, { DataGridProps } from '../src';

const meta: Meta = {
  title: 'Features/Column Groups',
};

export default meta;

const data = [...Array(5)].map((_) => ({
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  age: faker.datatype.number(80),
  address: faker.address.streetAddress(),
}));

export const Header: Story<DataGridProps> = () => (
  <DataGrid
    columns={[
      {
        Header: 'Name',
        columns: [
          { accessor: 'firstName', Header: 'First Name' },
          { accessor: 'lastName', Header: 'Last Name' },
        ],
      },
      {
        Header: 'Info',
        columns: [
          { accessor: 'age', Header: 'Age' },
          { accessor: 'address', Header: 'Address' },
        ],
      },
    ]}
    data={data}
  />
);

export const HeaderAndFooter: Story<DataGridProps> = () => (
  <DataGrid
    columns={[
      {
        Footer: 'Name',
        Header: 'Name',
        columns: [
          { accessor: 'firstName', Header: 'First Name' },
          { accessor: 'lastName', Header: 'Last Name' },
        ],
      },
      {
        Footer: 'Info',
        Header: 'Info',
        columns: [
          { accessor: 'age', Header: 'Age' },
          { accessor: 'address', Header: 'Address' },
        ],
      },
    ]}
    data={data}
  />
);
