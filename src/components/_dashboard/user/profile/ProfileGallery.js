import { findIndex } from 'lodash';
import PropTypes from 'prop-types';
import { useState } from 'react';
// material
import { styled } from '@material-ui/core/styles';
import { Box, Grid, Card, Typography } from '@material-ui/core';
// utils
import LightboxModal from '../../../LightboxModal';

// ----------------------------------------------------------------------

const GalleryImgStyle = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute'
});

// ----------------------------------------------------------------------

GalleryItem.propTypes = {
  image: PropTypes.object,
  onOpenLightbox: PropTypes.func
};

function GalleryItem({ image, onOpenLightbox }) {
  const { nftToken } = image;
  return (
    <Card sx={{ pt: '100%', cursor: 'pointer' }}>
      <GalleryImgStyle
        alt="gallery image"
        src={`/static/mock-images/products/${nftToken}`}
        onClick={() => onOpenLightbox(nftToken)}
      />
    </Card>
  );
}

ProfileGallery.propTypes = {
  gallery: PropTypes.array.isRequired
};

export default function ProfileGallery({ gallery }) {
  console.log(gallery);
  const [openLightbox, setOpenLightbox] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const imagesLightbox = gallery.map((img) => `/static/mock-images/products/${img.nftToken}`);

  const handleOpenLightbox = (url) => {
    const selectedImage = findIndex(imagesLightbox, (index) => index === `/static/mock-images/products/${url}`);
    setOpenLightbox(true);
    setSelectedImage(selectedImage);
  };

  return (
    <Box sx={{ mt: 5 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Portfolio
      </Typography>

      <Card sx={{ p: 3 }}>
        <Grid container spacing={3}>
          {gallery.map((image) => (
            <Grid key={image.record_no} item xs={12} sm={6} md={4}>
              <GalleryItem image={image} onOpenLightbox={handleOpenLightbox} />
            </Grid>
          ))}
        </Grid>

        <LightboxModal
          images={imagesLightbox}
          photoIndex={selectedImage}
          setPhotoIndex={setSelectedImage}
          isOpen={openLightbox}
          onClose={() => setOpenLightbox(false)}
        />
      </Card>
    </Box>
  );
}
