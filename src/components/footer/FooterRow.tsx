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
  const { columns, detailPanel, enableSelection, hasExpandableRows, table } =
    useDataGrid();

  if (!columns?.some((c) => c.Footer)) {
    return null;
  }

  return (
    <TableRow {...footerGroup.getFooterGroupProps()}>
      {(hasExpandableRows || detailPanel) && (
        <SpacerCell
          width={`${detailPanel ? 2 : table.expandedDepth + 0.5}rem`}
        />
      )}

      {enableSelection && <SpacerCell width="1rem" />}

      {footerGroup.headers.map((column) => (
        <FooterCell column={column} key={column.getHeaderProps().key} />
      ))}
    </TableRow>
  );
};

export default FooterRow;
