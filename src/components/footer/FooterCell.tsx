import MuiTableCell from '@mui/material/TableCell';
import React, { FC } from 'react';
import { HeaderGroup } from 'react-table';
import { styled } from '@mui/material';
import { useDataGrid } from '../providers';

const TableCell = styled(MuiTableCell)({
  fontWeight: 'bold',
});

interface FooterCellProps {
  column: HeaderGroup;
}

export const FooterCell: FC<FooterCellProps> = ({ column }) => {
  const { densePadding, footerCellProps: defaultFooterCellProps } =
    useDataGrid();
  const isParent = (column?.columns?.length ?? 0) > 0;

  const cellProps =
    defaultFooterCellProps instanceof Function
      ? defaultFooterCellProps(column)
      : defaultFooterCellProps;
  const footerCellProps = {
    ...cellProps,
    ...column.getFooterProps(),
    style: {
      padding: densePadding ? '0.5rem' : '1rem',
      transition: 'all 0.2s ease-in-out',
      ...column.getFooterProps().style,
      ...(cellProps?.style ?? {}),
    },
  };

  return (
    <TableCell
      align={isParent ? 'center' : 'left'}
      variant="head"
      {...footerCellProps}
    >
      {column.render('Footer')}
    </TableCell>
  );
};

export default FooterCell;
