import { muiTheme } from 'storybook-addon-material-ui';

export const parameters = {
  actions: { argTypesRegex: '^on.*' },
  controls: { expanded: true, sort: 'requiredFirst' },
};

export const decorators = [muiTheme()];
