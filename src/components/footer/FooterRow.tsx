import { TableCell, TableRow } from '@mui/material';
import React, { FC } from 'react';
import { HeaderGroup } from 'react-table';
import { FooterCell } from './FooterCell';
import { useDataGrid } from '../providers';

interface FooterRowProps {
  footerGroup: HeaderGroup<object>;
}

export const FooterRow: FC<FooterRowProps> = ({ footerGroup }) => {
  const { detailPanel, enableSelection } = useDataGrid();

  if (!footerGroup.getFooterGroupProps.name) {
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
}

export default FooterRow;
