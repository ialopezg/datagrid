import { CircularProgress, styled } from '@mui/material';
import MuiTableBody from '@mui/material/TableBody';
import React, { FC } from 'react';

import BodyRow from './BodyRow';
import { useDataGrid } from '../providers';

const TableBody = styled(MuiTableBody)({
  overflowY: 'hidden',
});

const CircularProgressWrapper = styled('div')({
  backgroundColor: 'rgba(255, 255, 255, 0.5)',
  display: 'grid',
  height: '100%',
  justifyContent: 'center',
  margin: 'auto',
  paddingTop: '5rem',
  position: 'fixed',
  width: 'calc(100% - 2rem)',
});

interface BodyProps {}

export const Body: FC<BodyProps> = () => {
  const { bodyProps, isLoading, manualPagination, table } = useDataGrid();
  const rows = manualPagination ? table.rows : table.page;

  return (
    <TableBody {...bodyProps} {...table.getTableBodyProps()}>
      {isLoading && (
        <CircularProgressWrapper>
          <CircularProgress />
        </CircularProgressWrapper>
      )}

      {rows.map((row) => {
        table.prepareRow(row);

        return <BodyRow key={row.getRowProps().key} row={row} />;
      })}
    </TableBody>
  );
};

export default Body;
