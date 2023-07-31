import { TableCell, TableRow } from '@mui/material';
import { HeaderGroup } from 'react-table';
import React, { FC } from 'react';

import SelectAllRowsAction from '../actions/SelectAllRowsAction';
import { useDataGrid } from '../providers';
import HeaderCell from './HeaderCell';
import ExpandAllRowsAction from '../actions/ExpandAllRowsAction';

interface HeaderRowProps {
  headerGroup: HeaderGroup;
}

export const HeaderRow: FC<HeaderRowProps> = ({ headerGroup }) => {
  const {
    detailPanel,
    enableExpandAll,
    enableSelection,
    hasExpandableRows,
    table,
    CustomHeaderRowComponent,
  } = useDataGrid();

  if (CustomHeaderRowComponent) {
    return <>{CustomHeaderRowComponent(headerGroup, table)}</>;
  }

  const isParent = headerGroup.headers.some(
    (h) => (h.columns?.length ?? 0) > 0,
  );

  return (
    <TableRow {...headerGroup.getHeaderGroupProps()}>
      {enableSelection ? (
        !isParent ? (
          <SelectAllRowsAction />
        ) : (
          <TableCell style={{ width: '2rem' }} />
        )
      ) : null}

      {(hasExpandableRows || detailPanel) &&
        (enableExpandAll && !isParent ? (
          <ExpandAllRowsAction />
        ) : (
          <TableCell style={{ width: '2rem' }} />
        ))}

      {headerGroup.headers.map((column) => (
        <HeaderCell column={column} key={column.getHeaderProps().key} />
      ))}
    </TableRow>
  );
};

export default HeaderRow;
