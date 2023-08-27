import React from 'react';

import SourceCodeSnippet from '../../components/mdx/SourceCodeSnippet';
import Example from './TS';

const JS = require('!!raw-loader!./JS.js').default;
const TS = require('!!raw-loader!./TS.tsx').default;

const AdvancedExample = () => (
  <SourceCodeSnippet
    javaScriptCode={JS}
    typeScriptCode={TS}
    Component={Example}
  />
);

export default AdvancedExample;
