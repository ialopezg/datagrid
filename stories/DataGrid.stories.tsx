import React from 'react';
import { Meta, Story } from '@storybook/react';

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
    { accessor: 'col1', Header: 'Column 1' },
    { accessor: 'col2', Header: 'Column 2' },
  ],
  data: [
    { col1: 'Hello', col2: 'World' },
    { col1: 'react-table', col2: 'rocks' },
    { col1: 'whatever', col2: 'you want' },
  ],
};
