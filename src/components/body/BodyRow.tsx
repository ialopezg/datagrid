import { TableCell, TableRow } from '@mui/material';
import { Row } from 'react-table';
import React, { FC } from 'react';

import BodyCell from './BodyCell';
import { useDataGrid } from '../providers';
import DetailPanel from './DetailPanel';
import ExpandRowAction from '../actions/ExpandRowAction';
import SelectRowAction from '../actions/SelectRowAction';

interface BodyRowProps {
  row: Row;
}

export const BodyRow: FC<BodyRowProps> = ({ row }) => {
  const {
    detailPanel,
    enableColumnHiding,
    enableRowTree,
    enableSelection,
    hasExpandableRows,
    onRowClick,
    table,
    CustomBodyRowComponent,
  } = useDataGrid();

  if (CustomBodyRowComponent) {
    return <>{CustomBodyRowComponent(row, table)}</>;
  }

  return (
    <>
      <TableRow onClick={(e) => onRowClick?.(e, row)} {...row.getRowProps()}>
        {enableSelection && <SelectRowAction row={row} />}

        {((enableRowTree && hasExpandableRows) || detailPanel) &&
          (row.canExpand || detailPanel ? (
            <ExpandRowAction row={row} />
          ) : (
            <TableCell />
          ))}

        {row.cells.map((cell) => (
          <BodyCell cell={cell} key={cell.getCellProps().key} />
        ))}
        {enableColumnHiding && <TableCell />}
      </TableRow>

      {detailPanel && <DetailPanel row={row} />}
    </>
  );
};

export default BodyRow;
