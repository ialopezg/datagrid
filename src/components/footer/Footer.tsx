import { TableFooter } from '@mui/material';
import React, { FC } from 'react';
import { useDataGrid } from '../providers';
import { FooterRow } from './FooterRow';

interface FooterProps {}

export const Footer: FC<FooterProps> = () => {
  const { table } = useDataGrid();

  return (
    <TableFooter>
      {table.footerGroups.map((footerGroup) => (
        <FooterRow
          footerGroup={footerGroup}
          key={footerGroup.getFooterGroupProps().key}
        />
      ))}
      {/*<TablePagination*/}
      {/*  count={3}*/}
      {/*  page={0}*/}
      {/*  rowsPerPage={10}*/}
      {/*  rowsPerPageOptions={[5, 10, 25, 50, 100]}*/}
      {/*  onPageChange={(_, page) => console.log(page)}*/}
      {/*/>*/}
    </TableFooter>
  );
};

export default Footer;
