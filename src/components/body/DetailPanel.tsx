import { Collapse, TableCell, TableRow } from '@mui/material';
import React, { FC } from 'react';

import { DataGridRow } from '../DataGrid';
import { useDataGrid } from '../providers';

interface DetailPanelProps {
  row: DataGridRow;
}

export const DetailPanel: FC<DetailPanelProps> = ({ row }) => {
  const {
    bodyRowProps,
    detailPanel,
    detailPanelProps,
    onDetailPanelClick,
    table,
  } = useDataGrid();

  const tableRowProps =
    bodyRowProps instanceof Function
      ? bodyRowProps(row)
      : bodyRowProps;
  const tableCellProps =
    detailPanelProps instanceof Function
      ? detailPanelProps(row)
      : detailPanelProps;

  return (
    <TableRow hover {...tableRowProps}>
      <TableCell
        colSpan={table.visibleColumns.length + 10}
        onClick={(e) => {
          onDetailPanelClick?.(e, row);
        }}
        {...tableCellProps}
        sx={{
          borderBottom: !row.isExpanded ? 'none' : undefined,
          pb: row.isExpanded ? '1rem' : 0,
          pt: row.isExpanded ? '1rem' : 0,
          transition: 'all 0.2s ease-in-out',
          ...tableCellProps?.sx,
        }}
      >
        <Collapse in={row.isExpanded}>{detailPanel?.(row)}</Collapse>
      </TableCell>
    </TableRow>
  );
};

export default DetailPanel;
