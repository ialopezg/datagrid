import {
  createTheme,
  ThemeProvider as MuiThemeProvider,
  Typography,
} from '@mui/material';
import { ThemeProvider } from '@emotion/react';
import { setConsoleOptions, withConsole } from '@storybook/addon-console';
import { withPerformance } from 'storybook-addon-performance';
import { useDarkMode } from 'storybook-dark-mode';

export const parameters = {
  actions: { argTypesRegex: '^on.*' },
  controls: { expanded: true, sort: 'requiredFirst' },
};

const withThemeProvider = (Story, context) => {
  const defaultTheme = createTheme({
    palette: { mode: useDarkMode() ? 'dark' : 'light' },
  });

  return (
    <ThemeProvider theme={defaultTheme}>
      <MuiThemeProvider theme={defaultTheme}>
        <Typography
          variant="subtitle2"
          style={{
            paddingBottom: '2rem',
            color: useDarkMode() ? '#aaa' : '#666',
          }}
        >
          Toggle Dark and Light Mode in the toolbar buttons above
        </Typography>

        <Story {...context} />

        <Typography
          variant="subtitle2"
          style={{ paddingTop: '2rem', color: useDarkMode() ? '#aaa' : '#666' }}
        >
          View Source Code Below in the Story Tab on Canvas or the Show Code
          Button in Docs
        </Typography>
      </MuiThemeProvider>
    </ThemeProvider>
  );
};

setConsoleOptions({
  panelExclude: [],
});

const console = (storyFn, context) => withConsole()(storyFn)(context);

export const decorators = [withThemeProvider, withPerformance, console];
