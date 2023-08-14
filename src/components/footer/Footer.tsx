import { TableFooter } from '@mui/material';
import React, { FC } from 'react';

import { DataGridHeaderGroup } from '../DataGrid';
import { useDataGrid } from '../providers';
import FooterRow from './FooterRow';

interface FooterProps {}

export const Footer: FC<FooterProps> = () => {
  const { footerProps, table } = useDataGrid();

  return (
    <TableFooter {...footerProps}>
      {table.footerGroups.map((footerGroup: DataGridHeaderGroup) => (
        <FooterRow
          footerGroup={footerGroup}
          key={footerGroup.getFooterGroupProps().key}
        />
      ))}
    </TableFooter>
  );
};

export default Footer;
