import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import trendingUpFill from '@iconify/icons-eva/trending-up-fill';
import trendingDownFill from '@iconify/icons-eva/trending-down-fill';
// material
import { alpha, useTheme, styled } from '@material-ui/core/styles';
import { Box, Card, Typography, Stack } from '@material-ui/core';
// utils
import { fNumber } from '../../../utils/formatNumber';
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

const PERCENT = 0.06;
const TOTAL_SALES = 125;

NextPosionReward.propTypes = {
  myProfile: PropTypes.object
};

export default function NextPosionReward({ myProfile }) {
  const theme = useTheme();

  return (
    <Card sx={{ display: 'flex', alignItems: 'center', p: 3 }}>
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="subtitle2">Reward</Typography>
        <Typography variant="h3" gutterBottom>
          {myProfile?.nextRank?.rankIncome} USD
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

          <Typography variant="subtitle2" component="span" sx={{ color: 'primary.main' }}>
            {myProfile?.nextRank?.stoneIncome}
          </Typography>
          <Typography variant="body2" component="span" sx={{ color: 'text.secondary', ml: '3px' }}>
            Stone Income
          </Typography>
        </Stack>
      </Box>
    </Card>
  );
}
