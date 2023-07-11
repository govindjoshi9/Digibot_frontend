/* eslint-disable import/no-unresolved */
import PropTypes from 'prop-types';
// import { merge } from 'lodash';
import { Icon } from '@iconify/react';
// import ReactApexChart from 'react-apexcharts';
import trendingUpFill from '@iconify/icons-eva/trending-up-fill';
import trendingDownFill from '@iconify/icons-eva/trending-down-fill';
// material
import { alpha, styled } from '@material-ui/core/styles';
import { Box, Card, Typography, Stack } from '@material-ui/core';
// ----------------------------------------------------------------------

const IconWrapperStyle = styled('div')(({ theme }) => ({
  width: 24,
  height: 24,
  display: 'flex',
  borderRadius: '50%',
  alignItems: 'center',
  justifyContent: 'center',
  marginRight: theme.spacing(1),
  color: theme.palette.success.main,
  backgroundColor: alpha(theme.palette.success.main, 0.16)
}));

// ----------------------------------------------------------------------

const PERCENT = 2.6;

NextPosition.propTypes = {
  myProfile: PropTypes.object
};

export default function NextPosition({ myProfile }) {
  return (
    <Card sx={{ display: 'flex', alignItems: 'center', p: 3 }}>
      <Box sx={{ flexGrow: 1 }}>
        <Box sx={{ display: 'flex' }}>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="subtitle2">Next Position</Typography>
            <Typography variant="h5" gutterBottom>
              {myProfile?.nextRank?.nextRank}
            </Typography>
          </Box>
          <Box
            component="img"
            src="/static/mock-images/avatars2/agent.png"
            alt="position"
            sx={{ width: 70, height: 70, borderRadius: 9999 }}
          />
        </Box>
        <Stack direction="row" alignItems="center" flexWrap="wrap" sx={{ mt: 2 }}>
          <IconWrapperStyle
            sx={{
              ...(PERCENT < 0 && {
                color: 'error.main',
                bgcolor: (theme) => alpha(theme.palette.error.main, 0.16)
              })
            }}
          >
            <Icon width={16} height={16} icon={PERCENT >= 0 ? trendingUpFill : trendingDownFill} />
          </IconWrapperStyle>
          <Box>
            <Typography variant="body2" component="span" sx={{ color: 'text.secondary' }}>
              Next Stone
            </Typography>
            <Typography variant="subtitle2" component="span" sx={{ marginLeft: '4px', color: 'primary.main' }}>
              {myProfile?.nextRank?.nextStone}
            </Typography>
          </Box>
        </Stack>
      </Box>
    </Card>
  );
}
