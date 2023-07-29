import fake from '@faker-js/faker';
import { Meta, Story } from '@storybook/react';
import React from 'react';

import DataGrid, { DataGridProps } from '../src';

const meta: Meta = {
  title: 'DataGrid',
  component: DataGrid,
  argTypes: {
    children: {
      control: {
        type: 'text',
      },
    },
  },
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

const Template: Story<DataGridProps> = (args) => <DataGrid {...args} />;

export const Basic = Template.bind({});
Basic.args = {
  columns: [
    { accessor: 'firstName', Header: 'First Name' },
    { accessor: 'lastName', Header: 'Last Name' },
  ],
  data: [...Array(5)].map((_) => ({
    firstName: fake.name.firstName(),
    lastName: fake.name.lastName(),
  })),
};

export const HeaderGroup = Template.bind({});
HeaderGroup.args = {
  columns: [
    {
      Header: 'Name',
      columns: [
        { accessor: 'firstName', Header: 'First Name' },
        { accessor: 'lastName', Header: 'Last Name' },
      ],
    },
    {
      Header: 'Info',
      columns: [
        { accessor: 'age', Header: 'Age' },
        { accessor: 'visits', Header: 'Visits' },
        { accessor: 'status', Header: 'Status' },
        { accessor: 'progress', Header: 'Profile Progress' },
      ],
    },
  ],
  data: [...Array(12)].map((_) => ({
    firstName: fake.name.firstName(),
    lastName: fake.name.lastName(),
    age: fake.datatype.number(100),
    visits: fake.datatype.number(100),
    progress: fake.datatype.number(100),
  })),
};

export const FooterGroup = Template.bind({});
FooterGroup.args = {
  columns: [
    {
      Footer: 'Name',
      Header: 'Name',
      columns: [
        { accessor: 'firstName', Footer: 'First Name', Header: 'First Name' },
        { accessor: 'lastName', Footer: 'Last Name', Header: 'Last Name' },
      ],
    },
    {
      Footer: 'Info',
      Header: 'Info',
      columns: [
        { accessor: 'age', Footer: 'Age', Header: 'Age' },
        { accessor: 'visits', Footer: 'Visits', Header: 'Visits' },
        { accessor: 'status', Footer: 'Status', Header: 'Status' },
        {
          accessor: 'progress',
          Footer: 'Profile Progress',
          Header: 'Profile Progress',
        },
      ],
    },
  ],
  data: [...Array(12)].map((_) => ({
    firstName: fake.name.firstName(),
    lastName: fake.name.lastName(),
    age: fake.datatype.number(100),
    visits: fake.datatype.number(100),
    progress: fake.datatype.number(100),
  })),
};
