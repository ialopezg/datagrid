import { styled } from '@mui/material';
import MuiTableBody from '@mui/material/TableBody';
import React, { FC } from 'react';

import BodyRow from './BodyRow';
import { useDataGrid } from '../providers';

const TableBody = styled(MuiTableBody)({
  overflowY: 'hidden',
});

interface BodyProps {}

export const Body: FC<BodyProps> = () => {
  const {
    bodyProps: defaultBodyProps,
    manualPagination,
    table,
  } = useDataGrid();
  const rows = manualPagination ? table.rows : table.page;

  const bodyProps = {
    ...defaultBodyProps,
    ...table.getTableBodyProps(),
    style: {
      ...table.getTableBodyProps().style,
      ...(defaultBodyProps?.style ?? {}),
    },
  };

  return (
    <TableBody {...bodyProps}>
      {rows.map((row) => {
        table.prepareRow(row);

        return <BodyRow key={row.getRowProps().key} row={row} />;
      })}
    </TableBody>
  );
};

export default Body;
