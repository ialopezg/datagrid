import { TableCell, TableCellProps } from '@mui/material';
import React, { CSSProperties, FC } from 'react';
import { useDataGrid } from '../providers';

interface SpacerCellProps {
  width?: CSSProperties['width'];
}

export const SpacerCell: FC<SpacerCellProps> = ({ width }) => {
  const { bodyCellProps: defaultBodyCellProps } = useDataGrid();

  const cellProps =
    defaultBodyCellProps instanceof Function
      ? defaultBodyCellProps()
      : (defaultBodyCellProps as TableCellProps);
  const bodyCellProps = {
    ...cellProps,
    style: {
      width,
      ...(cellProps?.style ?? {}),
    },
  };

  return <TableCell {...bodyCellProps} />;
};

export default SpacerCell;
