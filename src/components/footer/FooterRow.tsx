import { TableCell, TableRow } from '@mui/material';
import React, { FC } from 'react';
import { HeaderGroup } from 'react-table';

import { useDataGrid } from '../providers';
import FooterCell from './FooterCell';

interface FooterRowProps {
  footerGroup: HeaderGroup;
}

export const FooterRow: FC<FooterRowProps> = ({ footerGroup }) => {
  const {
    columns,
    detailPanel,
    enableColumnHiding,
    enableSelection,
    hasExpandableRows,
    table,
    CustomFooterRowComponent,
  } = useDataGrid();

  if (!columns.some((c) => c.Footer)) {
    return null;
  }

  if (CustomFooterRowComponent) {
    return <>{CustomFooterRowComponent(footerGroup, table)}</>;
  }

  return (
    <TableRow {...footerGroup.getFooterGroupProps()}>
      {(hasExpandableRows || detailPanel) && (
        <TableCell style={{ width: `${table.expandedDepth + 0.5}rem` }} />
      )}

      {enableSelection && <TableCell style={{ width: '1rem' }} />}

      {footerGroup.headers.map((column) => (
        <FooterCell column={column} key={column.getHeaderProps().key} />
      ))}
      {enableColumnHiding && <TableCell />}
    </TableRow>
  );
};

export default FooterRow;
