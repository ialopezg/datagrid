import MuiTableCell from '@mui/material/TableCell';
import React, { FC } from 'react';
import { HeaderGroup, TableCellProps } from 'react-table';
import { styled } from '@mui/material';
import { useDataGrid } from '../providers';

const TableCell = styled(MuiTableCell, {
  shouldForwardProp: (prop: PropertyKey) => prop !== 'densePadding' && prop !== 'enabledColumnResizing',
})<{ densePadding?: boolean, enableColumnResizing?: boolean }>(({ densePadding, enableColumnResizing }) => ({
  fontWeight: 'bold',
  verticalAlign: 'text-top',
  padding: densePadding ? '0.5rem' : '1rem',
  transition: `all ${enableColumnResizing ? '10ms' : '0.2s'} ease-in-out`,
}));

interface FooterCellProps {
  column: HeaderGroup;
}

export const FooterCell: FC<FooterCellProps> = ({ column }) => {
  const { densePadding, enableColumnResizing, footerCellProps: defaultFooterCellProps } =
    useDataGrid();
  const isParent = (column?.columns?.length ?? 0) > 0;

  const cellProps =
    (defaultFooterCellProps instanceof Function
      ? defaultFooterCellProps(column)
      : defaultFooterCellProps) as TableCellProps;
  const columnFooterCellProps = (column.footerCellProps instanceof Function
    ? column.footerCellProps(column)
    : column.footerCellProps) as TableCellProps;
  const footerCellProps = {
    ...cellProps,
    ...columnFooterCellProps,
    ...column.getFooterProps(),
    style: {
      ...column.getFooterProps().style,
      ...(cellProps?.style ?? {}),
      ...(columnFooterCellProps?.style ?? {}),
    },
  };

  return (
    <TableCell
      align={isParent ? 'center' : 'left'}
      densePadding={densePadding}
      enableColumnResizing={enableColumnResizing}
      variant='head'
      {...footerCellProps}
    >
      {column.render('Footer')}
    </TableCell>
  );
};

export default FooterCell;
