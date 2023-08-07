import {
  createTheme,
  ThemeProvider as MuiThemeProvider,
  Typography,
} from '@mui/material';
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
      <Typography variant="subtitle2" style={{ paddingTop: '2rem' }}>
        View Source Code Below in the Story Tab or the Show Code Button (in
        Docs)
      </Typography>
    </MuiThemeProvider>
  </ThemeProvider>
);

setConsoleOptions({
  panelExclude: [],
});

const console = (storyFn, context) => withConsole()(storyFn)(context);

export const decorators = [withThemeProvider, withPerformance, console];
