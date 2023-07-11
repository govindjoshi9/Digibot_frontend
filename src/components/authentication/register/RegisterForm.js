import * as Yup from 'yup';
import { useEffect, useState } from 'react';
import { Icon } from '@iconify/react';
import queryString from 'query-string';
import { useSnackbar } from 'notistack5';
import { useFormik, Form, FormikProvider } from 'formik';
import eyeFill from '@iconify/icons-eva/eye-fill';
import closeFill from '@iconify/icons-eva/close-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
// material
import {
  Stack,
  TextField,
  IconButton,
  InputAdornment,
  Alert,
  Link,
  Checkbox,
  Typography,
  FormControlLabel
} from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';
// hooks
import useAuth from '../../../hooks/useAuth';
import useIsMountedRef from '../../../hooks/useIsMountedRef';
//
import { MIconButton } from '../../@material-extend';

// ----------------------------------------------------------------------

export default function RegisterForm() {
  const { register } = useAuth();
  const isMountedRef = useIsMountedRef();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [showPassword, setShowPassword] = useState(false);
  // eslint-disable-next-line new-cap
  const queryParams = new queryString.parse(window.location.search);
  console.log(queryParams);

  useEffect(() => {
    if (queryParams.UplineId === undefined) {
      enqueueSnackbar('Sponcer ID is required', {
        variant: 'error',
        action: (key) => (
          <MIconButton size="small" onClick={() => closeSnackbar(key)}>
            <Icon icon={closeFill} />
          </MIconButton>
        )
      });
      window.location.replace('/xPicUApp/login');
    }
  }, []);

  const RegisterSchema = Yup.object().shape({
    memberName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Full name required'),
    contactNo: Yup.string().min(10, 'Short!').max(11, 'Too Long!').required('Contact Number required'),
    sponsorId: Yup.string().min(6, 'Too Short!').max(50, 'Too Long!').required('Sponcer id is required'),
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().min(6, 'Too Short!').max(20, 'Too Long!').required('Password id is required')
  });

  const formik = useFormik({
    initialValues: {
      sponsorId: queryParams.UplineId,
      memberName: '',
      email: '',
      contactNo: '',
      password: '',
      cpassword: ''
    },
    validationSchema: RegisterSchema,
    onSubmit: async (values, { setErrors, setSubmitting }) => {
      if (values.password !== values.cpassword) {
        enqueueSnackbar('Please Confirm Password first', {
          variant: 'error',
          action: (key) => (
            <MIconButton size="small" onClick={() => closeSnackbar(key)}>
              <Icon icon={closeFill} />
            </MIconButton>
          )
        });
        return;
      }
      try {
        await register(
          values.sponsorId,
          values.memberName,
          values.email,
          values.contactNo,
          values.password,
          values.cpassword
        );
        enqueueSnackbar('Register success', {
          variant: 'success',
          action: (key) => (
            <MIconButton size="small" onClick={() => closeSnackbar(key)}>
              <Icon icon={closeFill} />
            </MIconButton>
          )
        });
        if (isMountedRef.current) {
          setSubmitting(false);
        }
        window.location.replace('/xPicUApp/login');
      } catch (error) {
        if (isMountedRef.current) {
          setErrors({ afterSubmit: error.response.data.message });
          setSubmitting(false);
        }
      }
    }
  });

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          {errors.afterSubmit && <Alert severity="error">{errors.afterSubmit}</Alert>}

          <TextField
            fullWidth
            autoComplete="sponcer_id"
            type="text"
            disabled
            label="Sponsor ID"
            {...getFieldProps('sponsorId')}
            error={Boolean(touched.sponsorId && errors.sponsorId)}
            helperText={touched.sponsorId && errors.sponsorId}
          />

          <TextField
            fullWidth
            label="Full name"
            {...getFieldProps('memberName')}
            error={Boolean(touched.memberName && errors.memberName)}
            helperText={touched.memberName && errors.memberName}
          />

          <TextField
            fullWidth
            autoComplete="email"
            type="email"
            label="Email address"
            {...getFieldProps('email')}
            error={Boolean(touched.email && errors.email)}
            helperText={touched.email && errors.email}
          />
          <TextField
            fullWidth
            autoComplete="phone number"
            type="text"
            label="Contact No."
            {...getFieldProps('contactNo')}
            error={Boolean(touched.contactNo && errors.contactNo)}
            helperText={touched.contactNo && errors.contactNo}
          />

          <TextField
            fullWidth
            type={showPassword ? 'text' : 'password'}
            label="Password"
            {...getFieldProps('password')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton edge="end" onClick={() => setShowPassword((prev) => !prev)}>
                    <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                  </IconButton>
                </InputAdornment>
              )
            }}
            error={Boolean(touched.password && errors.password)}
            helperText={touched.password && errors.password}
          />
          <TextField
            fullWidth
            type={showPassword ? 'text' : 'password'}
            label="Confirm Password"
            {...getFieldProps('cpassword')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton edge="end" onClick={() => setShowPassword((prev) => !prev)}>
                    <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                  </IconButton>
                </InputAdornment>
              )
            }}
            error={Boolean(touched.password && errors.password)}
            helperText={touched.password && errors.password}
          />
          <Typography variant="body2" align="center" sx={{ color: 'text.secondary', mt: 3 }}>
            <FormControlLabel control={<Checkbox />} label="" sx={{ marginRight: 0 }} />I agree to XPic&nbsp;
            <Link underline="always" color="text.primary" href="#">
              Terms of Service
            </Link>
            &nbsp;and&nbsp;
            <Link underline="always" color="text.primary" href="#">
              Privacy Policy
            </Link>
            .
          </Typography>

          <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
            Register
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  );
}
