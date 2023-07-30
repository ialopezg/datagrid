import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material';
import { ThemeProvider } from '@emotion/react';
import { withPerformance } from 'storybook-addon-performance';
import { setConsoleOptions, withConsole } from '@storybook/addon-console';

export const parameters = {
  actions: { argTypesRegex: '^on.*' },
  controls: { expanded: true, sort: 'requiredFirst' },
};

const defaultTheme = createTheme();

const withThemeProvider = (Story, context) => (
  <ThemeProvider theme={defaultTheme}>
    <MuiThemeProvider theme={defaultTheme}>
      <Story {...context} />
    </MuiThemeProvider>
  </ThemeProvider>
);

setConsoleOptions({
  panelExclude: [],
});

const console = (storyFn, context) => withConsole()(storyFn)(context);

export const decorators = [withThemeProvider, withPerformance, console];
