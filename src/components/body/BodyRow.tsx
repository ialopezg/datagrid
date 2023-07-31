import { TableRow } from '@mui/material';
import { Row } from 'react-table';
import React, { FC } from 'react';

import BodyCell from './BodyCell';
import { useDataGrid } from '../providers';
import DetailPanel from './DetailPanel';
import ExpandRow from '../actions/ExpandRow';
import SelectRow from '../actions/SelectRow';

interface BodyRowProps {
  row: Row;
}

export const BodyRow: FC<BodyRowProps> = ({ row }) => {
  const { detailPanel, enableSelection, onRowClick } = useDataGrid();

  return (
    <>
      <TableRow onClick={(e) => onRowClick?.(e, row)} {...row.getRowProps()}>
        {enableSelection && <SelectRow row={row} />}

        {detailPanel && <ExpandRow row={row} />}

        {row.cells.map((cell) => (
          <BodyCell cell={cell} key={cell.getCellProps().key} />
        ))}
      </TableRow>

      {detailPanel && <DetailPanel row={row} />}
    </>
  );
};

export default BodyRow;
