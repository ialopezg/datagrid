import { TableCell, TableRow } from '@mui/material';
import React, { FC } from 'react';
import { HeaderGroup } from 'react-table';

import HeaderCell from './HeaderCell';
import { useDataGrid } from '../providers';
import { SelectAllRows } from '../actions';

interface HeaderRowProps {
  headerGroup: HeaderGroup<object>;
}

export const HeaderRow: FC<HeaderRowProps> = ({ headerGroup }) => {
  const { detailPanel, enableSelection } = useDataGrid();

  return (
    <TableRow {...headerGroup.getHeaderGroupProps()}>
      {enableSelection && <SelectAllRows />}

      {detailPanel && <TableCell style={{ width: '2rem' }} />}

      {headerGroup.headers.map((column) => (
        <HeaderCell column={column} key={column.getHeaderProps().key} />
      ))}
    </TableRow>
  );
}

export default HeaderRow;
