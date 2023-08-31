import SourceCodeSnippet from '../../components/mdx/SourceCodeSnippet';

const JS = require('!!raw-loader!./JS.js').default;
const TS = require('!!raw-loader!./TS.tsx').default;

export const RemoteExample = () => {
  return (
    <SourceCodeSnippet
      Component={() => (
        <iframe height={900} src="/docs/examples/ssrDemo"></iframe>
      )}
      javaScriptCode={JS}
      typeScriptCode={TS}
    />
  );
};

export default RemoteExample;
