import MuiTableCell from '@mui/material/TableCell';
import { Collapse, styled, TableRow } from '@mui/material';
import React, { FC } from 'react';

import { DataGridRow } from '../DataGrid';
import { useDataGrid } from '../providers';

const TableCell = styled(MuiTableCell, {
  shouldForwardProp: (prop: PropertyKey) => prop !== 'isExpanded',
})<{ isExpanded?: boolean }>(({ isExpanded }) => ({
  borderBottom: !isExpanded ? 'none' : undefined,
  paddingBottom: isExpanded ? '1rem' : 0,
  paddingTop: isExpanded ? '1rem' : 0,
  transition: 'all 0.2s ease-in-out',
}));

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

  const tableBodyRowProps =
    bodyRowProps instanceof Function
      ? bodyRowProps(row)
      : bodyRowProps;
  const tableRowProps = {
    ...tableBodyRowProps,
    ...row.getRowProps(),
    style: {
      ...row.getRowProps().style,
      ...(tableBodyRowProps?.style ?? {}),
    },
  };
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
        isExpanded={row.isExpanded}
        {...tableCellProps}
      >
        <Collapse in={row.isExpanded}>{detailPanel?.(row)}</Collapse>
      </TableCell>
    </TableRow>
  );
};

export default DetailPanel;
