import { Box, Card, Typography, Button } from '@material-ui/core';
// utils
import { fNumber } from '../../../utils/formatNumber';

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

const TOTAL_DOWNLOAD = 678;

export default function AppTotalDownloads() {
  const handleOpenConfirm = () => {
    // setOpenConfirm(true);
    console.log('called payout');
  };

  return (
    <Card sx={{ display: 'flex', alignItems: 'center', p: 3 }}>
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="subtitle2">MXL</Typography>

        <Typography variant="h4">{fNumber(TOTAL_DOWNLOAD)} MXL</Typography>
      </Box>

      <Button variant="contained" size="large" onClick={handleOpenConfirm}>
        Payout
      </Button>
      {/* <Stack direction="row" alignItems="center" spacing={1} sx={{ mt: 2, mb: 1 }}>
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
          <Typography component="span" variant="subtitle2">
            {PERCENT > 0 && '+'}
            {fPercent(PERCENT)}
          </Typography>
        </Stack> */}
    </Card>
  );
}
