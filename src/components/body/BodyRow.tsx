import { TableRow } from '@mui/material';
import { Row } from 'react-table';
import React, { FC } from 'react';

import BodyCell from './BodyCell';
import { useDataGrid } from '../providers';
import DetailPanel from './DetailPanel';
import ExpandRowAction from '../actions/ExpandRowAction';
import SelectRowAction from '../actions/SelectRowAction';
import SpacerCell from '../table/SpacerCell';

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
        {((enableRowTree && hasExpandableRows) || detailPanel) &&
          (row.canExpand || detailPanel ? (
            <ExpandRowAction row={row} />
          ) : (
            <SpacerCell width={`${table.expandedDepth + 0.5}rem`} />
          ))}

        {enableSelection && <SelectRowAction row={row} />}

        {row.cells.map((cell) => (
          <BodyCell cell={cell} key={cell.getCellProps().key} />
        ))}
        {enableColumnHiding && <SpacerCell />}
      </TableRow>

      {detailPanel && <DetailPanel row={row} />}
    </>
  );
};

export default BodyRow;
