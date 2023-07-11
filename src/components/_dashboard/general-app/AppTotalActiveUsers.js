import PropTypes from 'prop-types';
import { Box, Card, Typography, Button } from '@material-ui/core';
// utils
import { fNumber } from '../../../utils/formatNumber';

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

AppTotalActiveUsers.propTypes = {
  totalEarning: PropTypes.number
};

export default function AppTotalActiveUsers({ totalEarning }) {
  const handleOpenConfirm = () => {
    window.location.replace('/dashboard/payout/minting');
  };

  return (
    <Card sx={{ display: 'flex', alignItems: 'center', p: 3 }}>
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="subtitle2">X-Pic+</Typography>
        <Typography variant="h4">${fNumber((totalEarning * 60) / 100)} XPIC+</Typography>
      </Box>

      <Button variant="contained" size="large" onClick={handleOpenConfirm}>
        Payout
      </Button>
    </Card>
  );
}
