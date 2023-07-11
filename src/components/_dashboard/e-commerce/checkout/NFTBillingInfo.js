import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import editFill from '@iconify/icons-eva/edit-fill';
// material
import { Card, Button, Typography, CardHeader, CardContent } from '@material-ui/core';
// redux
import { useSelector } from '../../../../redux/store';

// ----------------------------------------------------------------------

NFTBillingInfo.propTypes = {
  onBackStep: PropTypes.func,
  values: PropTypes.object
};

export default function NFTBillingInfo({ onBackStep, values }) {
  return (
    <Card sx={{ mb: 3 }}>
      <CardHeader
        title="Wallet Summary"
        action={
          <Button size="small" type="button" startIcon={<Icon icon={editFill} />} onClick={onBackStep}>
            Edit
          </Button>
        }
      />
      <CardContent>
        <Typography variant="subtitle2" gutterBottom>
          {values?.receiver}&nbsp;
          <Typography component="span" variant="body2" sx={{ color: 'text.secondary' }}>
            {/* ({billing?.addressType}) */}
          </Typography>
        </Typography>

        <Typography variant="body2" gutterBottom>
          {window.userAddress !== undefined ? window.userAddress : values.wallet === '' && values.wallet}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {/* {billing?.phone} */}
        </Typography>
      </CardContent>
    </Card>
  );
}
