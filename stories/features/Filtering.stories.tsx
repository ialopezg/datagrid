import faker from '@faker-js/faker';
import { MenuItem, TextField } from '@mui/material';
import { Meta, Story } from '@storybook/react';
import { Row } from 'react-table';
import React, { ChangeEvent } from 'react';

import DataGrid, { DataGridProps } from '../../src';

const meta: Meta = {
  title: 'Features/Filtering',
  component: DataGrid,
  parameters: {
    status: {
      type: 'beta',
    },
  },
};
export default meta;

const columns = [
  { accessor: 'firstName' as const, Header: 'First Name' },
  { accessor: 'lastName' as const, Header: 'Last Name' },
  { accessor: 'age' as const, Header: 'Age' },
  { accessor: 'gender' as const, Header: 'Gender' },
  { accessor: 'address' as const, Header: 'Address' },
  { accessor: 'state' as const, Header: 'State' },
] as any[];
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
  <DataGrid
    columns={columns}
    data={data}
    initialState={{ showFilters: true }}
  />
);

export const FilteringDisabled: Story<DataGridProps> = () => (
  <DataGrid columns={columns} data={data} disableFilters />
);

export const FilterTypes: Story<DataGridProps> = () => (
  <DataGrid
    columns={
      [
        {
          Header: 'First Name',
          accessor: 'firstName' as const,
        },
        {
          Header: 'Last Name',
          accessor: 'lastName' as const,
        },
        {
          Header: 'Age',
          accessor: 'age' as const,
          filter: 'startsWith',
        },
        {
          Header: 'Gender',
          accessor: 'gender' as const,
          filterSelectOptions: ['Male', 'Female', 'Other'],
        },
        {
          Header: 'Address',
          accessor: 'address' as const,
        },
        {
          Header: 'State',
          accessor: 'state' as const,
          filterSelectOptions: [
            { text: 'CA', value: 'California' },
            { text: 'TX', value: 'Texas' },
            { text: 'NY', value: 'New York' },
            { text: 'FL', value: 'Florida' },
          ],
        },
      ] as any[]
    }
    data={data}
    initialState={{ showFilters: true }}
  />
);

export const DisabledSomeFilterTypesForCertainColumns: Story<
  DataGridProps
> = () => (
  <DataGrid
    columns={
      [
        {
          Header: 'First Name',
          accessor: 'firstName' as const,
        },
        {
          Header: 'Last Name',
          accessor: 'lastName' as const,
          filterTypes: ['startsWith', 'endsWith'],
          filter: 'startsWith',
        },
        {
          Header: 'Age',
          accessor: 'age' as const,
        },
        {
          Header: 'Gender',
          accessor: 'gender' as const,
          filterTypes: ['equals', 'notEquals'],
          filter: 'equals',
        },
        {
          Header: 'Address',
          accessor: 'address' as const,
        },
        {
          Header: 'State',
          accessor: 'state' as const,
        },
      ] as any[]
    }
    data={data}
    initialState={{ showFilters: true }}
  />
);

export const FilteringDisabledForCertainColumns: Story<DataGridProps> = () => (
  <DataGrid
    columns={
      [
        { accessor: 'firstName' as const, Header: 'First Name' },
        { accessor: 'lastName' as const, Header: 'Last Name' },
        { accessor: 'age' as const, Header: 'Age', disableFilters: true },
        { accessor: 'gender' as const, Header: 'Gender' },
        {
          accessor: 'address' as const,
          Header: 'Address',
          disableFilters: true,
        },
      ] as any[]
    }
    data={data}
    initialState={{ showFilters: true }}
  />
);

export const CustomFilterFunction: Story<DataGridProps> = () => (
  <DataGrid
    columns={
      [
        { accessor: 'firstName' as const, Header: 'First Name' },
        { accessor: 'lastName' as const, Header: 'Last Name' },
        { accessor: 'age' as const, Header: 'Age' },
        {
          accessor: 'gender' as const,
          filter: (rows: Row<any>[], _: any, filterValue: string) =>
            rows.filter((row) =>
              row.values['gender']
                .toLowerCase()
                .startsWith(filterValue.toLowerCase()),
            ),
          Filter: ({ column }: any) => (
            <TextField
              fullWidth
              margin="dense"
              onChange={(e: ChangeEvent<any>) =>
                column.setFilter(e.target.value || undefined)
              }
              placeholder="Filter"
              select
              value={column.filterValue ?? ''}
              variant="standard"
            >
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </TextField>
          ),
          Header: 'Gender',
        },
        { accessor: 'address' as const, Header: 'Address' },
        { accessor: 'state' as const, Header: 'State' },
      ] as any[]
    }
    data={data}
    initialState={{ showFilters: true }}
  />
);

export const CustomFilterComponent: Story<DataGridProps> = () => (
  <DataGrid
    columns={
      [
        {
          Header: 'First Name',
          accessor: 'firstName' as const,
        },
        {
          Header: 'Last Name',
          accessor: 'lastName' as const,
        },
        {
          Header: 'Age',
          accessor: 'age' as const,
        },
        {
          Header: 'Gender',
          accessor: 'gender' as const,
          Filter: ({ column }: any) => (
            <TextField
              onChange={(e: ChangeEvent<any>) =>
                column.setFilter(e.target.value || undefined)
              }
              select
              value={column.filterValue ?? ''}
              margin="dense"
              placeholder="Filter"
              variant="standard"
              fullWidth
            >
              <MenuItem value="All">All</MenuItem>
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </TextField>
          ),
          filter: (rows: any[], _: any, filterValue: any) =>
            rows.filter(
              (row) =>
                row.values['gender'].toLowerCase() ===
                filterValue.toLowerCase(),
            ),
        },
        {
          Header: 'Address',
          accessor: 'address' as const,
        },
        {
          Header: 'State',
          accessor: 'state' as const,
        },
      ] as any[]
    }
    data={data}
    initialState={{ showFilters: true }}
  />
);
