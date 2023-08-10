import MuiTableCell from '@mui/material/TableCell';
import { Collapse, styled, TableRow, TableRowProps } from '@mui/material';
import { Row } from 'react-table';
import React, { FC } from 'react';

const TableCell = styled(MuiTableCell, {
  shouldForwardProp: (prop: PropertyKey) => prop !== 'isExpanded',
})<{ isExpanded?: boolean }>(({ isExpanded }) => ({
  borderBottom: !isExpanded ? 'none' : undefined,
  paddingBottom: isExpanded ? '1rem' : 0,
  paddingTop: isExpanded ? '1rem' : 0,
  transition: 'all 0.2s ease-in-out',
}));

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
      : (defaultBodyRowProps as TableRowProps);
  const bodyRowProps = {
    ...rowProps,
    ...row.getToggleRowExpandedProps(),
    style: {
      ...row.getToggleRowExpandedProps().style,
      ...(rowProps?.style ?? {}),
    },
  };
  const detailPanelProps =
    defaultDetailPanelProps instanceof Function
      ? defaultDetailPanelProps(row)
      : defaultDetailPanelProps;
  const bodyCellProps = {
    ...detailPanelProps,
    style: {
      ...(detailPanelProps?.style ?? {}),
    },
  };

  return (
    <TableRow hover {...bodyRowProps}>
      <TableCell
        colSpan={table.visibleColumns.length + 10}
        onClick={(e) => {
          onDetailPanelClick?.(e, row);
        }}
        isExpanded={row.isExpanded}
        {...bodyCellProps}
      >
        <Collapse in={row.isExpanded}>{detailPanel?.(row)}</Collapse>
      </TableCell>
    </TableRow>
  );
};

export default DetailPanel;
