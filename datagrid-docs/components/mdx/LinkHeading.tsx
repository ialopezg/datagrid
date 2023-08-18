import AddLinkIcon from '@mui/icons-material/AddLink';
import LinkIcon from '@mui/icons-material/Link';
import {
  IconButton,
  Tooltip,
  Typography,
  TypographyProps,
} from '@mui/material';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export const LinkHeading = (props: any) => {
  const id = props?.children?.toLowerCase?.()?.replaceAll?.(' ', '-');
  const [href, setHref] = useState('');
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setHref(`${window.location.pathname}#${id}`);
    }
  }, [id]);

  const onCopyAction = () => {
    void navigator.clipboard.writeText(window.location.origin + href);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 3000);
  };

  return (
    <Typography id={id} {...props}>
      {props.children}{' '}
      <Link href={href} passHref>
        <IconButton
          onClick={onCopyAction}
          sx={{
            opacity: 0.2,
            transition: 'all 0.2s ease',
            '&:hover': {
              opacity: 1,
            },
          }}
        >
          <Tooltip arrow title={isCopied ? 'Copied!' : 'Copy Link'}>
            {isCopied ? <AddLinkIcon /> : <LinkIcon />}
          </Tooltip>
        </IconButton>
      </Link>
    </Typography>
  );
};

export default LinkHeading;
