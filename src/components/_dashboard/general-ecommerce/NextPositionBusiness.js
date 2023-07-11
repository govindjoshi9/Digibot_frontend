// import { merge } from 'lodash';
/* eslint-disable import/no-unresolved */
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
// import ReactApexChart from 'react-apexcharts';
import trendingUpFill from '@iconify/icons-eva/trending-up-fill';
import trendingDownFill from '@iconify/icons-eva/trending-down-fill';
// material
import { alpha, useTheme, styled } from '@material-ui/core/styles';
import { Box, Card, Typography, Stack } from '@material-ui/core';
// utils
import { fNumber } from '../../../utils/formatNumber';
// import mockData from '../../../utils/mock-data';
//
// import { BaseOptionChart } from '../../charts';

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

const PERCENT = -0.06;
// const CHART_DATA = [{ data: [56, 47, 40, 62, 73, 30, 23, 54, 67, 68] }];

NextPositionBusiness.propTypes = {
  myProfile: PropTypes.object
};

export default function NextPositionBusiness({ myProfile }) {
  const theme = useTheme();

  return (
    <Card sx={{ display: 'flex', alignItems: 'center', p: 3 }}>
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="subtitle2">Next Position Requirement</Typography>
        <Typography variant="h3" gutterBottom>
          {fNumber(myProfile?.nextRank?.business)} USD
        </Typography>

        <Stack direction="row" alignItems="center" flexWrap="wrap">
          <IconWrapperStyle
            sx={{
              ...(PERCENT < 0 && {
                color: 'error.main',
                bgcolor: alpha(theme.palette.error.main, 0.16)
              })
            }}
          >
            <Icon width={16} height={16} icon={PERCENT >= 0 ? trendingUpFill : trendingDownFill} />
          </IconWrapperStyle>
          <Typography variant="body2" component="span" sx={{ color: 'text.secondary' }}>
            Need Min
          </Typography>
          <Typography variant="subtitle2" component="span" sx={{ marginLeft: '4px', color: 'primary.main' }}>
            {myProfile?.nextRank?.direct} Direct
          </Typography>
        </Stack>
      </Box>
    </Card>
  );
}
