import { TableCell, TableRow } from '@mui/material';
import { HeaderGroup } from 'react-table';
import React, { FC, useMemo } from 'react';

import SelectAllRowsAction from '../actions/SelectAllRowsAction';
import { useDataGrid } from '../providers';
import HeaderCell from './HeaderCell';
import ExpandAllRowsAction from '../actions/ExpandAllRowsAction';
import { ColumnsVisibilityAction } from '../actions/ColumnsVisibilityAction';

interface HeaderRowProps {
  headerGroup: HeaderGroup;
}

export const HeaderRow: FC<HeaderRowProps> = ({ headerGroup }) => {
  const {
    detailPanel,
    enableColumnHiding,
    enableExpandAll,
    enableSelection,
    hasExpandableRows,
    table,
    CustomHeaderRowComponent,
  } = useDataGrid();

  if (CustomHeaderRowComponent) {
    return <>{CustomHeaderRowComponent(headerGroup, table)}</>;
  }

  const isParent = useMemo(
    () => headerGroup.headers.some((h) => (h.columns?.length ?? 0) > 0),
    [headerGroup.headers],
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

      {headerGroup.headers.map((column, index) => (
        <HeaderCell
          column={column}
          index={index}
          key={column.getHeaderProps().key}
        />
      ))}
      {enableColumnHiding && !isParent && <ColumnsVisibilityAction />}
    </TableRow>
  );
};

export default HeaderRow;
