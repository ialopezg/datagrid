import { TableFooter } from '@mui/material';
import React, { FC } from 'react';
import { useDataGrid } from '../providers';
import { FooterRow } from './FooterRow';
import Pagination from '../toolbar/Pagination';

interface FooterProps {}

export const Footer: FC<FooterProps> = () => {
  const { enablePagination, paginationPosition, table } = useDataGrid();

  return (
    <TableFooter>
      {table.footerGroups.map((footerGroup) => (
        <FooterRow
          footerGroup={footerGroup}
          key={footerGroup.getFooterGroupProps().key}
        />
      ))}

      {enablePagination &&
        (['bottom', 'both'].includes(String(paginationPosition)) && (
          <Pagination />
        ))}
    </TableFooter>
  );
};

export default Footer;
