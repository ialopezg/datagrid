import fake from '@faker-js/faker';
import { Meta, Story } from '@storybook/react';
import React from 'react';

import DataGrid, { DataGridProps } from '../src';

const meta: Meta = {
  title: 'Playground',
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

const Template: Story<DataGridProps> = (args) => (
  <DataGrid
    detailPanel={(row) => <div>Hello World from row {row.id}!</div>}
    enableSelectAll
    enableSelection
    {...args}
  />
);

export const Basic = Template.bind({});
Basic.args = {
  columns: [
    { accessor: 'firstName', Header: 'First Name' },
    { accessor: 'lastName', Header: 'Last Name' },
    { accessor: 'age', Header: 'Age' },
    { accessor: 'address', Header: 'Address' },
  ],
  data: [...Array(5)].map((_) => ({
    firstName: fake.name.firstName(),
    lastName: fake.name.lastName(),
    age: fake.datatype.number(80),
    address: fake.address.streetAddress(),
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
        { accessor: 'address', Header: 'Address' },
      ],
    },
  ],
  data: [...Array(12)].map((_) => ({
    firstName: fake.name.firstName(),
    lastName: fake.name.lastName(),
    age: fake.datatype.number(100),
    address: fake.address.streetAddress(),
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
        {
          accessor: 'address',
          Footer: 'Address',
          Header: 'Address',
        },
      ],
    },
  ],
  data: [...Array(21)].map((_) => ({
    firstName: fake.name.firstName(),
    lastName: fake.name.lastName(),
    age: fake.datatype.number(100),
    address: fake.address.streetAddress(),
  })),
};
