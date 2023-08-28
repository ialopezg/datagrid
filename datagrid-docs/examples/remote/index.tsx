import SourceCodeSnippet from '../../components/mdx/SourceCodeSnippet';
import Example from './TS';

const JS = require('!!raw-loader!./JS.js').default;
const TS = require('!!raw-loader!./TS.tsx').default;

export const RemoteExample = () => {
  return (
    <SourceCodeSnippet
      Component={Example}
      javaScriptCode={JS}
      typeScriptCode={TS}
    />
  );
};

export default RemoteExample;
