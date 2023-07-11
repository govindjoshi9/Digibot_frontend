import PropTypes from 'prop-types';
// material
import { Grid, Stack } from '@material-ui/core';
//
import ProfileAbout from './ProfileAbout';
import ProfilePostInput from './ProfilePostInput';
import ProfileFollowInfo from './ProfileFollowInfo';
import ProfileSocialInfo from './ProfileSocialInfo';

// ----------------------------------------------------------------------

Profile.propTypes = {
  myProfile: PropTypes.object
};

export default function Profile({ myProfile }) {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <Stack spacing={3}>
          <ProfileFollowInfo profile={myProfile.row} />
          <ProfileAbout profile={myProfile} />
        </Stack>
      </Grid>

      <Grid item xs={12} md={6}>
        <Stack spacing={3}>
          <ProfileSocialInfo profile={myProfile} />
          <ProfilePostInput />
        </Stack>
      </Grid>
    </Grid>
  );
}
