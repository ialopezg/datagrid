import { TableFooter } from '@mui/material';
import React, { FC } from 'react';
import { useDataGrid } from '../providers';
import { FooterRow } from './FooterRow';
import Pagination from '../Pagination';

interface FooterProps {}

export const Footer: FC<FooterProps> = () => {
  const { options, table } = useDataGrid();

  const hasFooterGroups = table.columns.some(
    (c) => c.depth === 0 && !!c.Footer
  );

  return (
    <TableFooter>
      {hasFooterGroups &&
        table.footerGroups.map((footerGroup) => (
          <FooterRow
            footerGroup={footerGroup}
            key={footerGroup.getFooterGroupProps().key}
          />
        ))}

      {options?.showPagination === true ||
        (['bottom', 'both'].includes(String(options?.showPagination)) && (
          <Pagination />
        ))}
    </TableFooter>
  );
};

export default Footer;
