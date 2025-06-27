import Box from '@mui/material/Box';

import { Carousel, useCarousel, CarouselDotButtons } from 'src/components/carousel';

import { IndexLabel } from './elements';

// ----------------------------------------------------------------------

export function CarouselScale({ data }) {
  const carousel = useCarousel({ loop: true, slidesToShow: '70%', slideSpacing: '20px' });

  return (
    <>
      <Carousel carousel={carousel}>
        {data.map((item, index) => (
          <CarouselItem
            key={item.id}
            index={index}
            item={item}
            selected={carousel.dots.selectedIndex === index}
          />
        ))}
      </Carousel>

      <CarouselDotButtons
        scrollSnaps={carousel.dots.scrollSnaps}
        selectedIndex={carousel.dots.selectedIndex}
        onClickDot={carousel.dots.onClickDot}
        sx={{ width: 1, justifyContent: 'center', mt: 3 }}
      />
    </>
  );
}

// ----------------------------------------------------------------------

function CarouselItem({ item, index, selected }) {
  return (
    <Box
      sx={[
        (theme) => ({
          borderRadius: 2,
          overflow: 'hidden',
          position: 'relative',
          transform: 'scale(0.88)',
          transition: theme.transitions.create(['transform'], {
            easing: theme.transitions.easing.easeIn,
            duration: theme.transitions.duration.complex,
          }),
          ...(selected && { transform: 'scale(1)' }),
        }),
      ]}
    >
      <IndexLabel index={index + 1} />

      <Box
        component="img"
        alt={item.title}
        src={item.coverUrl}
        sx={{ objectFit: 'cover', aspectRatio: { xs: '4/3', sm: '16/10' } }}
      />
    </Box>
  );
}
