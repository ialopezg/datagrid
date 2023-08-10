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
            children: [
              <MenuItem value="Alabama">Alabama</MenuItem>,
              <MenuItem value="Alaska">Alaska</MenuItem>,
              <MenuItem value="Arizona">Arizona</MenuItem>,
              <MenuItem value="Arkansas">Arkansas</MenuItem>,
              <MenuItem value="California">California</MenuItem>,
              <MenuItem value="Colorado">Colorado</MenuItem>,
              <MenuItem value="Connecticut">Connecticut</MenuItem>,
              <MenuItem value="Delaware">Delaware</MenuItem>,
              <MenuItem value="Florida">Florida</MenuItem>,
              <MenuItem value="Georgia">Georgia</MenuItem>,
              <MenuItem value="Hawaii">Hawaii</MenuItem>,
              <MenuItem value="Idaho">Idaho</MenuItem>,
              <MenuItem value="Illinois">Illinois</MenuItem>,
              <MenuItem value="Indiana">Indiana</MenuItem>,
              <MenuItem value="Iowa">Iowa</MenuItem>,
              <MenuItem value="Kansas">Kansas</MenuItem>,
              <MenuItem value="Kentucky">Kentucky</MenuItem>,
              <MenuItem value="Louisiana">Louisiana</MenuItem>,
              <MenuItem value="Maine">Maine</MenuItem>,
              <MenuItem value="Maryland">Maryland</MenuItem>,
              <MenuItem value="Massachusetts">Massachusetts</MenuItem>,
              <MenuItem value="Michigan">Michigan</MenuItem>,
              <MenuItem value="Minnesota">Minnesota</MenuItem>,
              <MenuItem value="Mississippi">Mississippi</MenuItem>,
              <MenuItem value="Missouri">Missouri</MenuItem>,
              <MenuItem value="Montana">Montana</MenuItem>,
              <MenuItem value="Nebraska">Nebraska</MenuItem>,
              <MenuItem value="Nevada">Nevada</MenuItem>,
              <MenuItem value="New Hampshire">New Hampshire</MenuItem>,
              <MenuItem value="New Jersey">New Jersey</MenuItem>,
              <MenuItem value="New Mexico">New Mexico</MenuItem>,
              <MenuItem value="New York">New York</MenuItem>,
              <MenuItem value="North Carolina">North Carolina</MenuItem>,
              <MenuItem value="North Dakota">North Dakota</MenuItem>,
              <MenuItem value="Ohio">Ohio</MenuItem>,
              <MenuItem value="Oklahoma">Oklahoma</MenuItem>,
              <MenuItem value="Oregon">Oregon</MenuItem>,
              <MenuItem value="Pennsylvania">Pennsylvania</MenuItem>,
              <MenuItem value="Rhode Island">Rhode Island</MenuItem>,
              <MenuItem value="South Carolina">South Carolina</MenuItem>,
              <MenuItem value="South Dakota">South Dakota</MenuItem>,
              <MenuItem value="Tennessee">Tennessee</MenuItem>,
              <MenuItem value="Texas">Texas</MenuItem>,
              <MenuItem value="Utah">Utah</MenuItem>,
              <MenuItem value="Vermont">Vermont</MenuItem>,
              <MenuItem value="Virginia">Virginia</MenuItem>,
              <MenuItem value="Washington">Washington</MenuItem>,
              <MenuItem value="West Virginia">West Virginia</MenuItem>,
              <MenuItem value="Wisconsin">Wisconsin</MenuItem>,
              <MenuItem value="Wyoming">Wyoming</MenuItem>,
            ],
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
