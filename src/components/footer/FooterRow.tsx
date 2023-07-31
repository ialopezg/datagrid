import { TableCell, TableRow } from '@mui/material';
import React, { FC } from 'react';
import { HeaderGroup } from 'react-table';

import { useDataGrid } from '../providers';
import FooterCell from './FooterCell';

interface FooterRowProps {
  footerGroup: HeaderGroup;
}

export const FooterRow: FC<FooterRowProps> = ({ footerGroup }) => {
  const { columns, detailPanel, enableSelection } = useDataGrid();

  if (!columns.some((c) => c.Footer)) {
    return null;
  }

  return (
    <TableRow {...footerGroup.getFooterGroupProps()}>
      {enableSelection && <TableCell style={{ width: '2rem' }} />}

      {detailPanel && <TableCell style={{ width: '2rem' }} />}

      {footerGroup.headers.map((column) => (
        <FooterCell column={column} key={column.getHeaderProps().key} />
      ))}
    </TableRow>
  );
};

export default FooterRow;
