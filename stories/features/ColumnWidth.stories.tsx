import faker from '@faker-js/faker';
import { Meta, Story } from '@storybook/react';
import React from 'react';

import DataGrid, { DataGridProps } from './../../src';

const meta: Meta = {
  title: 'Features/Column widths',
  component: DataGrid,
  parameters: {
    status: {
      type: 'beta',
    },
  },
};
export default meta;

const columns = [
  {
    Header: 'ID',
    accessor: 'id' as const,
    maxWidth: 20,
  },
  {
    Header: 'First Name',
    accessor: 'firstName' as const,
    minWidth: 300,
  },
  {
    Header: 'Last Name',
    accessor: 'lastName' as const,
    width: 100,
  },
  {
    Header: 'Age',
    accessor: 'age' as const,
    maxWidth: 20,
  },
  {
    Header: 'Address',
    accessor: 'address' as const,
  },
] as any[];
const data = [...Array(21)].map((_) => ({
  id: faker.datatype.number(100),
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  age: faker.datatype.number(80),
  address: faker.address.streetAddress(),
}));

export const CustomWidths: Story<DataGridProps> = () => (
  <DataGrid columns={columns} data={data} />
);
