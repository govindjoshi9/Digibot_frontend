import * as Yup from 'yup';
import { useState, useCallback } from 'react';
// material
import { styled } from '@material-ui/core/styles';
import { useSnackbar } from 'notistack5';
import { LoadingButton } from '@material-ui/lab';
import { Box, Typography, Card, Stack, Container, CardHeader, CardContent, Grid } from '@material-ui/core';
// routes
import { Form, FormikProvider, useFormik } from 'formik';
import axios from 'axios';
import { PATH_DASHBOARD } from '../../routes/paths';
// utils

import { fData } from '../../utils/formatNumber';
// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import { UploadAvatar, UploadSingleFile } from '../../components/upload';

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  paddingTop: theme.spacing(11),
  paddingBottom: theme.spacing(15)
}));

const baseUrl = process.env.PORT || 'https://xpic.live/api/v1/api';

export default function Upload() {
  const NewUserSchema = Yup.object().shape({
    aadharFront: Yup.mixed().required('Aadhar Card (Front Side) is required'),
    aadharBack: Yup.mixed().required('Aadhar Card (Back Side) is required'),
    avatarUrl: Yup.mixed().required('Avatar is required')
  });
  const { enqueueSnackbar } = useSnackbar();
  const [aadharFront, setAadharFront] = useState(null);
  const [aadharBack, setAadharBack] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState(null);

  const handleDropAvatar = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      setAvatarUrl({
        ...file,
        preview: URL.createObjectURL(file)
      });
    }
  }, []);

  const handleDropSingleAadharFront = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      setAadharFront({
        ...file,
        preview: URL.createObjectURL(file)
      });
    }
  }, []);
  const handleDropSingleAadharBack = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      setAadharBack({
        ...file,
        preview: URL.createObjectURL(file)
      });
    }
  }, []);

  const uploadKyc = async (formData) => {
    try {
      console.log(formData);
      const accessToken = window.localStorage.getItem('accessToken');
      const response = await axios.post(`${baseUrl}Account/AddKyc`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${accessToken}`
        }
      });
      enqueueSnackbar('File Uploaded Successfully', { variant: 'success' });
    } catch (error) {
      console.log(error);
      enqueueSnackbar('Already Uploaded or Something wrong', { variant: 'error' });
    }
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      aadharFront,
      aadharBack,
      avatarUrl
    },
    validationSchema: NewUserSchema,
    onSubmit: async (values, { setSubmitting, resetForm, setErrors }) => {
      try {
        // await fakeRequest(500);
        // resetForm();
        console.log(values);
        const formData = new FormData();
        formData.append('file', values.avatarUrl.file);
        formData.append('file', values.aadharFront.file);
        formData.append('file', values.aadharBack.file);
        setSubmitting(false);
        uploadKyc(formData);
        // enqueueSnackbar(!isEdit ? 'Create success' : 'Update success', { variant: 'success' });
        // navigate(PATH_DASHBOARD.user.list);
      } catch (error) {
        console.error(error);
        setSubmitting(false);
        setErrors(error);
      }
    }
  });

  const { errors, values, touched, handleSubmit, isSubmitting, setFieldValue, getFieldProps } = formik;

  return (
    <RootStyle style={{ paddingTop: '0', paddingBottom: '0' }} title="Dashboard: Activation | X-Pic">
      <Box
        sx={{
          mb: 1
        }}
      >
        <Container maxWidth="lg">
          <HeaderBreadcrumbs
            heading="KYC"
            links={[{ name: 'Dashboard', href: PATH_DASHBOARD.root }, { name: 'Activation' }]}
          />
        </Container>
      </Box>

      <Container maxWidth="lg">
        <FormikProvider value={formik}>
          <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
            <Stack spacing={5}>
              <Card>
                <CardHeader title="Upload Photo" />
                <CardContent>
                  <UploadAvatar
                    accept="image/*"
                    file={avatarUrl}
                    onDrop={handleDropAvatar}
                    caption={
                      <Typography
                        variant="caption"
                        sx={{
                          mt: 2,
                          mx: 'auto',
                          display: 'block',
                          textAlign: 'center',
                          color: 'text.secondary'
                        }}
                      >
                        Allowed *.jpeg, *.jpg, *.png, *.gif
                        <br /> max size of {fData(3145728)}
                      </Typography>
                    }
                  />
                </CardContent>
              </Card>
              <Grid container>
                <Grid
                  item
                  xs={12}
                  md={6}
                  sx={{
                    pr: 1
                  }}
                >
                  <Card>
                    <CardHeader title="Upload Aadhar Card (Front Side)" />
                    <CardContent>
                      <UploadSingleFile file={aadharFront} onDrop={handleDropSingleAadharFront} />
                    </CardContent>
                  </Card>
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={6}
                  sx={{
                    pl: 1
                  }}
                >
                  <Card>
                    <CardHeader title="Upload Aadhar Card (Back Side)" />
                    <CardContent>
                      <UploadSingleFile file={aadharBack} onDrop={handleDropSingleAadharBack} />
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
              <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
                <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                  Submit
                </LoadingButton>
              </Box>
            </Stack>
          </Form>
        </FormikProvider>
      </Container>
    </RootStyle>
  );
}
