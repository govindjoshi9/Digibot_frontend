import { Icon } from '@iconify/react';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import plusFill from '@iconify/icons-eva/plus-fill';
import arrowIosBackFill from '@iconify/icons-eva/arrow-ios-back-fill';
import { LoadingButton } from '@material-ui/lab';
// material
import { Box, Grid, Card, CardHeader, Button, Typography, CircularProgress } from '@material-ui/core';
import { useSnackbar } from 'notistack5';
import closeFill from '@iconify/icons-eva/close-fill';
// redux
import { useDispatch, useSelector } from '../../../../redux/store';
import { onBackStep, onNextStep, createBilling } from '../../../../redux/slices/product';
// utils
import CheckoutSummary from './NFTSummary';
import CheckoutNewAddressForm from './CheckoutNewAddressForm';
import { MIconButton } from '../../../@material-extend';

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

// NFTCheckoutBillingAddress.prototype = {
//   useradress: PropTypes.string
// };

export default function NFTCheckoutBillingAddress() {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const { checkout } = useSelector((state) => state.product);
  const { total, discount, subtotal } = checkout;
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const { ethereum } = window;
  const walletConnectStatus = localStorage.getItem('walletConnect') || '';
  // const [web3, setWeb3] = useState({});

  useEffect(() => {
    if (walletConnectStatus === '' || !ethereum) {
      enqueueSnackbar('Please Install and connect Wallet', {
        variant: 'error',
        action: (key) => (
          <MIconButton size="small" onClick={() => closeSnackbar(key)}>
            <Icon icon={closeFill} />
          </MIconButton>
        )
      });
    } else if (ethereum && walletConnectStatus === '') {
      console.log('working');
    }
    if (ethereum) {
      window.ethereum.on('chainChanged', () => {
        window.location.reload();
      });
    }
  }, []);

  const handleClickOpen = () => {
    // setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleNextStep = () => {
    dispatch(onNextStep());
  };

  const handleBackStep = () => {
    dispatch(onBackStep());
  };
  const onHandleContinue = () => {
    if (address === '') {
      console.log('windos', window.userAddress);
      enqueueSnackbar('Please Install and connect Wallet', {
        variant: 'error',
        action: (key) => (
          <MIconButton size="small" onClick={() => closeSnackbar(key)}>
            <Icon icon={closeFill} />
          </MIconButton>
        )
      });
    } else {
      dispatch(onNextStep());
    }
  };

  const handleCreateBilling = (value, useradress) => {
    value = {
      addressType: useradress,
      fullAddress: '19034 Verna Unions Apt. 164 - Honolulu, RI / 87535',
      id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b1',
      isDefault: true,
      phone: '365-374-4961',
      receiver: 'Jayvion Simon'
    };
    if (window.ethereum) {
      try {
        window.ethereum
          .request({
            method: 'eth_requestAccounts'
          })
          .then(async (address) => {
            // eslint-disable-next-line prefer-destructuring
            window.userAddress = address[0];
            setAddress(address[0]);
            enqueueSnackbar('Wallet connected', {
              variant: 'success',
              action: (key) => (
                <MIconButton size="small" onClick={() => closeSnackbar(key)}>
                  <Icon icon={closeFill} />
                </MIconButton>
              )
            });

            dispatch(createBilling(value));
          });
        setLoading(false);
      } catch (error) {
        console.log(error);
        if (error.code === 4001) {
          console.log(error);
        }
      }
    } else {
      enqueueSnackbar('Please Install and connect wallet', {
        variant: 'error',
        action: (key) => (
          <MIconButton size="small" onClick={() => closeSnackbar(key)}>
            <Icon icon={closeFill} />
          </MIconButton>
        )
      });
    }
  };

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card sx={{ mb: 3, position: 'relative' }}>
            <CardHeader title="Connect wallet and proceed" />

            <Box sx={{ mt: 1, mb: 1, display: 'flex', alignItems: 'center', pl: 3 }}>
              <Typography variant="subtitle1">receiver</Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                &nbsp;{address}
              </Typography>
            </Box>
            <Typography variant="body2" gutterBottom sx={{ pl: 3 }}>
              {loading ? <CircularProgress /> : address}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', p: 3 }}>
              phone
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', p: 2, pl: 3 }}>
              Metamask
            </Typography>

            <Box
              sx={{
                mt: 3,
                display: 'flex',
                position: { sm: 'absolute' },
                right: { sm: 24 },
                bottom: { sm: 24 }
              }}
            >
              <Box sx={{ mx: 0.5 }} />
              <Button variant="outlined" size="small" onClick={handleCreateBilling}>
                Connect Wallet
              </Button>
            </Box>
          </Card>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button size="small" color="inherit" onClick={handleBackStep} startIcon={<Icon icon={arrowIosBackFill} />}>
              Back
            </Button>
            <Button size="small" onClick={handleClickOpen} startIcon={<Icon icon={plusFill} />}>
              Add new address
            </Button>
          </Box>
        </Grid>

        <Grid item xs={12} md={4}>
          <CheckoutSummary subtotal={subtotal} total={total} discount={discount} />
          <LoadingButton fullWidth sx={{ mb: 2 }} size="large" variant="contained" onClick={onHandleContinue}>
            Countinue
          </LoadingButton>
        </Grid>
      </Grid>

      <CheckoutNewAddressForm
        open={open}
        onClose={handleClose}
        onNextStep={handleNextStep}
        onCreateBilling={handleCreateBilling}
      />
    </>
  );
}
