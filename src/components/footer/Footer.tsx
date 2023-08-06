import { TableFooter } from '@mui/material';
import React, { FC } from 'react';

import { useDataGrid } from '../providers';
import Pagination from '../toolbar/Pagination';
import FooterRow from './FooterRow';

interface FooterProps {}

export const Footer: FC<FooterProps> = () => {
  const { footerProps, manualPagination,  paginationPosition, table } =
    useDataGrid();

  return (
    <TableFooter {...footerProps}>
      {table.footerGroups.map((footerGroup) => (
        <FooterRow
          footerGroup={footerGroup}
          key={footerGroup.getFooterGroupProps().key}
        />
      ))}

      {!manualPagination &&
        ['bottom', 'both'].includes(String(paginationPosition)) && (
          <Pagination />
        )}
    </TableFooter>
  );
};

export default Footer;
