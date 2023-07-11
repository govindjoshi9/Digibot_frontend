// material
import { Container, Grid } from '@material-ui/core';
// hooks
import useAuth from '../../hooks/useAuth';
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
import {
  EcommerceWelcome,
  EcommerceNewProducts,
  EcommerceYearlySales,
  NextPositionBusiness,
  NextPosionReward,
  ActiveVsInactive,
  EcommerceSalesOverview,
  EcommerceLatestProducts,
  EcommerceCurrentBalance,
  NextPosition,
  AllPositions
} from '../../components/_dashboard/general-ecommerce';

// ----------------------------------------------------------------------

export default function GeneralMyTeam() {
  const { themeStretch } = useSettings();
  const { user } = useAuth();
  return (
    <Page title="General: E-commerce | X-Pic">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Grid container spacing={3} sx={{ marginTop: '-48px ' }}>
          <Grid item xs={12} md={8}>
            <EcommerceWelcome displayTitle={user.curentRank === null ? 'Member' : user.curentRank} />
          </Grid>

          <Grid item xs={12} md={4}>
            <EcommerceNewProducts />
          </Grid>

          <Grid item xs={12} md={4}>
            <NextPosition NextPosition={{}} />
          </Grid>
          <Grid item xs={12} md={4}>
            <NextPositionBusiness />
          </Grid>
          <Grid item xs={12} md={4}>
            <NextPosionReward />
          </Grid>
          <Grid item xs={12} md={12}>
            <AllPositions />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <ActiveVsInactive />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <EcommerceYearlySales />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <EcommerceSalesOverview />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <EcommerceCurrentBalance />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <EcommerceLatestProducts />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
