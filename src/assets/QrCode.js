import PropTypes from 'prop-types';
// material
import { Box, Typography } from '@material-ui/core';
import { useRef, useEffect } from 'react';
// ----------------------------------------------------------------------

SeoIllustration.propTypes = {
  sx: PropTypes.object.isRequired,
  qrCode: PropTypes.object.isRequired,
  fileExt: PropTypes.string.isRequired
};

export default function SeoIllustration({ sx, qrCode, fileExt }) {
  const ref = useRef(null);
  const onDownloadClick = () => {
    // eslint-disable-next-line react/prop-types
    qrCode.download({
      extension: fileExt
    });
  };
  useEffect(() => {
    // eslint-disable-next-line react/prop-types
    qrCode.append(ref.current);
  }, [qrCode]);
  return (
    <Box {...sx} sx={{ margin: 'auto' }}>
      {/* <img src="/qrcodes/qrcode.png" alt="" style={{ maxWidth: '160px', margin: 'auto' }} /> */}
      <div style={{ maxWidth: '160px', margin: 'auto', borderRadius: '14px' }}>
        <div ref={ref} style={{ maxWidth: '160px', margin: 'auto' }} />
      </div>
      <Typography
        variant="caption"
        underline="always"
        sx={{
          pt: { xs: 2, xl: 4 },
          maxWidth: 480,
          mx: 'auto',
          textAlign: 'center',
          display: 'flex',
          cursor: 'pointer',
          justifyContent: 'center'
        }}
        onClick={() => onDownloadClick()}
      >
        Share to friends or <span style={{ textDecoration: 'underline', ml: 2 }}> Download QR </span>
      </Typography>
    </Box>
  );
}
