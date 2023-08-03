import { TableCell } from '@mui/material';
import React, { CSSProperties, FC } from 'react';

interface SpacerCellProps {
  width?: CSSProperties['width'];
}

export const SpacerCell: FC<SpacerCellProps> = ({ width }) => {
  return <TableCell style={{ width }} />;
};

export default SpacerCell;
