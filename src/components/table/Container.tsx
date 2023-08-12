import MuiTableContainer from '@mui/material/TableContainer';
import {
  alpha,
  CircularProgress,
  LinearProgress,
  Paper,
  styled,
} from '@mui/material';
import React, { FC } from 'react';

import Table from './Table';
import { useDataGrid } from '../providers';
import ToolbarBottom from '../toolbar/ToolbarBottom';
import ToolbarTop from '../toolbar/ToolbarTop';

const TableContainer = styled(MuiTableContainer, {
  shouldForwardProp: (prop) => prop !== 'fullScreen',
})<{ fullScreen?: boolean; component?: any }>(({ fullScreen }) => ({
  bottom: fullScreen ? '0' : undefined,
  height: fullScreen ? '100%' : undefined,
  left: fullScreen ? '0' : undefined,
  margin: fullScreen ? '0' : undefined,
  position: fullScreen ? 'fixed' : undefined,
  right: fullScreen ? '0' : undefined,
  top: fullScreen ? '0' : undefined,
  transition: 'all 0.2s ease-in-out',
  width: fullScreen ? '100vw' : undefined,
  zIndex: fullScreen ? 1200 : 1,
}));

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
    containerProps: defaultContainerProps,
    fullScreen,
    hideToolbarBottom,
    hideToolbarTop,
    isFetching,
    isLoading,
    localization,
    table,
  } = useDataGrid();

  const containerProps =
    defaultContainerProps instanceof Function
      ? defaultContainerProps(table)
      : defaultContainerProps;

  return (
    <TableContainer
      component={Paper}
      fullScreen={fullScreen}
      {...containerProps}
    >
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
