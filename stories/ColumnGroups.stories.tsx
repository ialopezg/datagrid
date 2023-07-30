import fake from '@faker-js/faker';
import { Meta } from '@storybook/react';
import React from 'react';

import DataGrid from '../src';

const meta: Meta = {
  title: 'Examples/Column Groups',
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

const data = [...Array(5)].map((_) => ({
  firstName: fake.name.firstName(),
  lastName: fake.name.lastName(),
  age: fake.datatype.number(80),
  address: fake.address.streetAddress(),
}));

export const Header = () => (
  <DataGrid columns={[
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
  ]} data={data} />
);

export const HeaderAndFooter = () => (
  <DataGrid columns={[
    {
      Footer: 'Name',
      Header: 'Name',
      columns: [
        { accessor: 'firstName', Header: 'First Name' },
        { accessor: 'lastName', Header: 'Last Name' },
      ],
    },
    {
      Footer: 'Info',
      Header: 'Info',
      columns: [
        { accessor: 'age', Header: 'Age' },
        { accessor: 'address', Header: 'Address' },
      ],
    },
  ]} data={data} />
);
