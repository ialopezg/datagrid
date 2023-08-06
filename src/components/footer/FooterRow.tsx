import { TableRow } from '@mui/material';
import React, { FC } from 'react';
import { HeaderGroup } from 'react-table';

import { useDataGrid } from '../providers';
import FooterCell from './FooterCell';
import SpacerCell from '../table/SpacerCell';

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
    customFooterRowComponent,
  } = useDataGrid();

  if (!columns?.some((c) => c.Footer)) {
    return null;
  }

  if (customFooterRowComponent) {
    return <>{customFooterRowComponent(footerGroup, table)}</>;
  }

  return (
    <TableRow {...footerGroup.getFooterGroupProps()}>
      {(hasExpandableRows || detailPanel) && (
        <SpacerCell width={`${detailPanel ? 2 : table.expandedDepth + 0.5}rem`} />
      )}

      {enableSelection && <SpacerCell width="1rem" />}

      {footerGroup.headers.map((column) => (
        <FooterCell column={column} key={column.getHeaderProps().key} />
      ))}
      {enableColumnHiding && <SpacerCell />}
    </TableRow>
  );
};

export default FooterRow;
