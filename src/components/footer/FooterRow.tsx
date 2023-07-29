import { TableRow } from '@mui/material';
import React, { FC } from 'react';
import { HeaderGroup } from 'react-table';
import { FooterCell } from './FooterCell';

interface FooterRowProps {
  footerGroup: HeaderGroup<object>;
}

export const FooterRow: FC<FooterRowProps> = ({ footerGroup }) => (
  <TableRow {...footerGroup.getFooterGroupProps()}>
    {footerGroup.headers.map((column) => (
      <FooterCell column={column} key={column.getHeaderProps().key} />
    ))}
  </TableRow>
);

export default FooterRow;
