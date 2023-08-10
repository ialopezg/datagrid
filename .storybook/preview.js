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
  backgrounds: {
    values: [
      {
        name: 'white',
        value: '#fff',
      },
      {
        name: 'lightgrey',
        value: '#fafeff',
      },
      {
        name: 'darkgrey',
        value: '#333',
      },
      {
        name: 'black',
        value: '#000',
      },
    ],
  },
  controls: { expanded: true, sort: 'requiredFirst' },
  paddings: {
    values: [
      { name: 'Small', value: '4px' },
      { name: 'Medium', value: '16px' },
      { name: 'Large', value: '64px' },
    ],
    default: 'Medium',
  },
  status: {
    statuses: {
      alpha: {
        background: 'red',
        color: '#ffffff',
        description: 'This feature has some functionality but is not complete',
      },
      beta: {
        background: 'orange',
        color: '#ffffff',
        description: 'This feature is getting close to stable',
      },
      proofOfConcept: {
        background: 'hotpink',
        color: '#ffffff',
        description: 'Probably broken',
      },
      stable: {
        background: 'green',
        color: '#ffffff',
        description: 'Should fully work',
      },
    },
  },
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
            color: useDarkMode() ? '#fff' : '#666',
          }}
        >
          Toggle dark and light mode in the toolbar buttons above
        </Typography>

        <Story {...context} />

        <Typography
          variant="subtitle2"
          style={{ paddingTop: '2rem', color: useDarkMode() ? '#fff' : '#666' }}
        >
          View source code below in the Story tab on Canvas or the Show Code
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
