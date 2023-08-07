import faker from '@faker-js/faker';
import { Meta, Story } from '@storybook/react';
import React from 'react';

import DataGrid, { DataGridProps } from '../../src';
import { Row } from 'react-table';

const meta: Meta = {
  title: 'Features/Filtering',
  component: DataGrid,
};
export default meta;

const columns = [
  { accessor: 'firstName' as const, Header: 'First Name' },
  { accessor: 'lastName' as const, Header: 'Last Name' },
  { accessor: 'age' as const, Header: 'Age' },
  { accessor: 'gender' as const, Header: 'Gender' },
  { accessor: 'address' as const, Header: 'Address' },
  { accessor: 'state' as const, Header: 'State' },
];
const data = [...Array(100)].map((_) => ({
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  age: faker.datatype.number(100),
  gender: faker.name.gender(true),
  address: faker.address.streetAddress(),
  state: faker.address.state(),
}));

export const FilteringEnabledDefault: Story<DataGridProps> = () => (
  <DataGrid columns={columns} data={data} />
);

export const FilteringEnabledAndShown: Story<DataGridProps> = () => (
  <DataGrid columns={columns} data={data} defaultShowFilters />
);

export const FilteringDisabled: Story<DataGridProps> = () => (
  <DataGrid columns={columns} data={data} disableFilters />
);

export const FilteringDisabledForCertainColumns: Story<DataGridProps> = () => (
  <DataGrid
    columns={
      [
        { accessor: 'firstName' as const, Header: 'First Name' },
        { accessor: 'lastName' as const, Header: 'Last Name' },
        { accessor: 'age' as const, Header: 'Age', disableFilters: true },
        { accessor: 'gender' as const, Header: 'Gender' },
        { accessor: 'address' as const, Header: 'Address' },
      ] as any[]
    }
    data={data}
    defaultShowFilters
  />
);

export const CustomFilterFunction: Story<DataGridProps> = () => (
  <DataGrid
    columns={
      [
        { accessor: 'firstName' as const, Header: 'First Name' },
        { accessor: 'lastName' as const, Header: 'Last Name' },
        { accessor: 'age' as const, Header: 'Age' },
        { accessor: 'gender' as const, Header: 'Gender' },
        { accessor: 'address' as const, Header: 'Address' },
        {
          accessor: 'state' as const,
          Header: 'State',
          filter: (rows: Row<any>[], _: any, filterValue: string) =>
            rows.filter((row) =>
              row.values['state']
                .toLowerCase()
                .startsWith(filterValue.toLowerCase()),
            ),
        },
      ] as any[]
    }
    data={data}
    defaultShowFilters
  />
);
