import { TableFooter } from '@mui/material';
import React, { FC } from 'react';

import { DataGridHeaderGroup } from '../DataGrid';
import { useDataGrid } from '../providers';
import FooterRow from './FooterRow';

interface FooterProps {}

export const Footer: FC<FooterProps> = () => {
  const { footerProps, table } = useDataGrid();

  const tableFooterProps =
    footerProps instanceof Function ? footerProps(table) : footerProps;

  return (
    <TableFooter {...tableFooterProps}>
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
