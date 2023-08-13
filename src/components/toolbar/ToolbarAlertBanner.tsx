import { Alert, Chip, Collapse, styled, useMediaQuery } from '@mui/material';
import React, { FC, Fragment } from 'react';

const StyledAlert = styled(Alert, {
  shouldForwardProp: (prop) =>
    prop !== 'displayAbsolute' && prop !== 'toolbarPosition',
})<{
  displayAbsolute?: boolean;
  toolbarPosition?: 'top' | 'bottom';
}>(({ displayAbsolute, toolbarPosition }) => ({
  borderRadius: 0,
  fontSize: '1rem',
  left: 0,
  marginLeft: !displayAbsolute ? '-0.5rem' : undefined,
  padding: toolbarPosition === 'bottom' ? '0 1rem' : '0.5rem 1.25rem',
  position: displayAbsolute ? 'absolute' : 'relative',
  right: 0,
  top: 0,
  width: `calc(100% - ${displayAbsolute ? '2.5rem' : '1.5rem'})`,
  zIndex: 2,
}));

import { useDataGrid } from '../providers';

interface ToolbarAlertBannerProps {}

export const ToolbarAlertBanner: FC<ToolbarAlertBannerProps> = () => {
  const {
    customToolbarActions,
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
              label={
                table.allColumns.find((column) => column.id === columnId)
                  ?.Header
              }
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
    (toolbarAlertBannerPosition === 'top' && !!customToolbarActions)
  );
  return (
    <Collapse
      in={!!selectMessage || !!groupedMessage}
      timeout={displayAbsolute ? 0 : 200}
    >
      <StyledAlert
        color="info"
        displayAbsolute={displayAbsolute}
        icon={false}
        {...alertProps}
      >
        {selectMessage}
        {groupedMessage}
      </StyledAlert>
    </Collapse>
  );
};

export default ToolbarAlertBanner;
