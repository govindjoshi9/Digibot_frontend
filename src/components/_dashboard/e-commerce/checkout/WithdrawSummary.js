import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import editFill from '@iconify/icons-eva/edit-fill';
// material
import { Box, Card, Stack, Button, Divider, CardHeader, Typography, CardContent } from '@material-ui/core';
// utils
import { fCurrency } from '../../../../utils/formatNumber';
// ----------------------------------------------------------------------

WithdrawSummary.propTypes = {
  total: PropTypes.number,
  GUSD: PropTypes.number,
  XPICP: PropTypes.number,
  onEdit: PropTypes.func,
  enableEdit: PropTypes.bool
};

export default function WithdrawSummary({ GUSD, XPICP, onEdit, bal, payoutType }) {
  return (
    <Card sx={{ mb: 3 }}>
      <CardHeader title="Withdraw Summary" />

      <CardContent>
        <Stack spacing={2}>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {payoutType[0].toUpperCase() + payoutType.substring(1)} Wallet Balance
            </Typography>
            <Typography variant="subtitle2">{fCurrency(bal)}</Typography>
          </Stack>

          <Stack direction="row" justifyContent="space-between">
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Withdraw Amount GUSD
            </Typography>
            <Typography variant="subtitle2">{GUSD && GUSD}</Typography>
          </Stack>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Withdraw Amount XPICP
            </Typography>
            <Typography variant="subtitle2">{XPICP && XPICP}</Typography>
          </Stack>

          <Divider />

          <Stack direction="row" justifyContent="space-between">
            <Typography variant="subtitle1">Total</Typography>
            <Box sx={{ textAlign: 'right' }}>
              <Typography variant="subtitle1" sx={{ color: 'error.main' }}>
                {GUSD && GUSD}
              </Typography>
              <Typography variant="caption" sx={{ fontStyle: 'italic' }}>
                (VAT included if applicable)
              </Typography>
            </Box>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}
