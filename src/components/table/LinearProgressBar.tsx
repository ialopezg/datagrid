import { Collapse, LinearProgress } from '@mui/material';
import React, { FC } from 'react';
import { useDataGrid } from '../providers';

interface LinearProgressBarProps {}

export const LinearProgressBar: FC<LinearProgressBarProps> = () => {
  const {
    isFetching,
    isLoading,
    linearProgressProps: userLinearProgressProps,
    localization,
    table,
  } = useDataGrid();

  const linearProgressProps =
    userLinearProgressProps instanceof Function
      ? userLinearProgressProps(table)
      : userLinearProgressProps;

  return (
    <Collapse in={isFetching || isLoading} unmountOnExit>
      <LinearProgress
        aria-label={localization.loadingData}
        aria-busy={true}
        {...linearProgressProps}
      />
    </Collapse>
  );
};

export default LinearProgressBar;
