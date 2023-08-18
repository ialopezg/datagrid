import { alpha, Card, Stack, useTheme } from '@mui/material';
import Image from 'next/image';

const cardData = [
  {
    text: 'The perfect mashup of Material-UI and React Table',
    image: '/media/mashup.svg',
    alt: 'Mashup',
  },
  {
    text: 'High quality and performant modern table features with a minimal amount of effort',
    image: '/media/quality.svg',
    alt: 'Quality',
  },
  {
    text: 'Fully customizable with a variety of options',
    image: '/media/customizable.svg',
    alt: 'Customizable',
  },
  {
    text: "Easy to opt out of features or UI that you don't need",
    image: '/media/opt-out.svg',
    alt: 'Easy Opt-out',
  },
  {
    text: 'Efficient bundle size (currently < 12kb gzipped)',
    image: '/media/efficient.svg',
    alt: 'Easy Opt-out',
  },
];

export const HomeCards = () => {
  const theme = useTheme();

  return (
    <Stack sx={{ mt: '2rem', gap: '1rem' }}>
      {cardData.map((cd, index) => (
        <Card
          key={index}
          sx={(theme) => ({
            backgroundColor: alpha(theme.palette.primary.main, 0.1),
            p: '1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '1.5rem',
          })}
          variant="outlined"
        >
          <Image src={cd.image} alt={cd.text} height={50} width={50} />

          {cd.text}
        </Card>
      ))}
    </Stack>
  );
};

export default HomeCards;
