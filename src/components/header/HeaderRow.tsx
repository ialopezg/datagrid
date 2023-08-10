import { TableRow } from '@mui/material';
import { HeaderGroup } from 'react-table';
import React, { FC, useMemo } from 'react';

import ExpandAllRowsAction from '../actions/ExpandAllRowsAction';
import SelectAllRowsAction from '../actions/SelectAllRowsAction';
import SpacerCell from '../table/SpacerCell';
import { useDataGrid } from '../providers';
import HeaderCell from './HeaderCell';
import HeaderActionsCell from './HeaderActionsCell';

interface HeaderRowProps {
  headerGroup: HeaderGroup;
}

export const HeaderRow: FC<HeaderRowProps> = ({ headerGroup }) => {
  const {
    detailPanel,
    disableExpandAll,
    enableRowActions,
    enableSelection,
    hasExpandableRows,
    headerRowProps: defaultHeaderRowProps,
    rowActionsColumn,
    table,
  } = useDataGrid();

  const rowProps =
    defaultHeaderRowProps instanceof Function
      ? defaultHeaderRowProps(headerGroup)
      : defaultHeaderRowProps;
  const headerRowProps = {
    ...headerGroup,
    ...headerGroup.getHeaderGroupProps(),
    style: {
      ...headerGroup.getHeaderGroupProps().style,
      ...(rowProps?.style ?? {}),
    },
  };

  const isParent = useMemo(
    () => headerGroup.headers.some((h) => (h.columns?.length ?? 0) > 0),
    [headerGroup.headers],
  );

  return (
    <TableRow {...headerRowProps}>
      {enableRowActions &&
        rowActionsColumn === 'first' &&
        (isParent ? <SpacerCell /> : <HeaderActionsCell />)}

      {hasExpandableRows || detailPanel ? (
        !disableExpandAll && !isParent ? (
          <ExpandAllRowsAction />
        ) : (
          <SpacerCell
            width={`${detailPanel ? 2 : table.expandedDepth + 0.5}rem`}
          />
        )
      ) : null}

      {enableSelection ? (
        !isParent ? (
          <SelectAllRowsAction />
        ) : (
          <SpacerCell width="1rem" />
        )
      ) : null}

      {headerGroup.headers.map((column) => (
        <HeaderCell column={column} key={column.getHeaderProps().key} />
      ))}

      {enableRowActions &&
        rowActionsColumn === 'last' &&
        (isParent ? <SpacerCell /> : <HeaderActionsCell />)}
    </TableRow>
  );
};

export default HeaderRow;
