import faker from '@faker-js/faker';
import { Meta, Story } from '@storybook/react';
import { Row } from 'react-table';
import React, { useState } from 'react';

import DataGrid, { DataGridProps } from '../../src';

const meta: Meta = {
  title: 'Features/Row Editing',
  component: DataGrid,
  parameters: {
    status: {
      type: 'alpha',
    },
  },
};
export default meta;

const columns = [
  {
    Header: 'First Name',
    accessor: 'firstName' as const,
  },
  {
    Header: 'Last Name',
    accessor: 'lastName' as const,
  },
  {
    Header: 'Address',
    accessor: 'address' as const,
  },
  {
    Header: 'State',
    accessor: 'state' as const,
  },
  {
    Header: 'Phone Number',
    accessor: 'phoneNumber' as const,
  },
];

const data = [...Array(10)].map((_) => ({
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  address: faker.address.streetAddress(),
  state: faker.address.state(),
  phoneNumber: faker.phone.phoneNumber(),
}));

export const RowEditingEnabled: Story<DataGridProps> = () => (
  <DataGrid columns={columns} data={data} enableRowActions enableRowEditing />
);

export const RowEditingEnabledAsync: Story<DataGridProps> = () => {
  const [isSaving, setIsSaving] = useState(false);

  const onSubmit = async (row: Row<any>) => {
    setIsSaving(true);
    console.log(row);
    setTimeout(() => setIsSaving(false), 1500);
  };

  return (
    <DataGrid
      columns={columns}
      data={data}
      enableRowActions
      enableRowEditing
      isFetching={isSaving}
      onRowEditSubmit={onSubmit}
    />
  );
};
