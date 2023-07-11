import PropTypes from 'prop-types';
import { Box, Card, Typography, Button } from '@material-ui/core';
// utils
import { fNumber } from '../../../utils/formatNumber';

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

TotalBonus.propTypes = {
  totalEarning: PropTypes.number
};

export default function TotalBonus({ totalEarning }) {
  const handleOpenConfirm = () => {
    window.location.replace('/xPicUApp/login');
  };

  return (
    <Card sx={{ display: 'flex', alignItems: 'center', p: 3 }}>
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="subtitle2">Total Bonus</Typography>

        <Typography variant="h4">${fNumber(totalEarning)}</Typography>
      </Box>
      <Button variant="contained" size="large" onClick={handleOpenConfirm}>
        Payout
      </Button>
    </Card>
  );
}
