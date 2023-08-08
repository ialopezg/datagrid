import {
  alpha,
  CircularProgress,
  LinearProgress,
  Paper,
  styled,
  TableContainer,
} from '@mui/material';
import React, { FC } from 'react';

import Table from './Table';
import { useDataGrid } from '../providers';
import ToolbarBottom from '../toolbar/ToolbarBottom';
import ToolbarTop from '../toolbar/ToolbarTop';

const CircularProgressWrapper = styled('div')(({ theme }) => ({
  alignItems: 'center',
  backgroundColor: alpha(theme.palette.background.paper, 0.5),
  display: 'grid',
  height: '100%',
  justifyContent: 'center',
  margin: 'auto',
  paddingTop: '5rem',
  position: 'absolute',
  width: 'calc(100% - 2rem)',
}));

interface ContainerProps {}

export const Container: FC<ContainerProps> = () => {
  const {
    containerProps,
    hideToolbarBottom,
    hideToolbarTop,
    isLoading,
    isFetching,
    localization,
  } = useDataGrid();

  return (
    <TableContainer component={Paper} {...containerProps}>
      {!hideToolbarTop && <ToolbarTop />}

      {isFetching && <LinearProgress />}

      {isLoading && (
        <CircularProgressWrapper>
          <CircularProgress
            aria-busy="true"
            aria-label={localization?.loadingData}
          />
        </CircularProgressWrapper>
      )}

      <Table />
      {!hideToolbarBottom && <ToolbarBottom />}
    </TableContainer>
  );
};

export default Container;
