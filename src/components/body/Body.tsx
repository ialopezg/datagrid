import { alpha, CircularProgress, styled } from '@mui/material';
import MuiTableBody from '@mui/material/TableBody';
import React, { FC } from 'react';

import BodyRow from './BodyRow';
import { useDataGrid } from '../providers';

const TableBody = styled(MuiTableBody)({
  overflowY: 'hidden',
});

const CircularProgressWrapper = styled('div')(({ theme }) => ({
  backgroundColor: alpha(theme.palette.background.paper, 0.5),
  display: 'grid',
  height: '100%',
  justifyContent: 'center',
  margin: 'auto',
  paddingTop: '5rem',
  position: 'fixed',
  width: 'calc(100% - 2rem)',
}));

interface BodyProps {}

export const Body: FC<BodyProps> = () => {
  const {
    bodyProps: defaultBodyProps,
    isLoading,
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
