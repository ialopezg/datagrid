import React from 'react';

import { SourceCodeSnippet } from '../../components/mdx/SourceCodeSnippet';
import Example from './TS';

const JS = require('!!raw-loader!./JS.js').default;
const TS = require('!!raw-loader!./TS.tsx').default;

const MinimalExample = () => {
  return (
    <SourceCodeSnippet
      typeScriptCode={JS}
      javaScriptCode={TS}
      Component={Example}
    />
  );
};

export default MinimalExample;
