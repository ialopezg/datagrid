import { TableRow } from '@mui/material';
import { Row } from 'react-table';
import React, { FC } from 'react';

import BodyCell from './BodyCell';
import { useDataGrid } from '../providers';
import DetailPanel from './DetailPanel';
import ExpandRow from '../actions/ExpandRow';

interface BodyRowProps {
  row: Row<object>;
}

export const BodyRow: FC<BodyRowProps> = ({ row }) => {
  const { detailPanel } = useDataGrid();

  return (
    <>
      <TableRow {...row.getRowProps()}>
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
