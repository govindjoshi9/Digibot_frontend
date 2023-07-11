import { Icon } from '@iconify/react';
import { useState, useEffect } from 'react';
import plusFill from '@iconify/icons-eva/plus-fill';
import arrowIosBackFill from '@iconify/icons-eva/arrow-ios-back-fill';
// material
import { Box, Grid, Card, Button, Typography, CircularProgress } from '@material-ui/core';

// redux
import { useDispatch, useSelector } from '../../../../redux/store';
import { onBackStep, onNextStep, createBilling } from '../../../../redux/slices/product';
// utils
//
import NFTSummary from './NFTSummary';
import CheckoutNewAddressForm from './CheckoutNewAddressForm';
import useAuth from '../../../../hooks/useAuth';
// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export default function NFTWalletConfirm() {
  const { user } = useAuth();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const { checkout } = useSelector((state) => state.product);
  const { total, discount, subtotal } = checkout;
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState('');

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpen = () => {
    setLoading(true);
    if (window.ethereum) {
      try {
        window.ethereum
          .request({
            method: 'eth_requestAccounts'
          })
          .then(async (address) => {
            // eslint-disable-next-line prefer-destructuring
            window.userAddress = address[0];
            setAddress(window.userAddress);
          });
        setLoading(false);
      } catch (error) {
        console.log(error);
        if (error.code === 4001) {
          console.log(error);
        }
      }
    } else {
      setLoading(false);
    }
  };

  const handleNextStep = () => {
    dispatch(onNextStep());
  };

  const handleBackStep = () => {
    dispatch(onBackStep());
  };

  const handleCreateBilling = (value) => {
    dispatch(createBilling(value));
  };

  const loadProvider = async () => {
    const walletConnectStatus = localStorage.getItem('walletConnect') || '';
    console.log(walletConnectStatus);
  };

  useEffect(() => {
    loadProvider();
  }, []);

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3, mb: 3, position: 'relative' }}>
            {loading ? (
              <CircularProgress />
            ) : (
              <>
                <Box sx={{ mb: 1, display: 'flex', alignItems: 'center' }}>
                  <Typography variant="subtitle1">{user.member_name}</Typography>
                  <Button variant="outlined" size="small" color="inherit" sx={{ ml: 2 }}>
                    {user.member_user_id}
                  </Button>
                </Box>
                <Typography variant="body2" gutterBottom>
                  {user.wallet_address}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  {address}
                </Typography>
              </>
            )}
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
              <Button variant="outlined" size="small" onClick={handleClickOpen}>
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
          <NFTSummary subtotal={subtotal} total={total} discount={discount} />
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
