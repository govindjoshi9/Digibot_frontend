import * as Yup from 'yup';
import { useSnackbar } from 'notistack5';
import { useFormik, Form, FormikProvider } from 'formik';
// material
import { Stack, Card, TextField } from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';

// utils
// import fakeRequest from '../../../../utils/fakeRequest';
// import { changePassword } from '../../../../redux/slices/user';
// import { useDispatch, useSelector } from '../../../../redux/store';
import useAuth from '../../../../hooks/useAuth';
// ----------------------------------------------------------------------

export default function AccountChangePassword() {
  const { changePassword } = useAuth();
  // const dispatch = useDispatch();
  // const { changePassStatus } = useSelector((state) => state.user);
  const { enqueueSnackbar } = useSnackbar();

  const ChangePassWordSchema = Yup.object().shape({
    oldPassword: Yup.string().required('Old Password is required'),
    newPassword: Yup.string().min(6, 'Password must be at least 6 characters').required('New Password is required'),
    verifyPassword: Yup.string().oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
  });

  const formik = useFormik({
    initialValues: {
      oldPassword: '',
      newPassword: '',
      verifyPassword: ''
    },
    validationSchema: ChangePassWordSchema,
    onSubmit: async (values, { setErrors, setSubmitting }) => {
      try {
        await changePassword({ ...values });
        setSubmitting(false);
        enqueueSnackbar('Save success', { variant: 'success' });
      } catch (error) {
        setErrors({ afterSubmit: error.code });
        console.log(error);
        enqueueSnackbar('Error', { variant: 'error' });
      }
    }
  });

  const { errors, touched, isSubmitting, handleSubmit, getFieldProps } = formik;

  return (
    <Card sx={{ p: 3 }}>
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Stack spacing={3} alignItems="flex-end">
            <TextField
              {...getFieldProps('oldPassword')}
              fullWidth
              autoComplete="on"
              type="text"
              label="Old Password"
              error={Boolean(touched.oldPassword && errors.oldPassword)}
              helperText={touched.oldPassword && errors.oldPassword}
            />

            <TextField
              {...getFieldProps('newPassword')}
              fullWidth
              autoComplete="on"
              type="text"
              label="New Password"
              error={Boolean(touched.newPassword && errors.newPassword)}
              helperText={(touched.newPassword && errors.newPassword) || 'Password must be minimum 6+'}
            />

            <TextField
              {...getFieldProps('verifyPassword')}
              fullWidth
              autoComplete="on"
              type="text"
              label="Confirm New Password"
              error={Boolean(touched.verifyPassword && errors.verifyPassword)}
              helperText={touched.verifyPassword && errors.verifyPassword}
            />

            <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
              Save Changes
            </LoadingButton>
          </Stack>
        </Form>
      </FormikProvider>
    </Card>
  );
}
