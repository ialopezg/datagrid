import { TableCell, TableRow } from '@mui/material';
import { HeaderGroup } from 'react-table';
import React, { FC } from 'react';

import SelectAllRows from '../actions/SelectAllRows';
import { useDataGrid } from '../providers';
import HeaderCell from './HeaderCell';

interface HeaderRowProps {
  headerGroup: HeaderGroup;
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
