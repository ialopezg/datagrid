import faker from '@faker-js/faker';
import { Meta, Story } from '@storybook/react';
import React from 'react';

import DataGrid, { DataGridProps } from '../../src';

const meta: Meta = {
  title: 'Features/Column Grouping',
  component: DataGrid,
};
export default meta;

const columns = [
  { accessor: 'firstName' as const, Header: 'First Name' },
  { accessor: 'lastName' as const, Header: 'Last Name' },
  { accessor: 'gender' as const, Header: 'Gender' },
  { accessor: 'address' as const, Header: 'Address' },
  { accessor: 'state' as const, Header: 'State' },
];
const data = [...Array(200)].map((_) => ({
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  gender: faker.name.gender(true),
  address: faker.address.streetAddress(),
  state: faker.address.state(),
}));

export const FilteringEnabledDefault: Story<DataGridProps> = () => (
  <DataGrid
    columns={columns}
    data={data}
    enableColumnGrouping
  />
);
