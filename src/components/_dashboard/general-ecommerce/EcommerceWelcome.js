import PropTypes from 'prop-types';
// material
import { styled } from '@material-ui/core/styles';
import { Typography, Button, Card, CardContent, Box } from '@material-ui/core';
//
import { MotivationIllustration } from '../../../assets';

// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  textAlign: 'center',
  backgroundColor: theme.palette.primary.lighter,
  [theme.breakpoints.up('md')]: {
    height: '100%',
    display: 'flex',
    textAlign: 'left',
    alignItems: 'center',
    justifyContent: 'space-between'
  }
}));

// ----------------------------------------------------------------------

EcommerceWelcome.propTypes = {
  displayTitle: PropTypes.string,
  totalBusiness: PropTypes.number
};

// ----------------------------------------------------------------------

export default function EcommerceWelcome({ displayTitle, totalBusiness }) {
  return (
    <RootStyle>
      <CardContent
        sx={{
          color: 'grey.800',
          p: { md: 0 },
          pl: { md: 5 }
        }}
      >
        <Box>
          <Typography gutterBottom variant="h5">
            Congratulations, Your Position is{' '}
          </Typography>
          <Typography gutterBottom variant="h4">
            {!displayTitle ? 'Member' : displayTitle}
          </Typography>
        </Box>

        <Typography variant="body2" sx={{ maxWidth: 480, mx: 'auto' }}>
          Total Team Business
        </Typography>
        <Typography variant="h4" sx={{ maxWidth: 480, mx: 'auto' }}>
          {totalBusiness} USD
        </Typography>

        <Button variant="contained" sx={{ mt: 3 }}>
          Withdraw
        </Button>
      </CardContent>

      <MotivationIllustration
        sx={{
          p: 3,
          width: 360,
          margin: { xs: 'auto', md: 'inherit' }
        }}
      />
    </RootStyle>
  );
}
