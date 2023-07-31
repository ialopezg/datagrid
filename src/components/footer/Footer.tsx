import { TableFooter } from '@mui/material';
import React, { FC } from 'react';

import { useDataGrid } from '../providers';
import Pagination from '../toolbar/Pagination';
import FooterRow from './FooterRow';

interface FooterProps {}

export const Footer: FC<FooterProps> = () => {
  const { enablePagination, paginationPosition, table, CustomFooterComponent } =
    useDataGrid();

  if (CustomFooterComponent) {
    return <>{CustomFooterComponent(table)}</>;
  }

  return (
    <TableFooter>
      {table.footerGroups.map((footerGroup) => (
        <FooterRow
          footerGroup={footerGroup}
          key={footerGroup.getFooterGroupProps().key}
        />
      ))}

      {enablePagination &&
        ['bottom', 'both'].includes(String(paginationPosition)) && (
          <Pagination />
        )}
    </TableFooter>
  );
};

export default Footer;
