// material-ui
import { Link, Typography, Stack } from '@mui/material';

// ==============================|| FOOTER - AUTHENTICATION 2 & 3 ||============================== //

const AuthFooter = () => (
  <Stack direction="row" justifyContent="space-between">
    <Typography variant="subtitle2" component={Link} href="https://royalmagic.live" target="_blank" underline="hover">
      Royal-Magic
    </Typography>
    <Typography variant="subtitle2" component={Link} href="https://royalmagic.live" target="_blank" underline="hover">
      &copy; Royal-Magic
    </Typography>
  </Stack>
);

export default AuthFooter;
