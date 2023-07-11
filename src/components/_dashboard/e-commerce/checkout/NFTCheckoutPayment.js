/* eslint-disable import/order */
import * as Yup from 'yup';
import Web3 from 'web3';
import { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import { useFormik, Form, FormikProvider } from 'formik';
import arrowIosBackFill from '@iconify/icons-eva/arrow-ios-back-fill';
import { useSnackbar } from 'notistack5';
import closeFill from '@iconify/icons-eva/close-fill';
import { useDispatch, useSelector } from '../../../../redux/store';
// material
import { Grid, Button, Box } from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';
// eslint-disable-next-line import/no-useless-path-segments
import LoadingScreenPleaseWait from '../../../../components/LoadingScreenPleaseWait';
import { DepositeNow } from './Deposite';
// redux
import { onGotoStep, onBackStep, onNextStep, applyShipping } from '../../../../redux/slices/product';
//
import CheckoutSummary from './NFTSummary';
import CheckoutStakingOption from './CheckoutStakingOption';
import NFTBillingInfo from './NFTBillingInfo';
import CheckoutPaymentMethods from './CheckoutPaymentMethods';
import { XPIC_CONTRACT, XPIC_PLUS_CONTRACT, GUSD_CONTRACT, MLM_CONTRACT, MLM_CONTRACT_ADDRESS } from './WalletAddress';
import { MIconButton } from '../../../@material-extend';

// ----------------------------------------------------------------------

const StackingOptions = [
  {
    value: 0,
    title: 'Autostacking off',
    description: 'Autostacking off dsc'
  },
  {
    value: 1,
    title: 'Autostacking on',
    description: 'Autostacking on dsc'
  }
];

const PAYMENT_OPTIONS = [
  {
    value: 'GUSD',
    title: 'GUSD',
    description: 'You will be redirected to PayPal website to complete your purchase securely.',
    icons: ['/static/icons/gusd.png']
  }
  // {
  //   value: 'GUSDXPIC',
  //   title: 'GUSD and XPIC',
  //   description: 'We support Mastercard, Visa, Discover and Stripe.',
  //   icons: ['/static/icons/ic_mastercard.svg', '/static/icons/ic_visa.svg']
  // }
];

// ----------------------------------------------------------------------

export default function NFTCheckoutPayment() {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const { checkout } = useSelector((state) => state.product);
  const { total, discount, subtotal, shipping, cart } = checkout;
  console.log(checkout);
  const [loading, setLoading] = useState(false);
  const [userDetails, setUserDetails] = useState({
    wallet: '',
    username: '',
    memberId: ''
  });
  const [values, setValues] = useState({
    allowance: '',
    autoStaking: 0,
    chainID: '',
    items: '',
    cart: {},
    gaurachain: '',
    gusdbal: '',
    stakeAmount: '',
    paymentOption: '',
    xpicbal: '',
    xpicpbal: ''
  });
  const web3 = new Web3(Web3.givenProvider);

  useEffect(() => {
    if (window.ethereum === undefined) {
      enqueueSnackbar('Please Install and connect Wallet', {
        variant: 'error',
        action: (key) => (
          <MIconButton size="small" onClick={() => closeSnackbar(key)}>
            <Icon icon={closeFill} />
          </MIconButton>
        )
      });
    } else {
      enqueueSnackbar('Wallet is connected', {
        variant: 'success',
        action: (key) => (
          <MIconButton size="small" onClick={() => closeSnackbar(key)}>
            <Icon icon={closeFill} />
          </MIconButton>
        )
      });
    }
    try {
      setValues((prevState) => ({
        ...prevState,
        stakeAmount: checkout.total,
        cart: checkout.cart
      }));
    } catch (error) {
      console.log(error);
    }
    async function fetchData() {
      try {
        window.ethereum.request({ method: 'eth_requestAccounts' }).then(async (address) => {
          // eslint-disable-next-line prefer-destructuring
          window.userAddress = address[0];
          setUserDetails((prevState) => ({
            ...prevState,
            wallet: address[0]
          }));
          try {
            await getBalance(address[0]);
            const allowance = checkAllowance(address[0], MLM_CONTRACT_ADDRESS);
            setValues((prevState) => ({
              ...prevState,
              allowance
            }));
            return address[0];
          } catch (error) {
            console.log(error);
          }
        });
      } catch (error) {
        console.log(error);
      }
    }

    try {
      getChainId();
    } catch (error) {
      console.log(error);
    }

    fetchData();
  }, []);

  async function getBalance(useradd) {
    const gusdbal = await GUSD_CONTRACT.methods.balanceOf(useradd).call();
    const xpicbal = await XPIC_CONTRACT.methods.balanceOf(useradd).call();
    const xpicpbal = await XPIC_PLUS_CONTRACT.methods.balanceOf(useradd).call();
    setValues((prevState) => ({
      ...prevState,
      gusdbal,
      xpicbal,
      xpicpbal
    }));
  }

  async function checkAllowance(useradd, MLM_CONTRACT_ADDRESS) {
    const Allowance = await GUSD_CONTRACT.methods.allowance(useradd, MLM_CONTRACT_ADDRESS).call();
    return Allowance;
  }

  const handleNextStep = () => {
    dispatch(onNextStep());
  };

  const handleBackStep = () => {
    dispatch(onBackStep());
  };

  const handleGotoStep = (step) => {
    dispatch(onGotoStep(step));
  };

  const handleApplyShipping = (autoStaking) => {
    setValues((prevState) => ({
      ...prevState,
      autoStaking
    }));
  };

  const PaymentSchema = Yup.object().shape({
    payment: Yup.mixed().required('Payment is required')
  });

  async function getChainId() {
    if (typeof web3 !== 'undefined') {
      const chainID = await web3.eth.getChainId();
      setValues((prevState) => ({
        ...prevState,
        chainID
      }));
    }
  }

  async function getAddress() {
    window.ethereum
      .request({
        method: 'eth_requestAccounts'
      })
      .then(async (address) => {
        // eslint-disable-next-line prefer-destructuring
        window.userAddress = address[0];
      });
    return window.userAddress;
  }

  const staking = async (userDetails, values) => {
    setLoading(true);
    let address;
    if (userDetails.wallet === undefined) {
      address = await getAddress();
    } else {
      address = userDetails.wallet;
    }
    const userId = localStorage.getItem('member_user_id');
    const stakeAmount = toFixed(parseFloat(values.stakeAmount) * 1e18);
    try {
      if (values.chainID !== 61115) {
        enqueueSnackbar('Please Change to Network to Gaura Chain Mainnet', {
          variant: 'error',
          action: (key) => (
            <MIconButton size="small" onClick={() => closeSnackbar(key)}>
              <Icon icon={closeFill} />
            </MIconButton>
          )
        });
        setLoading(false);
        return;
      }
      if (values.gusdbal / 1e18 < stakeAmount / 1e18) {
        enqueueSnackbar('Low GUSD Balance or Refresh first', {
          variant: 'error',
          action: (key) => (
            <MIconButton size="small" onClick={() => closeSnackbar(key)}>
              <Icon icon={closeFill} />
            </MIconButton>
          )
        });
        setLoading(false);
        return;
      }
      if ((await values.allowance) / 1e18 < stakeAmount / 1e18) {
        await GUSD_CONTRACT.methods.approve(MLM_CONTRACT_ADDRESS, stakeAmount).send({
          from: address
        });
      }
      let d;
      if (values.cart.length > 0) {
        // eslint-disable-next-line no-plusplus
        for (let index = 0; index < values.cart.length; index++) {
          console.log(values.cart[index].price);
          console.log(
            values.cart[index].price,
            values.cart[index].cover.slice(29),
            values.autoStaking,
            userDetails.wallet
          );
          // eslint-disable-next-line no-await-in-loop
          d = await MLM_CONTRACT.methods.InvestmentGusd(userId, stakeAmount, 'GUSD').send({
            from: address
          });
          // eslint-disable-next-line no-await-in-loop
          await DepositeNow(
            d,
            values.cart[index].price,
            values.cart[index].cover.slice(29),
            values.autoStaking,
            userDetails.wallet
          );
        }
      } else {
        // d = await MLM_CONTRACT.methods.InvestmentGusd('3741529', stakeAmount, 'GUSD').send({
        //   from: address
        // });
        enqueueSnackbar('Cart is empty', {
          variant: 'error',
          action: (key) => (
            <MIconButton size="small" onClick={() => closeSnackbar(key)}>
              <Icon icon={closeFill} />
            </MIconButton>
          )
        });
      }

      enqueueSnackbar('Transaction Successfull', {
        variant: 'success',
        action: (key) => (
          <MIconButton size="small" onClick={() => closeSnackbar(key)}>
            <Icon icon={closeFill} />
          </MIconButton>
        )
      });
      handleNextStep();
    } catch (error) {
      enqueueSnackbar('Transaction Failed', {
        variant: 'error',
        action: (key) => (
          <MIconButton size="small" onClick={() => closeSnackbar(key)}>
            <Icon icon={closeFill} />
          </MIconButton>
        )
      });
      console.error('Error:', error);
    }
    setLoading(false);
  };

  function toFixed(x) {
    if (Math.abs(x) < 1.0) {
      // eslint-disable-next-line radix
      const e = parseInt(x.toString().split('e-')[1]);
      if (e) {
        // eslint-disable-next-line no-restricted-properties
        x *= Math.pow(10, e - 1);
        x = `0.${new Array(e).join('0')}${x.toString().substring(2)}`;
      }
    } else {
      // eslint-disable-next-line radix
      let e = parseInt(x.toString().split('+')[1]);
      if (e > 20) {
        e -= 20;
        // eslint-disable-next-line no-restricted-properties
        x /= Math.pow(10, e);
        x += new Array(e + 1).join('0');
      }
    }
    return String(x);
  }

  const formik = useFormik({
    initialValues: {
      delivery: shipping,
      payment: ''
    },
    validationSchema: PaymentSchema,
    onSubmit: async (values, { setErrors, setSubmitting }) => {
      if (values.paymentOption === 'GUSD') {
        if (window.ethereum) {
          try {
            if (values.gusdbal / 1e18 > 100) {
              enqueueSnackbar(`Your balance is ${values.gusdbal / 1e18}`, {
                variant: 'success',
                action: (key) => (
                  <MIconButton size="small" onClick={() => closeSnackbar(key)}>
                    <Icon icon={closeFill} />
                  </MIconButton>
                )
              });
              await staking(userDetails, values);
            } else {
              console.error('not enough balance');
            }
            // console.log(GUSDTOken / 1e18);
          } catch (error) {
            console.log(error);
            if (error.code === 4001) {
              console.log(error);
            }
          }
        } else {
          console.log('not working');
        }
        // await staking(100, useradd);
      }
    }
  });

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
          })
          .catch((error) => {
            if (error.code === -32002) {
              enqueueSnackbar(`Request already sent, open wallet and confirm`, {
                variant: 'error',
                action: (key) => (
                  <MIconButton size="small" onClick={() => closeSnackbar(key)}>
                    <Icon icon={closeFill} />
                  </MIconButton>
                )
              });
            }
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

  async function addNetwork() {
    const isTestnet = 'false';
    let network;
    let params;

    if (typeof web3 !== 'undefined') {
      network = await web3.eth.getChainId();
      if (isTestnet === 'false') {
        if (network === 61115) {
          alert('Gaura Network has already been added to Metamask. Try to switch Network');
        } else {
          params = [
            {
              chainId: '0xEEBB',
              chainName: 'Gaura Chain Mainnet',
              nativeCurrency: {
                name: 'GAURA',
                symbol: 'GAURA',
                decimals: 18
              },
              rpcUrls: ['https://mainnet-rpc.gaurascan.com/'],
              blockExplorerUrls: ['https://gaurascan.com/']
            }
          ];
        }
      }

      window.ethereum
        .request({ method: 'wallet_addEthereumChain', params })
        .then(() => {
          console.log('Success');
          window.location.reload();
        })
        .catch((error) => console.log('Error', error.message));
    } else {
      alert('Unable to locate a compatible web3 browser!');
    }
  }

  const { isSubmitting, handleSubmit } = formik;

  return (
    <>
      {loading ? (
        <LoadingScreenPleaseWait
          sx={{
            position: 'absolute',
            top: '0%',
            right: '0%',
            width: '100vw',
            minHeight: '100vh',
            zIndex: '10000',
            backgroundColor: '#ffffffcf'
          }}
        />
      ) : (
        <FormikProvider value={formik}>
          <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={8}>
                <CheckoutStakingOption
                  formik={formik}
                  onApplyShipping={handleApplyShipping}
                  deliveryOptions={StackingOptions}
                />
                <CheckoutPaymentMethods formik={formik} paymentOptions={PAYMENT_OPTIONS} />

                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Button
                    size="small"
                    color="inherit"
                    onClick={handleBackStep}
                    startIcon={<Icon icon={arrowIosBackFill} />}
                  >
                    Back
                  </Button>
                </Box>
              </Grid>

              <Grid item xs={12} md={4}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <div />
                  <Button variant="outlined" size="small" sx={{ my: 2, float: 'right' }} onClick={handleClickOpen}>
                    Connect Wallet
                  </Button>
                </Box>
                <NFTBillingInfo onBackStep={handleBackStep} values={values} userDetails={userDetails} />
                <CheckoutSummary
                  enableEdit
                  total={total}
                  subtotal={subtotal}
                  discount={discount}
                  shipping={shipping}
                  onEdit={() => handleGotoStep(0)}
                />
                {values.chainID !== 61115 ? (
                  <LoadingButton
                    fullWidth
                    size="large"
                    variant="contained"
                    onClick={addNetwork}
                    loading={isSubmitting}
                    sx={{ mb: 2 }}
                  >
                    Add Gaura Chain
                  </LoadingButton>
                ) : (
                  ''
                )}
              </Grid>
            </Grid>
          </Form>
          <LoadingButton
            fullWidth
            size="large"
            variant="contained"
            onClick={() => {
              staking(userDetails, values);
            }}
          >
            Submit
          </LoadingButton>
        </FormikProvider>
      )}
    </>
  );
}
