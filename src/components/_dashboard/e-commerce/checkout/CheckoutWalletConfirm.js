import { Icon } from '@iconify/react';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { useSnackbar } from 'notistack5';
import plusFill from '@iconify/icons-eva/plus-fill';
import arrowIosBackFill from '@iconify/icons-eva/arrow-ios-back-fill';
// material
import { Box, Grid, Card, Button, Typography, CircularProgress } from '@material-ui/core';
import closeFill from '@iconify/icons-eva/close-fill';
// redux
import { useDispatch } from '../../../../redux/store';
import { onBackStep } from '../../../../redux/slices/product';
// utils
//
import { MIconButton } from '../../../@material-extend';
//
import useAuth from '../../../../hooks/useAuth';
import WithdrawSummary from './WithdrawSummary';
// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

CheckoutWalletConfirm.propTypes = {
  checkoutType: PropTypes.string,
  withdrawSummary: PropTypes.object
};

export default function CheckoutWalletConfirm({ checkoutType, withdrawSummary }) {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const { user } = useAuth();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState('');
  const [withdrawAdd] = useState(user.wallet_address);
  const handleClose = () => {
    setOpen(false);
  };
  let checkoutTypeWallet = 0;
  if (checkoutType === 'reload') {
    checkoutTypeWallet = Number(user[checkoutType.concat('Wallet')]);
  } else {
    checkoutTypeWallet = user[checkoutType.concat('_wallet')];
  }
  useEffect(() => {
    if (withdrawSummary.GUSD === 0) {
      dispatch(onBackStep());
    }
  }, []);

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

  const handleBackStep = () => {
    dispatch(onBackStep());
  };

  const handleCreateBilling = () => {
    if (address === '') {
      enqueueSnackbar('Connect Wallet first', {
        variant: 'error',
        action: (key) => (
          <MIconButton size="small" onClick={() => closeSnackbar(key)}>
            <Icon icon={closeFill} />
          </MIconButton>
        )
      });
      return;
    }
    if (address !== withdrawAdd) {
      enqueueSnackbar('Please change wallet for withdraw', {
        variant: 'error',
        action: (key) => (
          <MIconButton size="small" onClick={() => closeSnackbar(key)}>
            <Icon icon={closeFill} />
          </MIconButton>
        )
      });
      withdraw();
    } else if (address === withdrawAdd) {
      console.log(checkoutType);
    }
  };

  const withdraw = async () => {
    console.log(checkoutType);
    console.log(withdrawSummary);
  };

  const loadProvider = async () => {
    const walletConnectStatus = localStorage.getItem('walletConnect') || '';
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
                <Typography variant="body2">Connect your wallet</Typography>
                <br />
                <Box sx={{ mb: 1, display: 'flex', alignItems: 'center' }}>
                  <Typography variant="subtitle1">{user.member_name}</Typography>
                  <Button variant="outlined" size="small" color="inherit" sx={{ ml: 2 }}>
                    {user.member_user_id}
                  </Button>
                </Box>
                <Typography variant="body2" gutterBottom>
                  {withdrawAdd}
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
            <Button size="small" startIcon={<Icon icon={plusFill} />}>
              Add new address
            </Button>
          </Box>
        </Grid>

        <Grid item xs={12} md={4}>
          <WithdrawSummary
            GUSD={withdrawSummary.GUSD}
            XPICP={withdrawSummary.XPICP}
            total={withdrawSummary.total}
            enableDiscount
            bal={checkoutTypeWallet}
            // subtotal={wallet}
            // onApplyDiscount={handleApplyDiscount}
            // setSubtotal={setSubtotal}
            payoutType={checkoutType}
          />
          <Button
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            onClick={handleCreateBilling}
            to="/payout/minting"
          >
            Payout
          </Button>
        </Grid>
      </Grid>
    </>
  );
}
