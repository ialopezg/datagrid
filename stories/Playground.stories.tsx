import faker from '@faker-js/faker';
import { Meta, Story } from '@storybook/react';
import React from 'react';

import DataGrid, { DataGridProps } from '../src';
import { Button, MenuItem } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import ShareIcon from '@mui/icons-material/Share';

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
    data={[...Array(6)].map((_) => ({
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
          {
            Header: 'City',
            Footer: 'City',
            accessor: 'city',
          },
          {
            Header: 'State',
            Footer: 'State',
            accessor: 'state',
          },
        ],
      },
    ]}
    data={[...Array(250)].map((_) => ({
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      address: faker.address.streetAddress(),
      age: faker.datatype.number(40) + 10,
      city: faker.address.city(),
      state: faker.address.state(),
      subRows: [...Array(faker.datatype.number(2))].map((_) => ({
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        age: faker.datatype.number(40) + 10,
        address: faker.address.streetAddress(),
        city: faker.address.city(),
        state: faker.address.state(),
      })),
    }))}
    enableColumnGrouping
    enableColumnResizing
    enableSelection
    enableRowActions
    enableRowEditing
    paginationPosition="both"
    showRowNumbers
    rowActionMenuItems={(row, _, closeMenu) => [
      <MenuItem
        key={1}
        onClick={() => {
          console.log('View Profile', row);
          closeMenu();
        }}
      >
        <AccountCircleIcon /> View Profile
      </MenuItem>,
      <MenuItem
        key={2}
        onClick={() => {
          console.log('Remove', row);
          closeMenu();
        }}
      >
        <DeleteIcon /> Remove
      </MenuItem>,
      <MenuItem
        key={3}
        onClick={() => {
          console.log('Share', row);
          closeMenu();
        }}
      >
        <ShareIcon /> Share
      </MenuItem>,
    ]}
    customToolbarActions={(table) => {
      const handleDeactivate = () => {
        table.selectedFlatRows.map((row) => {
          console.log('deactivating ' + row.original);
        });
      };

      const handleActivate = () => {
        table.selectedFlatRows.map((row) => {
          console.log('activating ' + row.original);
        });
      };

      const handleContact = () => {
        table.selectedFlatRows.map((row) => {
          console.log('contact ' + row.original);
        });
      };

      return (
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <Button
            color="error"
            disabled={table.selectedFlatRows.length === 0}
            onClick={handleDeactivate}
            variant="contained"
          >
            Deactivate
          </Button>
          <Button
            color="success"
            disabled={table.selectedFlatRows.length === 0}
            onClick={handleActivate}
            variant="contained"
          >
            Activate
          </Button>
          <Button
            color="info"
            disabled={table.selectedFlatRows.length === 0}
            onClick={handleContact}
            variant="contained"
          >
            Contact
          </Button>
        </div>
      );
    }}
    toolbarAlertBannerPosition="bottom"
  />
);
