import { Collapse, TableCell, TableRow } from '@mui/material';
import { Row } from 'react-table';
import React, { FC } from 'react';

import { useDataGrid } from '../providers';

interface DetailPanelProps {
  row: Row;
}

export const DetailPanel: FC<DetailPanelProps> = ({ row }) => {
  const {
    bodyRowProps: defaultBodyRowProps,
    detailPanel,
    detailPanelProps: defaultDetailPanelProps,
    onDetailPanelClick,
    table,
  } = useDataGrid();

  const rowProps =
    defaultBodyRowProps instanceof Function
      ? defaultBodyRowProps(row)
      : defaultBodyRowProps;
  const bodyRowProps = {
    ...rowProps,
    ...row.getToggleRowExpandedProps(),
    style: {
      ...row.getToggleRowExpandedProps().style,
      ...(rowProps?.style ?? {}),
    },
  }
  const detailPanelProps =
    defaultDetailPanelProps instanceof Function
      ? defaultDetailPanelProps(row)
      : defaultDetailPanelProps;
  const bodyCellProps = {
    ...detailPanelProps,
    ...row.getRowProps(),
    style: {
      borderBottom: !row.isExpanded ? 'none' : undefined,
      paddingBottom: row.isExpanded ? '1rem' : 0,
      paddingTop: row.isExpanded ? '1rem' : 0,
      transition: 'all 0.2s ease-in-out',
      ...row.getRowProps().style,
      ...(detailPanelProps?.style ?? {}),
    },
  };

  return (
    <TableRow {...bodyRowProps}>
      <TableCell
        colSpan={table.visibleColumns.length + 10}
        onClick={(e) => {
          onDetailPanelClick?.(e, row);
        }}
        {...bodyCellProps}
      >
        <Collapse in={row.isExpanded}>{detailPanel?.(row)}</Collapse>
      </TableCell>
    </TableRow>
  );
};

export default DetailPanel;
