/* eslint-disable import/no-unresolved */
// material
import { useEffect } from 'react';
import { Container, Grid } from '@material-ui/core';
import { getProfile } from 'src/redux/slices/user';
import { useDispatch, useSelector } from 'src/redux/store';
// hooks
import useSettings from '../../hooks/useSettings';
import useAuth from '../../hooks/useAuth';
// components
import Page from '../../components/Page';
import {
  EcommerceWelcome,
  EcommerceNewProducts,
  EcommerceYearlySales,
  NextPositionBusiness,
  NextPosionReward,
  ActiveVsInactive,
  AchivePositions,
  NextPosition,
  AllPositions
} from '../../components/_dashboard/general-ecommerce';

// ----------------------------------------------------------------------

export default function MyStone() {
  const { themeStretch } = useSettings();
  const { user } = useAuth();
  const { myProfile } = useSelector((state) => state.user);
  console.log(myProfile);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);
  return (
    <Page title="General: E-commerce | X-Pic">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Grid container spacing={3} sx={{ marginTop: '-48px ' }}>
          <Grid item xs={12} md={8}>
            <EcommerceWelcome
              displayTitle={user.curentRank === null ? 'Member' : user.curentRank}
              totalBusiness={user.team_business}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <EcommerceNewProducts myProfile={myProfile} />
          </Grid>

          <Grid item xs={12} md={4}>
            <NextPosition myProfile={myProfile} />
          </Grid>
          <Grid item xs={12} md={4}>
            <NextPositionBusiness myProfile={myProfile} />
          </Grid>
          <Grid item xs={12} md={4}>
            <NextPosionReward myProfile={myProfile} />
          </Grid>
          <Grid item xs={12} md={12}>
            <AllPositions />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <ActiveVsInactive myProfile={myProfile} />
          </Grid>
          <Grid item xs={12} md={6} lg={8}>
            <AchivePositions />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
