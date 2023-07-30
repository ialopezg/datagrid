import { TableCell, TableRow } from '@mui/material';
import React, { FC } from 'react';
import { HeaderGroup } from 'react-table';
import { FooterCell } from './FooterCell';
import { useDataGrid } from '../providers';

interface FooterRowProps {
  footerGroup: HeaderGroup<object>;
}

export const FooterRow: FC<FooterRowProps> = ({ footerGroup }) => {
  const { detailPanel } = useDataGrid();

  return (
    <TableRow {...footerGroup.getFooterGroupProps()}>
      {detailPanel && <TableCell style={{ width: '2rem' }} />}

      {footerGroup.headers.map((column) => (
        <FooterCell column={column} key={column.getHeaderProps().key} />
      ))}
    </TableRow>
  );
}

export default FooterRow;
