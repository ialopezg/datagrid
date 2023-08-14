import { Meta, Story } from '@storybook/react';
import faker from '@faker-js/faker';
import React from 'react';
import DataGrid, { DataGridProps } from '../../src';

const meta: Meta = {
  title: 'Features/Full Screen',
  parameters: {
    status: {
      type: 'alpha',
    },
  },
};

export default meta;

const columns = [
  {
    Header: 'Employee',
    columns: [
      {
        Header: 'First Name',
        accessor: 'firstName' as const,
      },
      {
        Header: 'Last Name',
        accessor: 'lastName' as const,
      },
      {
        Header: 'Email',
        accessor: 'email' as const,
      },
    ],
  },
  {
    Header: 'Job Info',
    columns: [
      {
        Header: 'Job Title',
        accessor: 'jobTitle' as const,
      },
      {
        Header: 'Salary',
        accessor: 'salary' as const,
      },
      {
        Header: 'Start Date',
        accessor: 'startDate' as const,
      },
    ],
  },
];

const data = [...Array(128)].map((_) => ({
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  email: faker.internet.email(),
  jobTitle: faker.name.jobTitle(),
  salary: +faker.finance.amount(0, 150000, 0) + 20000,
  startDate: faker.date.past(8).toLocaleDateString(),
  signatureCatchPhrase: faker.company.catchPhrase(),
  avatar: faker.image.avatar(),
}));

export const FullScreenToggleEnabledDefault: Story<DataGridProps> = () => (
  <DataGrid columns={columns} data={data} />
);

export const DisableFullScreenToggle: Story<DataGridProps> = () => (
  <DataGrid columns={columns} data={data} disableFullScreen />
);

export const DefaultFullScreenOn: Story<DataGridProps> = () => (
  <DataGrid columns={columns} data={data} defaultFullScreen />
);
