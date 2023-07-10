import { useState } from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../../../../hooks/useAuth';
// material-ui
import { useTheme } from '@mui/material/styles';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
  useMediaQuery
} from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';
import queryString from 'query-string';

// project imports
import useScriptRef from 'hooks/useScriptRef';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { strengthColor, strengthIndicator } from 'utils/password-strength';
// assets
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

// ===========================|| FIREBASE - REGISTER ||=========================== //

const Register = ({ ...others }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const theme = useTheme();
  const scriptedRef = useScriptRef();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
  const [showPassword, setShowPassword] = useState(false);
  const [cshowPassword, setcShowPassword] = useState(false);
  const [checked, setChecked] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [values, setValues] = useState({
    email: '',
    userId: '' // Updated field name to 'userId'
  });

  const queryParams = new queryString.parse(window.location.search);
  console.log(queryParams);

  const [strength, setStrength] = useState(0);
  const [level, setLevel] = useState();
  const { register } = useAuth();

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleClickCShowPassword = () => {
    setcShowPassword(!cshowPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const changePassword = (value) => {
    const temp = strengthIndicator(value);
    setStrength(temp);
    setLevel(strengthColor(temp));
  };
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    window.location.href = '/login';
  };

  return (
    <>
      <Grid container direction="column" justifyContent="center" spacing={2}>
        <Grid item xs={12} container alignItems="center" justifyContent="center">
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1">Sign up with User id</Typography>
          </Box>
        </Grid>
      </Grid>

      <Formik
        initialValues={{
          email: '',
          password: '',
          cpassword: '',
          sponcerid: queryParams.UplineId,
          contactNumber: '',
          submit: null
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string().max(255).required('Email is required'),
          sponcerid: Yup.string().length(7, 'Sponcer ID must be 7 characters').required('Sponcer ID is required'),
          password: Yup.string().max(255).required('Password is required'),
          cpassword: Yup.string().max(255).required('Password is required'),
          contactNumber: Yup.string()
            .min(10, 'Contact number must be at least 10 digits')
            .max(12, 'Contact number must be at most 12 digits')
            .required('Contact number is required')
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          try {
            // Combine first name and last name into member_name
            const memberName = `${firstName} ${lastName}`;
            setValues((prevState) => ({
              ...prevState,
              email: values.email
            }));

            const res = await register({ ...values, member_name: memberName });
            console.log(res);
            if (scriptedRef.current) {
              setStatus({ success: true });
              setSubmitting(false);
            }
            setValues((prevState) => ({
              ...prevState,
              userId: res.userId
            }));
            openModal();
          } catch (err) {
            console.error(err);
            if (scriptedRef.current) {
              setStatus({ success: false });
              setErrors({ submit: err.response.data.message });
              setSubmitting(false);
            }
          }
        }}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit} {...others}>
            <FormControl fullWidth error={Boolean(touched.sponcerid && errors.sponcerid)} sx={{ ...theme.typography.customInput }}>
              <InputLabel htmlFor="outlined-adornment-spnace-id">Sponcer ID</InputLabel>
              <OutlinedInput
                id="outlined-adornment-spnace-id"
                type="number"
                value={values.sponcerid}
                name="sponcerid"
                onBlur={handleBlur}
                onChange={handleChange}
                inputProps={{}}
              />
              {touched.sponcerid && errors.sponcerid && (
                <FormHelperText error id="standard-weight-helper-text--register">
                  {errors.sponcerid}
                </FormHelperText>
              )}
            </FormControl>
            <Grid container spacing={matchDownSM ? 0 : 2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="First Name"
                  margin="normal"
                  name="fname"
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  sx={{ ...theme.typography.customInput }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Last Name"
                  margin="normal"
                  name="lname"
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  sx={{ ...theme.typography.customInput }}
                />
              </Grid>
            </Grid>
            <FormControl fullWidth error={Boolean(touched.email && errors.email)} sx={{ ...theme.typography.customInput }}>
              <InputLabel htmlFor="outlined-adornment-email-register">Email Address / Username</InputLabel>
              <OutlinedInput
                id="outlined-adornment-email-register"
                type="email"
                value={values.email}
                name="email"
                onBlur={handleBlur}
                onChange={handleChange}
                inputProps={{}}
              />
              {touched.email && errors.email && (
                <FormHelperText error id="standard-weight-helper-text--register">
                  {errors.email}
                </FormHelperText>
              )}
            </FormControl>
            <FormControl fullWidth error={Boolean(touched.contactNumber && errors.contactNumber)}>
              <InputLabel htmlFor="outlined-adornment-contact-number">Contact Number</InputLabel>
              <OutlinedInput
                id="outlined-adornment-contact-number"
                value={values.contactNumber}
                onChange={handleChange}
                label="Contact Number"
                onBlur={handleBlur}
                name="contactNumber" // Update the name attribute to match the field name in initialValues
              />
              {touched.contactNumber && errors.contactNumber && (
                <FormHelperText error id="standard-weight-helper-text-contact-number">
                  {errors.contactNumber}
                </FormHelperText>
              )}
            </FormControl>

            <FormControl fullWidth error={Boolean(touched.password && errors.password)} sx={{ ...theme.typography.customInput }}>
              <InputLabel htmlFor="outlined-adornment-password-register">Password</InputLabel>
              <OutlinedInput
                id="outlined-adornment-password-register"
                type={showPassword ? 'text' : 'password'}
                value={values.password}
                name="password"
                label="Password"
                onBlur={handleBlur}
                onChange={(e) => {
                  handleChange(e);
                  changePassword(e.target.value);
                }}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                      size="large"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                inputProps={{}}
              />
              {touched.password && errors.password && (
                <FormHelperText error id="standard-weight-helper-text-password-register">
                  {errors.password}
                </FormHelperText>
              )}
            </FormControl>
            <FormControl fullWidth error={Boolean(touched.cpassword && errors.cpassword)} sx={{ ...theme.typography.customInput }}>
              <InputLabel htmlFor="outlined-adornment-cpassword-register">Confirm Password</InputLabel>
              <OutlinedInput
                id="outlined-adornment-cpassword-register"
                type={cshowPassword ? 'text' : 'password'}
                value={values.cpassword}
                name="cpassword"
                label="Confirm Password"
                onBlur={handleBlur}
                onChange={(e) => {
                  handleChange(e);
                  changePassword(e.target.value);
                }}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickCShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                      size="large"
                    >
                      {cshowPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                inputProps={{}}
              />
              {touched.cpassword && errors.cpassword && (
                <FormHelperText error id="standard-weight-helper-text-cpassword-register">
                  {errors.cpassword}
                </FormHelperText>
              )}
            </FormControl>

            {strength !== 0 && (
              <FormControl fullWidth>
                <Box sx={{ mb: 2 }}>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item>
                      <Box style={{ backgroundColor: level?.color }} sx={{ width: 85, height: 8, borderRadius: '7px' }} />
                    </Grid>
                    <Grid item>
                      <Typography variant="subtitle1" fontSize="0.75rem">
                        {level?.label}
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              </FormControl>
            )}

            <Grid container alignItems="center" justifyContent="space-between">
              <Grid item>
                <FormControlLabel
                  control={
                    <Checkbox checked={checked} onChange={(event) => setChecked(event.target.checked)} name="checked" color="primary" />
                  }
                  label={
                    <Typography variant="subtitle1">
                      Agree with &nbsp;
                      <Typography variant="subtitle1" component={Link} to="#">
                        Terms & Condition.
                      </Typography>
                    </Typography>
                  }
                />
              </Grid>
            </Grid>
            {errors.submit && (
              <Box sx={{ mt: 3 }}>
                <FormHelperText error>{errors.submit}</FormHelperText>
              </Box>
            )}

            <Box sx={{ mt: 2 }}>
              <AnimateButton>
                <Button disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" color="secondary">
                  Sign up
                </Button>
              </AnimateButton>
            </Box>
          </form>
        )}
      </Formik>
      <Dialog open={isModalOpen} onClose={closeModal}>
        <DialogTitle>Registration Successful</DialogTitle>
        <DialogContent>
          <Typography variant="body1">Congratulations! You have successfully registered.</Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>
            Email: {values.email}
          </Typography>
          <Typography variant="h4" sx={{ mt: 2 }}>
            User ID: {values.userId}
          </Typography>
        </DialogContent>
        <Button onClick={closeModal}>Close</Button>
      </Dialog>
    </>
  );
};

export default Register;
