import { Collapse, TableCell, TableRow } from '@mui/material';
import { Row } from 'react-table';
import React, { FC } from 'react';
import { useDataGrid } from '../providers';

interface DetailPanelProps {
  row: Row<object>;
}

export const DetailPanel: FC<DetailPanelProps> = ({ row }) => {
  const { detailPanel, table } = useDataGrid();

  return (
    <TableRow {...row.getToggleRowExpandedProps()}>
      <TableCell
        colSpan={table.visibleColumns.length + 10}
        style={{
          borderBottom: !row.isExpanded ? 'none' : undefined,
          paddingBottom: row.isExpanded ? '1rem' : 0,
          paddingTop: row.isExpanded ? '1rem' : 0,
          transition: 'padding 0.2s',
        }}
      >
        <Collapse in={row.isExpanded}>{detailPanel?.(row)}</Collapse>
      </TableCell>
    </TableRow>
  );
};

export default DetailPanel;
