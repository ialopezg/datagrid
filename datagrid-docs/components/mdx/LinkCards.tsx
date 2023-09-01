import {
  alpha,
  Box,
  Card,
  Typography,
  useTheme,
  Link,
  CardContent,
} from '@mui/material';
import Image from 'next/image';

const cardData = [
  {
    text: 'NPM',
    image: '/media/npm.svg',
    alt: 'npm',
    href: 'https://www.npmjs.com/package/ialopezg/datagrid',
  },
  {
    text: 'Source Code',
    image: '/media/source-code.svg',
    alt: 'source code',
    href: 'https://github.com/ialopezg/datagrid',
  },
  {
    text: 'GitHub Issues',
    image: '/media/github-issues.svg',
    alt: 'github issues',
    href: 'https://github.com/ialopezg/datagrid/issues',
  },
  {
    text: 'Discord',
    image: '/media/discord.svg',
    alt: 'discord',
    href: 'https://discordapp.com/users/ialopezg',
  },
  {
    text: 'Storybook',
    image: '/media/storybook.svg',
    alt: 'storybook examples',
    href: 'https://material-react-table.dev',
  },
];

export const LinkCards = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        mt: '4rem',
        textAlign: 'center',
      }}
    >
      <Typography sx={{ p: '1rem' }} variant="h3">
        Important Links
      </Typography>
      <Box
        sx={{
          p: '1rem 150px 3rem 150px',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '1.5rem',
          '@media(max-width: 900px)': {
            p: '1rem 16px 2rem 16px',
          },
        }}
      >
        {cardData.map((cd, index) => (
          <Link
            key={index}
            href={cd.href}
            target="_blank"
            rel="noopener noreferrer"
            sx={{ textDecoration: 'none' }}
          >
            <Card
              elevation={4}
              sx={(theme) => ({
                borderRadius: '0.5rem',
                color: theme.palette.primary.dark,
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                fontWeight: 'bold',
                gap: '1rem',
                justifyContent: 'center',
                minHeight: '180px',
                p: '1rem',
                textAlign: 'center',
                width: '10rem',
                '&:hover': {
                  boxShadow: `1px 4px 8px ${alpha(
                    theme.palette.primary.dark,
                    0.5,
                  )}`,
                  '& img': {
                    transform: 'scale(1.01)',
                    transition: 'transform 0.2s ease-in-out',
                  },
                },
              })}
            >
              <Image
                src={cd.image}
                alt={cd.text}
                width={60}
                height={60}
                objectFit="scale-down"
              />
              <Typography>{cd.text}</Typography>
            </Card>
          </Link>
        ))}
      </Box>
    </Box>
  );
};

export default LinkCards;
