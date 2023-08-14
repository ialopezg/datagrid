import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import LibraryAddCheckIcon from '@mui/icons-material/LibraryAddCheck';
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';
import UnfoldLessIcon from '@mui/icons-material/UnfoldLess';
import {
  Divider,
  IconButton,
  styled,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import vsDark from 'prism-react-renderer/themes/vsDark';
import vsLight from 'prism-react-renderer/themes/github';
import Highlight, { defaultProps } from 'prism-react-renderer';
import React, { FC, useEffect, useState } from 'react';

const CopyButton = styled(IconButton)({
  position: 'absolute',
  top: '0.5rem',
  right: '0.5rem',
});

export interface SourceCodeSnippetProps {
  typeScriptCode: string;
  javaScriptCode: string;
  Component: FC;
}

const ToggleFullCodeButton = styled(IconButton)({
  position: 'absolute',
  top: '0.5rem',
  right: '3.5rem',
});

export const SourceCodeSnippet: FC<SourceCodeSnippetProps> = ({
  typeScriptCode,
  javaScriptCode,
  Component,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery('(max-width: 720px)');

  const [typeScripMode, setTypeScriptMode] = useState<boolean>(true);
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [isFullCode, setIsFullCode] = useState<boolean>(false);

  let skipCodeLine = false;

  useEffect(
    () => setTypeScriptMode(localStorage.getItem('typeScripMode') === 'true'),
    [],
  );

  useEffect(
    () => localStorage.setItem('typeScripMode', typeScripMode.toString()),
    [typeScripMode],
  );

  const onCopyAction = () => {
    navigator.clipboard.writeText(
      typeScripMode ? typeScriptCode : javaScriptCode,
    );
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 3000);
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        margin: '1rem auto',
      }}
    >
      <Divider />
      <Typography variant="h3">Demo</Typography>
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
            <div
              style={{
                position: 'relative',
                fontSize: isMobile ? '1em' : '1.2em',
              }}
            >
              <Tooltip arrow title={isCopied ? 'Copied!' : 'Copy Code'}>
                <CopyButton onClick={onCopyAction}>
                  {isCopied ? <LibraryAddCheckIcon /> : <ContentCopyIcon />}
                </CopyButton>
              </Tooltip>
              <Tooltip
                arrow
                title={
                  isFullCode
                    ? 'Hide columns and data definitions'
                    : 'Show columns and data definitions'
                }
              >
                <ToggleFullCodeButton
                  onClick={() => setIsFullCode(!isFullCode)}
                >
                  {isFullCode ? <UnfoldLessIcon /> : <UnfoldMoreIcon />}
                </ToggleFullCodeButton>
              </Tooltip>

              <pre
                className={className}
                style={{
                  ...style,
                  padding: isMobile
                    ? '3rem 0.5rem 1rem 0.5rem'
                    : '0.5rem 0.25rem',
                  whiteSpace: 'pre-wrap',
                }}
              >
                {tokens.map((line, index) => (
                  <div
                    key={index}
                    {...getLineProps({ line, key: index })}
                    style={{
                      ...style,
                      display: !isFullCode && skipCodeLine ? 'none' : 'block',
                    }}
                  >
                    {!isMobile && (
                      <span
                        style={{
                          paddingRight: '2ch',
                          paddingLeft: `${4 - String(index + 1).length}ch`,
                          color: theme.palette.text.secondary,
                        }}
                      >
                        {index + 1}
                      </span>
                    )}
                    {line.map((token, key) => {
                      if (
                        token.content === '//column definitions...' ||
                        token.content === '//data definitions...'
                      ) {
                        skipCodeLine = true;
                        if (isFullCode) {
                          return null;
                        }
                      } else if (token.content === '//end') {
                        skipCodeLine = false;
                        return null;
                      }

                      return (
                        <span key={key} {...getTokenProps({ token, key })} />
                      );
                    })}
                  </div>
                ))}
              </pre>
            </div>
          )}
        </Highlight>
      </div>
      <Divider />
    </div>
  );
};

export default SourceCodeSnippet;
