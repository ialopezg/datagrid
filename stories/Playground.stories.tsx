import faker from '@faker-js/faker';
import { Meta, Story } from '@storybook/react';
import React from 'react';

import DataGrid, { DataGridProps } from '../src';

const meta: Meta = {
  title: 'Playground',
  component: DataGrid,
};

export default meta;

export const Default: Story<DataGridProps> = () => (
  <DataGrid
    columns={[
      {
        accessor: 'firstName' as const,
        Header: 'First Name',
      },
      {
        accessor: 'lastName' as const,
        Header: 'Last Name',
      },
      { accessor: 'city' as const, Header: 'City' },
      { accessor: 'state' as const, Header: 'State' },
    ]}
    data={[...Array(6)].map((_) => ({
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      address: faker.address.streetAddress(),
      city: faker.address.city(),
      state: faker.address.state(),
      zipCode: faker.address.zipCode(),
      phoneNumber: faker.phone.phoneNumber(),
    }))}
  />
);

export const MinimumFeatures: Story<DataGridProps> = () => (
  <DataGrid
    columns={[
      {
        accessor: 'firstName' as const,
        Header: 'First Name',
      },
      {
        accessor: 'lastName' as const,
        Header: 'Last Name',
      },
      { accessor: 'city' as const, Header: 'City' },
      { accessor: 'state' as const, Header: 'State' },
    ]}
    data={[...Array(3)].map((_) => ({
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      address: faker.address.streetAddress(),
      city: faker.address.city(),
      state: faker.address.state(),
      zipCode: faker.address.zipCode(),
      phoneNumber: faker.phone.phoneNumber(),
    }))}
    disableColumnActions
    disableSortBy
    enableRowActions
    enableRowEditing
    hideToolbarTop
    hideToolbarBottom
    manualPagination
  />
);

export const MaximumFeatures: Story<DataGridProps> = () => (
  <DataGrid
    columns={[
      {
        Footer: 'Name',
        Header: 'Name',
        columns: [
          {
            accessor: 'firstName' as const,
            Footer: 'First Name',
            Header: 'First Name',
          },
          {
            accessor: 'lastName' as const,
            Footer: 'Last Name',
            Header: 'Last Name',
          },
        ],
      },
      {
        Footer: 'Info',
        Header: 'Info',
        columns: [
          { accessor: 'age' as const, Footer: 'Age', Header: 'Age' },
          {
            accessor: 'address' as const,
            Footer: 'Address',
            Header: 'Address',
          },
        ],
      },
    ]}
    data={[...Array(21)].map((_) => ({
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      address: faker.address.streetAddress(),
      age: faker.datatype.number(80),
      phoneNumber: faker.phone.phoneNumber(),
      subRows: [...Array(faker.datatype.number(2))].map((_) => ({
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        age: faker.datatype.number(80),
        address: faker.address.streetAddress(),
      })),
    }))}
    enableColumnGrouping
    enableColumnResizing
    enableSelection
    enableRowActions
    enableRowEditing
    paginationPosition="both"
  />
);
