import PropTypes from 'prop-types';
// material
import { Box, Grid, Card, Typography } from '@material-ui/core';

// ----------------------------------------------------------------------

ProfileFollowers.propTypes = {
  followers: PropTypes.array
};

export default function ProfileFollowers({ followers }) {
  return (
    <Box sx={{ mt: 5 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Team
      </Typography>
      <Grid container spacing={2}>
        {followers?.map((follower, ind) => (
          <Grid key={ind} item xs={12} md={4}>
            <Card sx={{ display: 'flex', alignItems: 'center', p: 3 }}>
              <Box sx={{ display: 'flex', flexGrow: 1, minWidth: 0, justifyContent: 'space-around' }}>
                <Box>
                  <Box>
                    <Typography variant="subtitle2" noWrap>
                      {follower?.memberName === null ? 'undefined' : follower?.memberName}
                    </Typography>
                    <Typography ml={0} variant="body2" sx={{ color: 'text.secondary' }} noWrap>
                      Level : {follower?.level === null ? 'undefined' : follower?.level}
                    </Typography>
                  </Box>

                  <Box>
                    {/* <Box sx={{ width: 16, height: 16, flexShrink: 0 }} /> */}
                    <Typography ml={0} variant="body2" sx={{ color: 'text.secondary' }} noWrap>
                      Id : {follower?.memberUserId === null ? 'undefined' : follower?.memberUserId}
                    </Typography>
                  </Box>
                </Box>
                <Box>
                  <Box>
                    <Typography variant="subtitle1" ml={0} sx={{ color: 'text.secondary', fontSize: 12 }}>
                      {follower?.curentRank === null ? 'Member' : follower?.curentRank}
                    </Typography>
                  </Box>
                  <Box>
                    <Box sx={{ width: 16, height: 16, flexShrink: 0 }} />
                    <Typography ml={0} variant="body2" sx={{ color: 'text.secondary' }} noWrap>
                      Business : {follower?.teamBusiness === null ? 'undefined' : follower?.teamBusiness}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
