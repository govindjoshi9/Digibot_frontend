// import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';

import { Link, useNavigate } from 'react-router-dom';
// material-ui
import { useTheme } from '@mui/material/styles';
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  OutlinedInput,
  Stack,
  ClickAwayListener,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';

import useAuth from '../../../../hooks/useAuth';
// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project imports
import useScriptRef from 'hooks/useScriptRef';
import AnimateButton from 'ui-component/extended/AnimateButton';

// assets

// ============================|| FIREBASE - LOGIN ||============================ //

const ForgotPassword = ({ ...others }) => {
  const [openModal, setOpenModal] = useState(false);
  const [timer, setTimer] = useState(300); // 5 minutes in seconds
  const [touched, setTouched] = useState({
    email: false,
    password: false,
    otp: false,
    newPassword: false,
    confirmPassword: false
  });
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [emailAdd, setEmailAdd] = useState('');
  const [errors] = useState({});
  const theme = useTheme();
  const scriptedRef = useScriptRef();

  const { confirmOptPassword, forgotPassword } = useAuth();
  const navigate = useNavigate();

  // eslint-disable-next-line no-unused-vars
  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  useEffect(() => {
    let interval;
    if (openModal) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [openModal]);

  useEffect(() => {
    if (timer === 0) {
      handleCloseModal();
    }
  }, [timer]);

  const handleNewPasswordSubmit = async () => {
    try {
      console.log(123);
      if (newPassword != confirmPassword) {
        console.log('password should match');
        throw 'password should match';
      }
      await confirmOptPassword(otp, newPassword, confirmPassword, emailAdd);
      navigate('/login');
    } catch (error) {
      // You can show an error message to the user if needed
      console.error(error);
    }
  };

  const handleBlur = (field) => () => {
    setTouched((prevTouched) => ({ ...prevTouched, [field]: true }));
  };
  const handleClickAway = () => {
    if (openModal) {
      handleOpenModal();
    }
  };

  // const customization = useSelector((state) => state.customization);

  return (
    <>
      <Grid container direction="column" justifyContent="center" spacing={2}>
        <Grid item xs={12} container alignItems="center" justifyContent="center">
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1">Forgot Password</Typography>
          </Box>
        </Grid>
      </Grid>

      <Formik
        initialValues={{
          email: 'info@royalmagic.live',
          submit: null
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string().email('Must be a valid email').max(255).required('Email is required')
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          try {
            console.log(values);
            // Call the function to send OTP to the provided email or username
            await forgotPassword(values.email);
            setEmailAdd(values.email);
            if (scriptedRef.current) {
              setStatus({ success: true });
              setSubmitting(false);
            }
            handleOpenModal(); // Open the OTP confirmation modal after sending OTP
          } catch (err) {
            console.error(err);
            if (scriptedRef.current) {
              setStatus({ success: false });
              setErrors({ submit: err.message });
              setSubmitting(false);
            }
          }
        }}
      >
        {({ errors, handleChange, handleSubmit, isSubmitting, values }) => (
          <ClickAwayListener onClickAway={handleClickAway}>
            <form noValidate onSubmit={handleSubmit} {...others}>
              <FormControl fullWidth error={Boolean(touched.email && errors.email)} sx={{ ...theme.typography.customInput }}>
                <InputLabel htmlFor="outlined-adornment-email-login">Email Address / Username</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-email-login"
                  type="email"
                  value={values.email}
                  name="email"
                  onBlur={handleBlur('email')}
                  onChange={handleChange}
                  label="Email Address / Username"
                  inputProps={{}}
                />
                {touched.email && errors.email && (
                  <FormHelperText error id="standard-weight-helper-text-email-login">
                    {errors.email}
                  </FormHelperText>
                )}
              </FormControl>

              <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
                <div></div>
                <Typography
                  variant="subtitle1"
                  color="secondary"
                  sx={{ textDecoration: 'none', cursor: 'pointer' }}
                  component={Link}
                  to="/login"
                >
                  Login
                </Typography>
              </Stack>
              {errors.submit && (
                <Box sx={{ mt: 3 }}>
                  <FormHelperText error>{errors.submit}</FormHelperText>
                </Box>
              )}

              <Box sx={{ mt: 2 }}>
                <AnimateButton>
                  <Button
                    disableElevation
                    disabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                    color="secondary"
                  >
                    Forgot Password
                  </Button>
                </AnimateButton>
              </Box>
            </form>
          </ClickAwayListener>
        )}
      </Formik>
      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>Forgot Password</DialogTitle>

        <DialogContent>
          <FormControl fullWidth error={Boolean(touched.otp && errors.otp)} sx={{ ...theme.typography.customInput }}>
            <InputLabel htmlFor="outlined-adornment-otp">OTP</InputLabel>
            <OutlinedInput
              id="outlined-adornment-otp"
              type="text"
              value={otp}
              name="otp"
              onBlur={handleBlur('otp')}
              onChange={(e) => setOtp(e.target.value)}
              label="OTP"
              inputProps={{}}
            />
            {touched.otp && errors.otp && (
              <FormHelperText error id="standard-weight-helper-text-otp">
                {errors.otp}
              </FormHelperText>
            )}
          </FormControl>
          <Typography variant="body2" sx={{ marginBottom: 1 }}>
            OTP will expire in: {Math.floor(timer / 60)}:{timer % 60 < 10 ? `0${timer % 60}` : timer % 60}
          </Typography>

          <FormControl fullWidth error={Boolean(touched.newPassword && errors.newPassword)} sx={{ ...theme.typography.customInput }}>
            <InputLabel htmlFor="outlined-adornment-new-password">New Password</InputLabel>
            <OutlinedInput
              id="outlined-adornment-new-password"
              type="password"
              value={newPassword}
              name="newPassword"
              onBlur={handleBlur('newPassword')}
              onChange={(e) => setNewPassword(e.target.value)}
              label="New Password"
              inputProps={{}}
            />
            {touched.newPassword && errors.newPassword && (
              <FormHelperText error id="outlined-adornment-new-password-helper-text">
                {errors.newPassword}
              </FormHelperText>
            )}
            {!touched.newPassword && <FormHelperText id="standard-weight-helper-text-new-password">Enter your new password</FormHelperText>}
            {errors.newPassword && (
              <FormHelperText error id="outlined-adornment-new-password-helper-text">
                {errors.newPassword}
              </FormHelperText>
            )}
          </FormControl>

          <FormControl
            fullWidth
            error={Boolean(touched.confirmPassword && errors.confirmPassword)}
            sx={{ ...theme.typography.customInput }}
          >
            <InputLabel htmlFor="outlined-adornment-confirm-password">Confirm Password</InputLabel>
            <OutlinedInput
              id="outlined-adornment-confirm-password"
              type="password"
              value={confirmPassword}
              name="confirmPassword"
              onBlur={handleBlur('confirmPassword')}
              onChange={(e) => setConfirmPassword(e.target.value)}
              label="Confirm Password"
              inputProps={{}}
            />
            {touched.confirmPassword && errors.confirmPassword && (
              <FormHelperText error id="outlined-adornment-confirm-password-helper-text">
                {errors.confirmPassword}
              </FormHelperText>
            )}
            {!touched.confirmPassword && (
              <FormHelperText id="standard-weight-helper-text-confirm-password">Confirm your new password</FormHelperText>
            )}
            {errors.confirmPassword && (
              <FormHelperText error id="outlined-adornment-new-password-helper-text">
                {errors.confirmPassword}
              </FormHelperText>
            )}
          </FormControl>
          <DialogActions>
            <Button onClick={handleCloseModal} color="primary" variant="outlined">
              Cancel
            </Button>
            <Button color="primary" variant="contained" onClick={handleNewPasswordSubmit}>
              Submit New Password
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ForgotPassword;
