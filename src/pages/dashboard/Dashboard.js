/* eslint-disable import/no-unresolved */
import { useEffect } from 'react';
import { CardHeader, Container, Grid, Stack } from '@material-ui/core';
// hooks
import { getProfile } from 'src/redux/slices/user';
import { useDispatch, useSelector } from 'src/redux/store';
import useAuth from '../../hooks/useAuth';
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
import {
  AppWelcome,
  AppFeatured,
  AppAreaInstalled,
  AppTotalInstalled,
  AppTotalActiveUsers,
  TotalBonus,
  MyRank,
  TotalBonusCercle,
  LatestAchivers
} from '../../components/_dashboard/general-app';
import { BankingInviteFriends } from '../../components/_dashboard/general-banking';
import { EventsPosts } from '../../components/_dashboard/general-booking';
// ----------------------------------------------------------------------

export default function Dashboard() {
  const { themeStretch } = useSettings();
  const { user } = useAuth();
  const { myProfile } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);
  return (
    <Page title="General: App | X-Pic">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Grid container spacing={3} sx={{ marginTop: '-48px ' }}>
          <Grid item xs={12} md={8} sx={{ pt: 0 }}>
            <AppWelcome displayName={user.member_name} memberUserId={user.member_user_id} />
          </Grid>
          <Grid item xs={12} md={4}>
            <AppFeatured nft3={myProfile?.nft3} />
          </Grid>
          <Grid item xs={12}>
            <CardHeader title={'Stake Amount : '.concat(user.topup_amount, ' GUSD')} sx={{ padding: '0px 10px' }}>
              ' '
            </CardHeader>
          </Grid>
          <Grid item xs={12} md={4}>
            <AppTotalActiveUsers totalEarning={user.total_earning} />
          </Grid>
          <Grid item xs={12} md={4}>
            <AppTotalInstalled totalEarning={user.total_earning} />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <TotalBonus totalEarning={user.total_earning} />
          </Grid>
          <Grid item xs={12} md={4}>
            <MyRank
              teamBusiness={user.team_business}
              position={user.curentRank === null ? 'Member' : user.curentRank}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <TotalBonusCercle user={user} />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <LatestAchivers />
          </Grid>
          <Grid item xs={12}>
            <EventsPosts />
          </Grid>
          <Grid item xs={8}>
            <AppAreaInstalled />
          </Grid>
          <Grid item xs={12} md={4}>
            <Stack>
              <BankingInviteFriends />
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
