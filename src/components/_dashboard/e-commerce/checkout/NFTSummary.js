import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import editFill from '@iconify/icons-eva/edit-fill';
// material
import { Box, Card, Stack, Button, Divider, CardHeader, Typography, CardContent } from '@material-ui/core';
// utils
import { fCurrency } from '../../../../utils/formatNumber';

// ----------------------------------------------------------------------

NFTSummary.propTypes = {
  total: PropTypes.number,
  discount: PropTypes.number,
  subtotal: PropTypes.number,
  amnt: PropTypes.number,
  onEdit: PropTypes.func,
  enableEdit: PropTypes.bool
};

export default function NFTSummary({ amnt, total, onEdit, discount, subtotal = null, enableEdit = false }) {
  return (
    <Card sx={{ mb: 3 }}>
      <CardHeader
        title="Stacking Summary"
        action={
          enableEdit && (
            <Button size="small" type="button" onClick={onEdit} startIcon={<Icon icon={editFill} />}>
              Edit
            </Button>
          )
        }
      />

      <CardContent>
        <Stack spacing={2}>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Sub Total
            </Typography>
            <Typography variant="subtitle2">{fCurrency(subtotal)}</Typography>
          </Stack>

          <Stack direction="row" justifyContent="space-between">
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Discount
            </Typography>
            <Typography variant="subtitle2">{discount ? fCurrency(-discount) : '-'}</Typography>
          </Stack>

          <Divider />

          <Stack direction="row" justifyContent="space-between">
            <Typography variant="subtitle1">Total</Typography>
            <Box sx={{ textAlign: 'right' }}>
              <Typography variant="subtitle1" sx={{ color: 'error.main' }}>
                {fCurrency(total)}
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
