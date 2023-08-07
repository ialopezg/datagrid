import React from 'react';
import { Meta, Story } from '@storybook/react';
import DataGrid, { DataGridProps } from '../../src';
import faker from '@faker-js/faker';
import { Cell, TableCellProps } from 'react-table';

const meta: Meta = {
  title: 'Styling/Style Table Body Cells',
  component: DataGrid,
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

export const DefaultTableBodyCellStyles: Story<DataGridProps> = () => (
  <DataGrid columns={columns} data={data} />
);

export const CustomCellRender: Story<DataGridProps> = () => (
  <DataGrid
    columns={[
      {
        Header: 'First Name',
        accessor: 'firstName' as const,
        Cell: (cell: Cell) => (
          <span style={{ fontStyle: 'italic' }}>{cell.value}</span>
        ),
      },
      {
        Header: 'Last Name',
        accessor: 'lastName' as const,
        Cell: (cell: Cell) => (
          <span style={{ color: 'red' }}>{cell.value}</span>
        ),
      },
      {
        Header: 'Age',
        accessor: 'age' as const,
        Cell: (cell: Cell) => (
          <span
            style={{
              fontStyle: 'italic',
              padding: '0.5rem',
              backgroundColor:
                cell.column.id === 'age' && cell.value > 40
                  ? 'rgba(22, 184, 44, 0.5)'
                  : undefined,
            }}
          >
            {cell.value}
          </span>
        ),
      },
      {
        Header: 'Address',
        accessor: 'address' as const,
      },
    ]}
    data={data}
  />
);

export const StyleTableBodyCell: Story<DataGridProps> = () => (
  <DataGrid
    columns={columns}
    data={data}
    bodyCellProps={
      {
        style: {
          backgroundColor: 'rgba(52, 210, 235, 0.1)',
          borderRight: '1px solid rgba(224,224,224,1)',
        },
      } as TableCellProps
    }
  />
);

export const StyleMuiTableBodyCellConditionally: Story<DataGridProps> = () => (
  <DataGrid
    columns={columns}
    data={data}
    bodyCellProps={(cell: Cell<any>) =>
      ({
        style: {
          backgroundColor:
            cell.column.id === 'age' && cell.value > 40
              ? 'rgba(22, 184, 44, 0.5)'
              : undefined,
          fontWeight:
            cell.column.id === 'age' && cell.value > 40 ? '700' : '400',
        },
      })
    }
  />
);

export const StyleCustomStripedRows: Story<DataGridProps> = () => (
  <DataGrid
    columns={columns}
    data={data}
    bodyCellProps={(cell: Cell<any>) => ({
      style: {
        backgroundColor:
          cell.row.index % 2 === 0 ? 'rgba(52, 54, 245, 0.05)' : '',
      },
    })}
  />
);
