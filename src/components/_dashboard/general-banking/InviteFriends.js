// material
/* eslint-disable import/no-unresolved */
import { useState } from 'react';
import { useFormik } from 'formik';
import { styled, alpha } from '@material-ui/core/styles';
import { Box, Card, Stack, Typography, Button, OutlinedInput } from '@material-ui/core';
import { useSnackbar } from 'notistack5';
import useAuth from '../../../hooks/useAuth';

// ----------------------------------------------------------------------

const ContentStyle = styled(Card)(({ theme }) => ({
  marginTop: -120,
  boxShadow: 'none',
  padding: theme.spacing(5),
  paddingTop: theme.spacing(16),
  color: theme.palette.common.white,
  backgroundImage: `linear-gradient(135deg,
    ${theme.palette.primary.main} 0%,
    ${theme.palette.primary.dark} 100%)`
}));

// ----------------------------------------------------------------------

export default function InviteFriends() {
  const validate = (values) => {
    const errors = {};

    if (!values.email) {
      errors.email = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = 'Invalid email address';
    }

    return errors;
  };
  const formik = useFormik({
    initialValues: {
      email: ''
    },
    validate,
    onSubmit: (values) => {
      handleSubmit(values);
    }
  });

  const { refer } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const [email, setEmail] = useState('');

  const handleSubmit = async (values) => {
    try {
      await refer(values);
      enqueueSnackbar('Invitation sent successfully.', { variant: 'success' });
    } catch (error) {
      enqueueSnackbar('Something went wrong', { variant: 'error' });
    }
  };

  return (
    <div>
      <Box
        component="img"
        src="/static/illustrations/illustration_invite.png"
        sx={{
          zIndex: 9,
          position: 'relative',
          left: 40,
          width: 140,
          filter: 'drop-shadow(0 12px 24px rgba(0,0,0,0.24))'
        }}
      />
      <ContentStyle>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="h4">
            Invite friends <br /> and earn upto
          </Typography>
        </Stack>

        <Typography variant="body2" sx={{ mt: 2, mb: 3 }}>
          Praesent egestas tristique nibh. Duis lobortis massa imperdiet quam.Praesent egestas tristique nibh. Duis
          lobortis massa imperdiet quam.
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <Stack direction="row" spacing={1} alignItems="center" justifyContent="space-between">
            <div>
              <OutlinedInput
                size="small"
                placeholder="Email"
                type="email"
                name="email"
                id="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                sx={{
                  width: 1,
                  color: 'common.white',
                  fontWeight: 'fontWeightMedium',
                  bgcolor: (theme) => alpha(theme.palette.common.black, 0.16),
                  '& input::placeholder': {
                    color: (theme) => alpha(theme.palette.common.white, 0.48)
                  },
                  '& fieldset': { display: 'none' }
                }}
              />
              {formik.touched.email && formik.errors.email && <span>{formik.errors.email}</span>}
            </div>
            <Button color="warning" variant="contained" type="submit">
              Invite
            </Button>
          </Stack>
        </form>
      </ContentStyle>
    </div>
  );
}
