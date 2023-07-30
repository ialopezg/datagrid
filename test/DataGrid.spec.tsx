import React from 'react';
import * as ReactDOM from 'react-dom';
import DataGrid from '../src';

describe('DataGrid', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<DataGrid columns={[]} data={[]} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
