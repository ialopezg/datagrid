import faker from '@faker-js/faker';
import AddBoxIcon from '@mui/icons-material/AddBox';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button, IconButton, Tooltip, Typography } from '@mui/material';
import { Meta, Story } from '@storybook/react';
import React from 'react';

import DataGrid, { DataGridProps } from '../../src';

const meta: Meta = {
  title: 'Features/Toolbar',
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
  { accessor: 'address' as const, Header: 'Address' },
  { accessor: 'phoneNumber' as const, Header: 'Phone Number' },
];

const data = [...Array(100)].map((_) => ({
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  address: faker.address.streetAddress(),
  state: faker.address.state(),
  phoneNumber: faker.phone.phoneNumber(),
}));

export const ToolbarEnabledDefault: Story<DataGridProps> = () => (
  <DataGrid columns={columns} data={data} />
);

export const TopToolbarHidden: Story<DataGridProps> = () => (
  <DataGrid columns={columns} data={data} hideToolbarTop />
);

export const BottomToolbarHidden: Story<DataGridProps> = () => (
  <DataGrid columns={columns} data={data} hideToolbarBottom />
);

export const NoToolbars: Story<DataGridProps> = () => (
  <DataGrid columns={columns} data={data} hideToolbarTop hideToolbarBottom />
);

export const HideToolbarActions: Story<DataGridProps> = () => (
  <DataGrid columns={columns} data={data} hideToolbarActions />
);

export const ToolbarActionsOnBottom: Story<DataGridProps> = () => (
  <DataGrid columns={columns} data={data} paginationPosition="bottom" />
);

export const CustomizingDefaultToolbarActions: Story<DataGridProps> = () => (
  <DataGrid
    columns={columns}
    data={data}
    defaultToolbarActions={(_, { ToggleFullScreenAction }) => {
      return (
        <>
          <ToggleFullScreenAction />
        </>
      );
    }}
  />
);

export const TableTitle: Story<DataGridProps> = () => (
  <DataGrid
    columns={columns}
    data={data}
    customToolbarActions={(_) => {
      return <Typography variant="h4">Table Title</Typography>;
    }}
  />
);

export const CustomToolbarActions: Story<DataGridProps> = () => (
  <DataGrid
    columns={columns}
    data={data}
    positionToolbarActions="bottom"
    customToolbarActions={(_) => {
      const handleCreateNewUser = () => {
        // @ts-ignore
        prompt('Create new user modal');
      };

      return (
        <div>
          <Tooltip arrow title="Create New User">
            <IconButton onClick={handleCreateNewUser}>
              <AddBoxIcon />
            </IconButton>
          </Tooltip>
        </div>
      );
    }}
  />
);

export const CustomToolbarSelectionActions: Story<DataGridProps> = () => (
  <DataGrid
    columns={columns}
    data={data}
    title="My People Table"
    muiTableTitleProps={{ variant: 'h4' }}
    enableSelection
    customToolbarActions={(table) => {
      const handleDeactivate = () => {
        table.selectedFlatRows.map((row) => {
          // @ts-ignore
          alert('deactivating ' + row.original.firstName);
        });
      };

      const handleActivate = () => {
        table.selectedFlatRows.map((row) => {
          // @ts-ignore
          alert('activating ' + row.original.firstName);
        });
      };

      const handleContact = () => {
        table.selectedFlatRows.map((row) => {
          // @ts-ignore
          alert('contact ' + row.original.firstName);
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
  />
);

export const ToolbarAlertBannerBottom: Story<DataGridProps> = () => (
  <DataGrid
    columns={columns}
    data={data}
    enableSelection
    positionToolbarAlertBanner="bottom"
    customToolbarActions={(table) => {
      const handleCreateNewUser = () => {
        // @ts-ignore
        prompt('Create new user modal');
      };
      const handleRemoveUsers = () => {
        // @ts-ignore
        confirm('Are you sure you want to remove the selected users?');
      };

      return (
        <div>
          <Tooltip arrow title="Create New User">
            <IconButton onClick={handleCreateNewUser}>
              <AddBoxIcon />
            </IconButton>
          </Tooltip>
          <Tooltip arrow title="Remove Users">
            <span>
              <IconButton
                disabled={table.selectedFlatRows.length === 0}
                onClick={handleRemoveUsers}
              >
                <DeleteIcon />
              </IconButton>
            </span>
          </Tooltip>
        </div>
      );
    }}
  />
);
