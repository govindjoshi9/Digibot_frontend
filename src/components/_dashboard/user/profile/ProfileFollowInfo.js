import PropTypes from 'prop-types';
// material
import { Card, Stack, Typography, Divider } from '@material-ui/core';
// utils
import { fNumber } from '../../../../utils/formatNumber';

// ----------------------------------------------------------------------

ProfileFollowInfo.propTypes = {
  profile: PropTypes.object
};

export default function ProfileFollowInfo({ profile }) {
  return (
    <Card sx={{ py: 3 }}>
      <Stack direction="row" divider={<Divider orientation="vertical" flexItem />}>
        <Stack width={1} textAlign="center">
          <Typography variant="h4">{fNumber(profile.direct_member)}</Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Referrals
          </Typography>
        </Stack>

        <Stack width={1} textAlign="center">
          <Typography variant="h4">{fNumber(profile.team_member)}</Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Teams
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
}
