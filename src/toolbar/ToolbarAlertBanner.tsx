import { Alert, Box, Chip, Collapse, useMediaQuery } from '@mui/material';
import React, { FC, Fragment } from 'react';

import { useDataGrid } from '../providers';

interface ToolbarAlertBannerProps {}

export const ToolbarAlertBanner: FC<ToolbarAlertBannerProps> = () => {
  const {
    toolbarCustomActions,
    localization,
    table,
    toolbarActionsPosition,
    toolbarAlertBannerPosition,
    toolbarAlertBannerProps,
  } = useDataGrid();

  const isMobile = useMediaQuery('(max-width: 720px)');

  const alertProps =
    toolbarAlertBannerProps instanceof Function
      ? toolbarAlertBannerProps(table)
      : toolbarAlertBannerProps;

  const selectMessage =
    table.selectedFlatRows.length > 0
      ? localization.selectionMessage
          ?.replace('{selectedCount}', String(table.selectedFlatRows.length))
          ?.replace('{rowCount}', String(table.flatRows.length))
      : null;
  const groupedMessage =
    table.state.groupBy.length > 0 ? (
      <span>
        {localization.groupedBy}{' '}
        {table.state.groupBy.map((columnId, index) => (
          <Fragment key={`${index}-${columnId}`}>
            {index > 0 ? localization.thenByMessage : ''}
            <Chip
              color="secondary"
              label={String(
                table.allColumns.find((column) => column.id === columnId)
                  ?.Header,
              )}
              onDelete={() => table.toggleGroupBy(columnId, false)}
            />
          </Fragment>
        ))}
      </span>
    ) : null;

  const displayAbsolute = !(
    isMobile ||
    (toolbarAlertBannerPosition === 'bottom' &&
      toolbarActionsPosition === 'bottom') ||
    (toolbarAlertBannerPosition === 'top' && !!toolbarCustomActions)
  );
  return (
    <Collapse
      in={!!selectMessage || !!groupedMessage}
      timeout={displayAbsolute ? 0 : 200}
    >
      <Alert
        color="info"
        icon={false}
        sx={{
          borderRadius: 0,
          fontSize: '1rem',
          left: 0,
          p: 0,
          position: displayAbsolute ? 'absolute' : 'relative',
          right: 0,
          minHeight: '3.5rem',
          top: 0,
          width: '100%',
          zIndex: 2,
          ...alertProps?.sx,
        }}
        {...alertProps}
      >
        <Box sx={{ p: '0.5rem 1rem' }}>
          {selectMessage}
          {groupedMessage}
        </Box>
      </Alert>
    </Collapse>
  );
};

export default ToolbarAlertBanner;
