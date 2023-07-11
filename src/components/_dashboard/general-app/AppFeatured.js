/* eslint-disable camelcase */
/* eslint-disable import/no-unresolved */
import Slider from 'react-slick';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { getProfile } from 'src/redux/slices/user';
import { useDispatch, useSelector } from 'src/redux/store';
// material
import { useTheme, styled } from '@material-ui/core/styles';
import { CardContent, Box, Card, Typography } from '@material-ui/core';
// utils
import { PATH_DASHBOARD } from '../../../routes/paths';
import { varFadeInRight, MotionContainer } from '../../animate';
import { CarouselControlsPaging1, CarouselControlsArrowsBasic1 } from '../../carousel';

// ----------------------------------------------------------------------

const CarouselImgStyle = styled('img')(({ theme }) => ({
  height: 280,
  width: '100%',
  objectFit: 'cover',
  [theme.breakpoints.up('xl')]: {
    height: 320
  }
}));

// ----------------------------------------------------------------------

CarouselItem.propTypes = {
  item: PropTypes.object,
  isActive: PropTypes.bool
};

function CarouselItem({ item, isActive }) {
  const { record_no, nftImage, nftName, planAmt } = item;
  const linkTo = `${PATH_DASHBOARD.nftMarket.root}/product/${record_no}`;

  return (
    <RouterLink to={linkTo}>
      <Box sx={{ position: 'relative' }}>
        <Box
          sx={{
            top: 0,
            width: 1,
            height: 1,
            position: 'absolute'
          }}
        />
        <CarouselImgStyle alt={nftName} src={`/static/mock-images/products/${nftImage}`} />
        <CardContent
          sx={{
            bottom: 0,
            width: 1,
            textAlign: 'left',
            position: 'absolute',
            color: 'common.white',
            bgcolor: '#171b0d2b',
            padding: '10px'
          }}
        >
          <MotionContainer open={isActive}>
            <motion.div variants={varFadeInRight}>
              <Typography variant="h5" gutterBottom noWrap>
                {nftName}
              </Typography>
            </motion.div>
            <motion.div variants={varFadeInRight}>
              <Typography variant="body2" noWrap>
                {planAmt}$
              </Typography>
            </motion.div>
          </MotionContainer>
        </CardContent>
      </Box>
    </RouterLink>
  );
}

AppFeatured.propTypes = {
  nft3: PropTypes.array
};

export default function AppFeatured({ nft3 }) {
  const theme = useTheme();
  const carouselRef = useRef();
  const [currentIndex, setCurrentIndex] = useState(theme.direction === 'rtl' ? nft3?.length - 1 : 0);

  const settings = {
    speed: 800,
    dots: true,
    arrows: false,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    rtl: Boolean(theme.direction === 'rtl'),
    beforeChange: (current, next) => setCurrentIndex(next),
    ...CarouselControlsPaging1({
      color: 'primary.main',
      sx: {
        top: theme.spacing(3),
        left: theme.spacing(3),
        bottom: 'auto',
        right: 'auto'
      }
    })
  };

  const handlePrevious = () => {
    carouselRef.current.slickPrev();
  };

  const handleNext = () => {
    carouselRef.current.slickNext();
  };

  return (
    <Card>
      <Slider ref={carouselRef} {...settings}>
        {nft3?.map((app, index) => (
          <CarouselItem key={app.record_no} item={app} isActive={index === currentIndex} />
        ))}
      </Slider>

      <CarouselControlsArrowsBasic1 onNext={handleNext} onPrevious={handlePrevious} />
    </Card>
  );
}
