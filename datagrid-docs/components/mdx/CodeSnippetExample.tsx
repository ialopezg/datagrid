import {
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  useTheme,
} from '@mui/material';
import vsDark from 'prism-react-renderer/themes/vsDark';
import vsLight from 'prism-react-renderer/themes/github';
import Highlight, { defaultProps } from 'prism-react-renderer';
import React, { FC, useState } from 'react';

export interface CodeSnippetExampleProps {
  typeScriptCode: string;
  javaScriptCode: string;
  Component: FC;
}

export const CodeSnippetExample: FC<CodeSnippetExampleProps> = ({
  typeScriptCode,
  javaScriptCode,
  Component,
}) => {
  const theme = useTheme();
  const [typeScripMode, setTypeScriptMode] = useState<boolean>(true);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        margin: '1rem auto',
      }}
    >
      <Component />

      <div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <Typography variant="h4">Source Code</Typography>
          <ToggleButtonGroup>
            <ToggleButton onClick={() => setTypeScriptMode(false)} value="js">
              JS
            </ToggleButton>
            <ToggleButton onClick={() => setTypeScriptMode(true)} value="ts">
              TS
            </ToggleButton>
          </ToggleButtonGroup>
        </div>
        <Highlight
          {...defaultProps}
          code={typeScripMode ? typeScriptCode : javaScriptCode}
          language={typeScripMode ? 'tsx' : 'jsx'}
          theme={theme.palette.mode === 'dark' ? vsDark : vsLight}
        >
          {({ className, getLineProps, getTokenProps, style, tokens }) => (
            <pre className={className}>
              {tokens.map((line, index) => (
                <div
                  key={index}
                  {...getLineProps({ line, key: index })}
                  style={style}
                >
                  <span
                    style={{
                      padding: '0 12px',
                      color: theme.palette.text.secondary,
                    }}
                  >
                    {index + 1}
                  </span>
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token, key })} />
                  ))}
                </div>
              ))}
            </pre>
          )}
        </Highlight>
      </div>
    </div>
  );
};

export default CodeSnippetExample;
