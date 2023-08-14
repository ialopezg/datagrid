import MuiTableCell from '@mui/material/TableCell';
import { styled } from '@mui/material';
import React, { FC } from 'react';

import { DataGridHeaderGroup } from '../DataGrid';
import { useDataGrid } from '../providers';

const TableCell = styled(MuiTableCell, {
  shouldForwardProp: (prop: PropertyKey) =>
    prop !== 'densePadding' && prop !== 'enabledColumnResizing',
})<{ densePadding?: boolean; enableColumnResizing?: boolean }>(
  ({ densePadding, enableColumnResizing }) => ({
    fontWeight: 'bold',
    verticalAlign: 'text-top',
    padding: densePadding ? '0.5rem' : '1rem',
    transition: `all ${enableColumnResizing ? '10ms' : '0.2s'} ease-in-out`,
  }),
);

interface FooterCellProps {
  column: DataGridHeaderGroup;
}

export const FooterCell: FC<FooterCellProps> = ({ column }) => {
  const {
    densePadding,
    enableColumnResizing,
    footerCellProps,
  } = useDataGrid();
  const isParent = (column?.columns?.length ?? 0) > 0;

  const bodyFooterCellProps =
    footerCellProps instanceof Function
      ? footerCellProps(column)
      : footerCellProps;
  const columnFooterCellProps =
    column.footerCellProps instanceof Function
      ? column.footerCellProps(column)
      : column.footerCellProps;
  const tableCellProps = {
    ...bodyFooterCellProps,
    ...columnFooterCellProps,
    ...column.getFooterProps(),
    style: {
      ...column.getFooterProps().style,
      ...(bodyFooterCellProps?.style ?? {}),
      ...(columnFooterCellProps?.style ?? {}),
    },
  };

  return (
    <TableCell
      align={isParent ? 'center' : 'left'}
      densePadding={densePadding}
      enableColumnResizing={enableColumnResizing}
      variant="head"
      {...tableCellProps}
    >
      {column.render('Footer')}
    </TableCell>
  );
};

export default FooterCell;
