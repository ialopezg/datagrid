import { TableCell } from '@mui/material';
import React, { FC } from 'react';

import { DataGridHeaderGroup } from '../DataGrid';
import { useDataGrid } from '../providers';

interface FooterCellProps {
  column: DataGridHeaderGroup;
}

export const FooterCell: FC<FooterCellProps> = ({ column }) => {
  const {
    enableColumnResizing,
    footerCellProps,
    table: {
      state: { densePadding },
    },
  } = useDataGrid();

  const isParent = !!column?.columns?.length;

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
      ...bodyFooterCellProps?.style,
      ...columnFooterCellProps?.style,
    },
  };

  return (
    <TableCell
      align={isParent ? 'center' : 'left'}
      variant="head"
      {...tableCellProps}
      sx={{
        fontWeight: 'bold',
        verticalAlign: 'text-top',
        p: densePadding ? '0.5rem' : '1rem',
        transition: `all ${enableColumnResizing ? '10ms' : '0.2s'} ease-in-out`,
        ...tableCellProps?.sx,
      }}
    >
      {column.render('Footer')}
    </TableCell>
  );
};

export default FooterCell;
