import faker from '@faker-js/faker';
import { Meta, Story } from '@storybook/react';
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
    editable: true,
  },
  {
    Header: 'Last Name',
    accessor: 'lastName' as const,
  },
  {
    Header: 'Address',
    accessor: 'address' as const,
    editable: true,
  },
  {
    Header: 'State',
    accessor: 'state' as const,
    editable: true,
  },
  {
    Header: 'Phone Number',
    accessor: 'phoneNumber' as const,
    editable: true,
  },
];

const data = [...Array(10)].map((_) => ({
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  address: faker.address.streetAddress(),
  state: faker.address.state(),
  phoneNumber: faker.phone.phoneNumber(),
}));

export const RowEditingEnabled: Story<DataGridProps> = () => {
  const [tableData, setTableData] = useState(data);

  const onSubmitRowChanges = async (row: any) => {
    tableData[+row.index] = row.values;
    setTableData([...tableData]);
  };

  return (
    <DataGrid
      columns={columns}
      data={tableData}
      onRowEditSubmit={onSubmitRowChanges}
      enableRowActions
      enableRowEditing
    />
  );
};

export const RowEditingEnabledAsync: Story<DataGridProps> = () => {
  const [tableData, setTableData] = useState(data);
  const [isSaving, setIsSaving] = useState(false);

  const onSubmitRowChanges = async (row: any) => {
    setIsSaving(true);
    console.log(row);
    setTimeout(() => {
      tableData[+row.index] = row.values;
      setTableData([...tableData]);
      setIsSaving(false);
    }, 1500);
  };

  return (
    <DataGrid
      columns={columns}
      data={tableData}
      enableRowActions
      enableRowEditing
      isFetching={isSaving}
      onRowEditSubmit={onSubmitRowChanges}
    />
  );
};
