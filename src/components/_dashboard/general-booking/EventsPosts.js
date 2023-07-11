import PropTypes from 'prop-types';
import Slider from 'react-slick';
import { useRef } from 'react';
// import { Icon } from '@iconify/react';
// import roundVpnKey from '@iconify/icons-ic/round-vpn-key';
// import peopleFill from '@iconify/icons-eva/people-fill';
// material
import { useTheme } from '@material-ui/core/styles';
import { Box, Stack, Typography, Paper, CardHeader } from '@material-ui/core';
// utils
import { fDateTime } from '../../../utils/formatTime';
import mockData from '../../../utils/mock-data';
//
// import Label from '../../Label';
import { CarouselControlsArrowsBasic1 } from '../../carousel';

// ----------------------------------------------------------------------

const MOCK_BOOKINGS = [...Array(6)].map((_, index) => ({
  id: mockData.id(index),
  name: mockData.name.fullName(index),
  eventsTitle: mockData.name.eventsTitle(index),
  eventsIMG: mockData.name.eventsIMG(index),
  eventsLink: mockData.name.eventsLink(index),
  avatar: mockData.image.avatar(index),
  bookdAt: mockData.time(index),
  roomNumber: 'A-21',
  roomType: (index === 1 && 'double') || (index === 3 && 'king') || 'single',
  person: '3-5',
  cover: `/static/mock-images/rooms/room-${index + 1}.jpg`
}));

// ----------------------------------------------------------------------

BookingItem.propTypes = {
  item: PropTypes.shape({
    avatar: PropTypes.string,
    bookdAt: PropTypes.instanceOf(Date),
    cover: PropTypes.string,
    name: PropTypes.string,
    eventsTitle: PropTypes.string,
    person: PropTypes.string,
    roomNumber: PropTypes.string,
    roomType: PropTypes.string,
    eventsIMG: PropTypes.string,
    eventsLink: PropTypes.string
  })
};

function BookingItem({ item }) {
  const { bookdAt, eventsTitle, eventsIMG, eventsLink } = item;

  const handleClick = () => {
    window.open(eventsLink, '_blank');
  };

  return (
    <Paper sx={{ mx: 1.5, borderRadius: 2, bgcolor: 'background.neutral', cursor: 'pointer' }} onClick={handleClick}>
      <Box sx={{ p: 1, position: 'relative' }}>
        <Box component="img" src={eventsIMG} sx={{ borderRadius: 1.5, width: 1 }} />
      </Box>
      <Stack spacing={2.5} sx={{ p: 3, pb: 2.5, pt: 1 }}>
        <Stack direction="row" alignItems="center" spacing={2} justifyContent="center">
          <div style={{ textAlign: 'center' }}>
            <Typography variant="subtitle2">{eventsTitle}</Typography>
            <Typography variant="caption" sx={{ color: 'text.disabled', mt: 0.5, display: 'block' }}>
              {fDateTime(bookdAt)}
            </Typography>
          </div>
        </Stack>

        {/* <Stack direction="row" alignItems="center" spacing={3} sx={{ color: 'text.secondary' }}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Icon icon={roundVpnKey} width={16} height={16} />
            <Typography variant="caption">Room {roomNumber}</Typography>
          </Stack>

          <Stack direction="row" alignItems="center" spacing={1}>
            <Icon icon={peopleFill} width={16} height={16} />
            <Typography variant="caption">{person} Person</Typography>
          </Stack>
        </Stack> */}
      </Stack>
    </Paper>
  );
}

export default function EventsPosts() {
  const theme = useTheme();
  const carouselRef = useRef(null);

  const settings = {
    dots: false,
    autoplay: true,
    autoPlaySpeed: '500',
    arrows: false,
    slidesToShow: 4,
    slidesToScroll: 1,
    rtl: Boolean(theme.direction === 'rtl'),
    responsive: [
      {
        breakpoint: theme.breakpoints.values.lg,
        settings: {
          slidesToShow: 3
        }
      },
      {
        breakpoint: theme.breakpoints.values.md,
        settings: {
          slidesToShow: 2
        }
      },
      {
        breakpoint: theme.breakpoints.values.sm,
        settings: {
          slidesToShow: 1
        }
      }
    ]
  };

  const handlePrevious = () => {
    carouselRef.current?.slickPrev();
  };

  const handleNext = () => {
    carouselRef.current?.slickNext();
  };

  return (
    <Box sx={{ py: 2 }}>
      <CardHeader
        title="Our Events"
        action={
          <CarouselControlsArrowsBasic1
            arrowLine
            onNext={handleNext}
            onPrevious={handlePrevious}
            sx={{
              position: 'static',
              '& button': { color: 'text.primary' }
            }}
          />
        }
        sx={{
          p: 0,
          mb: 3,
          '& .MuiCardHeader-action': { alignSelf: 'center' }
        }}
      />

      <Slider ref={carouselRef} {...settings}>
        {MOCK_BOOKINGS.map((item) => (
          <BookingItem key={item.id} item={item} />
        ))}
      </Slider>
    </Box>
  );
}
