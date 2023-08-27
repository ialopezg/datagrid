import React from 'react';

import SourceCodeSnippet from '../../components/mdx/SourceCodeSnippet';
import Example from './TS';

const BasicExampleJS = require('!!raw-loader!./JS.js').default;
const BasicExampleTS = require('!!raw-loader!./TS.tsx').default;

const BasicExample = () => (
  <SourceCodeSnippet
    javaScriptCode={BasicExampleJS}
    typeScriptCode={BasicExampleTS}
    Component={Example}
  />
);

export default BasicExample;
