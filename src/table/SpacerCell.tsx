import { TableCell, TableCellProps } from '@mui/material';
import React, { CSSProperties, FC } from 'react';
import { useDataGrid } from '../providers';

interface SpacerCellProps {
  width?: CSSProperties['width'];
}

export const SpacerCell: FC<SpacerCellProps> = ({ width }) => {
  const { bodyCellProps: defaultBodyCellProps } = useDataGrid();

  const tableCellProps =
    defaultBodyCellProps instanceof Function
      ? defaultBodyCellProps()
      : (defaultBodyCellProps as TableCellProps);
  const bodyCellProps = {
    ...tableCellProps,
    style: {
      ...tableCellProps?.style,
    },
  };

  return <TableCell {...bodyCellProps} sx={{ width, ...tableCellProps?.sx }} />;
};

export default SpacerCell;
