import React from 'react';
import { Meta, Story } from '@storybook/react';
import DataGrid , { DataGridProps } from '../../src';
import faker from '@faker-js/faker';

const meta: Meta = {
  title: 'Styling/Style Table Body Rows',
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
    Header: 'Age',
    accessor: 'age' as const,
  },
  {
    Header: 'Address',
    accessor: 'address' as const,
  },
];
const data = [...Array(21)].map((_) => ({
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  age: faker.datatype.number(80),
  address: faker.address.streetAddress(),
}));

export const DefaultTableBodyRowStyles: Story<DataGridProps> = () => (
  <DataGrid columns={columns} data={data} />
);

export const DisableRowHoverEffect: Story<DataGridProps> = () => (
  <DataGrid
    columns={columns}
    data={data}
    bodyRowProps={{
      hover: false,
    }}
  />
);

export const StyleTableBodyRow: Story<DataGridProps> = () => (
  <DataGrid
    columns={columns}
    data={data}
    bodyRowProps={{
      style: {
        backgroundColor: 'rgba(52, 210, 235, 0.1)',
        borderRight: '1px solid rgba(224,224,224,1)',
      },
    }}
  />
);

export const StyleCustomStripedRows: Story<DataGridProps> = () => (
  <DataGrid
    columns={columns}
    data={data}
    bodyRowProps={(row) => ({
      style: {
        backgroundColor: row.index % 2 === 0 ? 'rgba(52, 54, 245, 0.08)' : '',
      },
    })}
    muiTableBodyCellProps={{ style: { border: 'none' } }}
  />
);

export const ConditionallyStyleTableRow: Story<
  DataGridProps
> = () => (
  <DataGrid
    columns={columns}
    data={data}
    bodyRowProps={(row) => ({
      style: {
        backgroundColor:
          row.values['age'] > 50 ? 'rgba(255, 54, 33, 0.18)' : '',
        fontStyle: 'italic',
      },
    })}
  />
);
