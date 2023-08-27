import { TableBody } from '@mui/material';
import React, { FC } from 'react';
import { DataGridRow } from '../DataGrid';

import BodyRow from './BodyRow';
import { useDataGrid } from '../providers';

interface BodyProps {}

export const Body: FC<BodyProps> = () => {
  const {
    bodyProps: defaultBodyProps,
    manualPagination,
    table,
  } = useDataGrid();
  const rows = manualPagination ? table.rows : table.page;

  const bodyProps =
    defaultBodyProps instanceof Function
      ? defaultBodyProps(table)
      : defaultBodyProps;
  const tableBodyProps = {
    ...bodyProps,
    ...table.getTableBodyProps(),
    style: {
      ...table.getTableBodyProps().style,
      ...bodyProps?.style,
    },
  };

  return (
    <TableBody {...tableBodyProps} sx={{ ...tableBodyProps?.sx }}>
      {rows.map((row: DataGridRow) => {
        table.prepareRow(row);

        return <BodyRow key={row.getRowProps().key} row={row} />;
      })}
    </TableBody>
  );
};

export default Body;
