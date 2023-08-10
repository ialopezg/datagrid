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
      columns={[
        {
          accessor: 'firstName' as const,
          Header: 'First Name',
          editable: true,
          validator: (value: string) => {
            return !value.length ? 'First name is required' : true;
          },
        },
        {
          accessor: 'lastName' as const,
          Header: 'Last Name',
          editable: true,
          validator: (value: string) => {
            return !value.length ? 'Last name is required' : true;
          },
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
          validator: (value: string) => {
            if (!value.length) {
              return 'State is required';
            }

            const validStates = ['Nebraska', 'Virginia', 'Indiana'];
            if (!validStates.includes(value)) {
              return 'That is not a cool state';
            }

            return true;
          },
        },
        {
          Header: 'Phone Number',
          accessor: 'phoneNumber' as const,
          editable: true,
          validator: (value: string) => {
            if (!value.length) {
              return 'Phone number is required';
            }

            if (!value.match(/^[0-9]{3}-[0-9]{3}-[0-9]{4}$/)) {
              return 'Invalid phone number';
            }

            return true;
          },
        },
      ]}
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
      columns={[
        {
          Header: 'First Name',
          accessor: 'firstName' as const,
          editable: true,
          validator: (value: string) => {
            return !value.length ? 'First name is required' : true;
          },
        },
        {
          Header: 'Last Name',
          accessor: 'lastName' as const,
          editable: true,
          validator: (value: string) => {
            return !value.length ? 'Last name is required' : true;
          },
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
          validator: (value: string) => {
            if (!value.length) {
              return 'State is required';
            }

            const validStates = ['Nebraska', 'Virginia', 'Indiana'];
            if (!validStates.includes(value)) {
              return 'That is not a cool state';
            }

            return true;
          },
        },
        {
          Header: 'Phone Number',
          accessor: 'phoneNumber' as const,
          editable: true,
          validator: (value: string) => {
            if (!value.length) {
              return 'Phone number is required';
            }

            if (!value.match(/^[0-9]{3}-[0-9]{3}-[0-9]{4}$/)) {
              return 'Invalid phone number';
            }

            return true;
          },
        },
      ]}
      data={tableData}
      enableRowActions
      enableRowEditing
      isFetching={isSaving}
      onRowEditSubmit={onSubmitRowChanges}
    />
  );
};
