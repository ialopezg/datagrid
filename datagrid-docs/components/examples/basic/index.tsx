import CodeSnippetExample from '../../mdx/CodeSnippetExample';
import BasicExampleWidget from './BasicExample';

const BasicExampleJS = require('!!raw-loader!./BasicExample.js').default;
const BasicExampleTS = require('!!raw-loader!./BasicExample.tsx').default;

const BasicExample = () => (
  <CodeSnippetExample
    javaScriptCode={BasicExampleJS}
    typeScriptCode={BasicExampleTS}
    Component={BasicExampleWidget}
  />
);

export default BasicExample;
