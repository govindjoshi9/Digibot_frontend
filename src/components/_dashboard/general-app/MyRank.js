/* eslint-disable import/no-unresolved */
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { Box, Card, Typography } from '@material-ui/core';
import { getProfile } from 'src/redux/slices/user';
import { useDispatch, useSelector } from 'src/redux/store';
// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

MyRank.propTypes = {
  teamBusiness: PropTypes.number,
  position: PropTypes.string
};

export default function MyRank({ teamBusiness, position }) {
  const { myProfile } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);
  return (
    <Box>
      <Card sx={{ display: 'flex', p: 3, flexDirection: 'column' }}>
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="subtitle2">My Position</Typography>
          <Typography variant="h6">{position}</Typography>
        </Box>
        <Box sx={{ flexGrow: 1, marginTop: '20px', textAlign: 'center' }}>
          <Typography variant="subtitle2">Total Business</Typography>
          <Typography variant="h4">{teamBusiness} USD</Typography>
        </Box>
      </Card>
      <Card sx={{ display: 'flex', p: 3, flexDirection: 'column', mt: 2 }}>
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="subtitle2">My Next Position</Typography>
          <Typography variant="h6" sx={{ marginBottom: 1 }}>
            {myProfile?.nextRank?.nextRank}
          </Typography>
        </Box>
        <Box sx={{ flexGrow: 1, marginTop: '20px', textAlign: 'center' }}>
          <Typography variant="subtitle2">Require Total Business</Typography>

          <Typography variant="h4" sx={{ marginBottom: 1 }}>
            {myProfile?.nextRank?.business} $
          </Typography>
        </Box>
      </Card>
    </Box>
  );
}
