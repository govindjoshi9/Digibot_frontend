import PropTypes from 'prop-types';
import { useState, useEffect, useRef } from 'react';
import QRCodeStyling from 'qr-code-styling';
import { useSnackbar } from 'notistack5';
import { Link as RouterLink } from 'react-router-dom';

// material
import closeFill from '@iconify/icons-eva/close-fill';
import { Icon } from '@iconify/react';
import { styled } from '@material-ui/core/styles';
import { Box, Typography, Button, Card, CardContent } from '@material-ui/core';
import { QrCode } from '../../../assets';
// import CopyClipboard from '../../../components/CopyClipboard';
import { MIconButton } from '../../@material-extend';
// ----------------------------------------------------------------------

const qrCode = new QRCodeStyling({
  width: 160,
  height: 160,
  image: '/favicon/android-chrome-192x192.png',
  dotsOptions: {
    color: '#000',
    type: 'extra-rounded'
  },
  imageOptions: {
    crossOrigin: 'anonymous',
    margin: 0
  }
});

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  textAlign: 'center',
  backgroundColor: theme.palette.primary.lighter,
  [theme.breakpoints.up('md')]: {
    height: '100%',
    display: 'flex',
    textAlign: 'left',
    alignItems: 'center',
    justifyContent: 'space-between'
  }
}));
const URL = '/qrcodes/qrcode.png';

// ----------------------------------------------------------------------

AppWelcome.propTypes = {
  displayName: PropTypes.string,
  memberUserId: PropTypes.string
};

export default function AppWelcome({ displayName, memberUserId }) {
  const [url] = useState(`https://xpic.live/xPicUApp/Signup?UplineId=${memberUserId}`);
  const ref = useRef(null);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [qrCodeData, setQrCodeData] = useState(null);

  useEffect(() => {
    qrCode.update({
      data: url
    });
  }, [url]);

  const onCopyClick = () => {
    try {
      navigator.clipboard.writeText(`https://xpic.live/xPicUApp/Signup?UplineId=${memberUserId}`);
      enqueueSnackbar('Copied', {
        variant: 'success',
        action: (key) => (
          <MIconButton size="small" onClick={() => closeSnackbar(key)}>
            <Icon icon={closeFill} />
          </MIconButton>
        )
      });
    } catch (error) {
      const tempItem = document.createElement('input');

      tempItem.setAttribute('type', 'text');
      tempItem.setAttribute('display', 'none');
      const content = `https://xpic.live/xPicUApp/Signup?UplineId=${memberUserId}`;
      tempItem.setAttribute('value', content);
      document.body.appendChild(tempItem);

      tempItem.select();
      document.execCommand('Copy');

      tempItem.parentElement.removeChild(tempItem);
      enqueueSnackbar('Copied', {
        variant: 'success',
        action: (key) => (
          <MIconButton size="small" onClick={() => closeSnackbar(key)}>
            <Icon icon={closeFill} />
          </MIconButton>
        )
      });
    }
  };

  return (
    <RootStyle>
      <CardContent
        sx={{
          p: { md: 0 },
          pl: { md: 5 },
          color: 'grey.800'
        }}
      >
        <Box>
          <Typography gutterBottom variant="h5">
            Welcome back,
          </Typography>
          <Typography gutterBottom variant="h3">
            {!displayName ? '...' : displayName}!
          </Typography>
        </Box>

        <Typography
          variant="body2"
          sx={{
            maxWidth: 480,
            pb: '10px',
            textDecoration: 'underline',
            mr: 'auto',
            ml: { xs: 'auto', md: '0' }
          }}
        >
          Referral link <br /> https://xpic.live/xPicUApp/Signup?UplineId={memberUserId}
        </Typography>
        <Button variant="contained" to="#" component={RouterLink} sx={{ mt: 1 }} onClick={() => onCopyClick()}>
          Copy
        </Button>
        <Typography variant="caption" underline="always" sx={{ mt: { xs: 4, xl: 5 }, maxWidth: 480, mx: 'auto' }}>
          <br /> Terms and conditions of sale and distribution
        </Typography>
      </CardContent>
      <QrCode
        sx={{
          p: 3,
          maxWidth: 360,
          margin: { xs: 'auto', md: 'inherit' }
        }}
        URL={URL}
        qrCode={qrCode}
        fileExt="png"
        onQrCodeGenerated={(data) => setQrCodeData(data)}
      />
      {qrCodeData && <img src={qrCodeData} alt="QR Code" />}
    </RootStyle>
  );
}
