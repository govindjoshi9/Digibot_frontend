/* eslint-disable camelcase */
/* eslint-disable import/no-unresolved */
import PropTypes from 'prop-types';
import Slider from 'react-slick';
import { Link as RouterLink } from 'react-router-dom';
// material
import { useTheme, styled } from '@material-ui/core/styles';
import { Box, Card, Button, CardContent, Typography } from '@material-ui/core';
// utils
//
import { PATH_DASHBOARD } from '../../../routes/paths';
import { CarouselControlsPaging1 } from '../../carousel';

// ----------------------------------------------------------------------
const CarouselImgStyle = styled('img')(({ theme }) => ({
  width: '100%',
  height: 280,
  objectFit: 'cover',
  [theme.breakpoints.up('xl')]: {
    height: 320
  }
}));

// ----------------------------------------------------------------------

CarouselItem.propTypes = {
  item: PropTypes.shape({
    nftName: PropTypes.string,
    nftImage: PropTypes.string,
    record_no: PropTypes.number,
    planAmt: PropTypes.number
  })
};

function CarouselItem({ item }) {
  const { record_no, nftImage, nftName, planAmt } = item;
  const linkTo = `${PATH_DASHBOARD.nftMarket.root}/product/${record_no}`;

  return (
    <Box sx={{ position: 'relative' }}>
      <CarouselImgStyle alt={nftName} src={`/static/mock-images/products/${nftImage}`} />
      <Box
        sx={{
          top: 0,
          width: '100%',
          height: '100%',
          position: 'absolute'
        }}
      />
      <CardContent
        sx={{
          left: 0,
          bottom: 0,
          maxWidth: '80%',
          textAlign: 'left',
          position: 'absolute',
          color: 'common.white'
        }}
      >
        <Typography variant="overline" sx={{ opacity: 0.48 }}>
          {planAmt}$
        </Typography>
        <Typography noWrap variant="h5" sx={{ mt: 1, mb: 3 }}>
          {nftName}
        </Typography>
        <Button to={linkTo} variant="contained" component={RouterLink}>
          Buy Now
        </Button>
      </CardContent>
    </Box>
  );
}

EcommerceNewProducts.propTypes = {
  myProfile: PropTypes.object
};

export default function EcommerceNewProducts({ myProfile }) {
  const theme = useTheme();

  const settings = {
    speed: 1000,
    dots: true,
    arrows: false,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    rtl: Boolean(theme.direction === 'rtl'),
    ...CarouselControlsPaging1({ color: 'primary.main' })
  };

  return (
    <Card>
      <Slider {...settings}>
        {myProfile?.nft5?.map((item) => (
          <CarouselItem key={item.record_no} item={item} />
        ))}
      </Slider>
    </Card>
  );
}
