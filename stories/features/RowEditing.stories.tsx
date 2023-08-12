import faker from '@faker-js/faker';
import { Meta, Story } from '@storybook/react';
import React, { ChangeEvent, useState } from 'react';

import DataGrid, { DataGridProps } from '../../src';
import { MenuItem } from '@mui/material';
import { Cell } from 'react-table';

const meta: Meta = {
  title: 'Features/Row Editing',
  component: DataGrid,
  parameters: {
    status: {
      type: 'beta',
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
        },
        {
          accessor: 'lastName' as const,
          Header: 'Last Name',
          editable: true,
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
      ]}
      data={tableData}
      disableColumnActions
      onRowEditSubmit={onSubmitRowChanges}
      enableRowActions
      enableRowEditing
    />
  );
};

export const RowEditingCustomizeInput: Story<DataGridProps> = () => {
  const [tableData, setTableData] = useState(data);

  const usStates = [
    'Alabama',
    'Alaska',
    'American Samoa',
    'Arizona',
    'Arkansas',
    'California',
    'Colorado',
    'Connecticut',
    'Delaware',
    'Florida',
    'Georgia',
    'Guam',
    'Hawaii',
    'Idaho',
    'Illinois',
    'Indiana',
    'Iowa',
    'Kansas',
    'Kentucky',
    'Louisiana',
    'Maine',
    'Maryland',
    'Massachusetts',
    'Michigan',
    'Minnesota',
    'Mississippi',
    'Missouri',
    'Montana',
    'Nebraska',
    'Nevada',
    'New Hampshire',
    'New Jersey',
    'New Mexico',
    'New York',
    'North Carolina',
    'North Dakota',
    'Ohio',
    'Oklahoma',
    'Oregon',
    'Palau',
    'Pennsylvania',
    'Rhode Island',
    'South Carolina',
    'South Dakota',
    'Tennessee',
    'Texas',
    'Utah',
    'Vermont',
    'Virgin Island',
    'Virginia',
    'Washington',
    'West Virginia',
    'Wisconsin',
    'Wyoming',
  ];

  const handleSaveRow = async (row: any) => {
    tableData[+row.index] = row.values;
    setTableData([...tableData]);
  };

  return (
    <DataGrid
      columns={[
        {
          Header: 'First Name',
          accessor: 'firstName' as const,
          editable: true,
        },
        {
          Header: 'Last Name',
          accessor: 'lastName' as const,
          editable: true,
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
          editCellTextFieldProps: (cell: Cell) => ({
            children: usStates.map((state) => (
              <MenuItem key={state} value={state}>{state}</MenuItem>
            )),
            select: true,
            value: cell.value,
          }),
        },
        {
          Header: 'Phone Number',
          accessor: 'phoneNumber' as const,
          editable: true,
        },
      ]}
      data={tableData}
      disableColumnActions
      enableRowActions
      enableRowEditing
      muiTableBodyCellEditTextFieldProps={{ variant: 'outlined' }}
      onRowEditSubmit={handleSaveRow}
    />
  );
};

export const RowEditingWithValidation: Story<DataGridProps> = () => {
  const [tableData, setTableData] = useState(data);
  const [firstNameError, setFirstNameError] = useState<string | boolean>(false);
  const [lastNameError, setLastNameError] = useState<string | boolean>(false);
  const [phoneNumberError, setPhoneNumberError] = useState<string | boolean>(
    false,
  );

  const handleSaveRow = async (row: any) => {
    tableData[+row.index] = row.values;
    setTableData([...tableData]);
  };

  const validateFirstName = (value: string) => {
    if (value.length === 0) return 'First name is required';
    return false;
  };

  const validateLastName = (value: string) => {
    if (value.length === 0) return 'Last name is required';
    return false;
  };

  const validatePhoneNumber = (value: string) => {
    if (value.length === 0) return 'Phone number is required';
    if (!value.match(/^[0-9]{3}-[0-9]{3}-[0-9]{4}$/))
      return 'Invalid phone number';
    return false;
  };

  return (
    <DataGrid
      columns={[
        {
          Header: 'First Name',
          accessor: 'firstName' as const,
          editable: true,
          editCellTextFieldProps: {
            error: !!firstNameError,
            helperText: firstNameError,
          },
          onEditCellChange: (e: ChangeEvent<any>) => {
            setFirstNameError(validateFirstName(e.target.value));
          },
        },
        {
          Header: 'Last Name',
          accessor: 'lastName' as const,
          editable: true,
          editCellTextFieldProps: {
            error: !!lastNameError,
            helperText: lastNameError,
          },
          onEditCellChange: (e: ChangeEvent<any>) => {
            setLastNameError(validateLastName(e.target.value));
          },
        },
        {
          Header: 'Phone Number',
          accessor: 'phoneNumber' as const,
          editable: true,
          editCellTextFieldProps: {
            error: !!phoneNumberError,
            helperText: phoneNumberError,
          },
          onEditCellChange: (e: ChangeEvent<any>) => {
            setPhoneNumberError(validatePhoneNumber(e.target.value));
          },
        },
      ]}
      data={tableData}
      onSaveRow={handleSaveRow}
      disableColumnActions
      enableRowActions
      enableRowEditing
      onRowEditSubmit={handleSaveRow}
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
        },
        {
          Header: 'Last Name',
          accessor: 'lastName' as const,
          editable: true,
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
      ]}
      data={tableData}
      disableColumnActions
      enableRowActions
      enableRowEditing
      isFetching={isSaving}
      onRowEditSubmit={onSubmitRowChanges}
    />
  );
};
