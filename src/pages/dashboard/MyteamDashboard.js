/* eslint-disable import/no-unresolved */
import { useEffect } from 'react';
// material
import { Box, Grid, Container, Typography } from '@material-ui/core';
// hooks
import { useDispatch, useSelector } from 'src/redux/store';
import useSettings from '../../hooks/useSettings';
import useAuth from '../../hooks/useAuth';
// components
import Page from '../../components/Page';
import {
  AnalyticsCurrentVisits,
  MySponser,
  MyDirects,
  MyTeamsW,
  StoneHolders
} from '../../components/_dashboard/general-analytics';

import { getTeams } from '../../redux/slices/user';
import { MyTeams } from '../../components/_dashboard/general-banking';
import { MyTeamList } from '../../components/_dashboard/general-booking';
// ----------------------------------------------------------------------

export default function GeneralAnalytics() {
  const { themeStretch } = useSettings();
  const { user } = useAuth();
  const { output } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTeams());
  }, [dispatch]);
  return (
    <Page title="General: Analytics | X-Pic">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Box sx={{ pb: 5 }}>
          <Typography variant="h4">Hi, Welcome back</Typography>.
        </Box>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <MySponser mySponser={user?.sponcer_name} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <MyDirects myDirct={user.direct_member} teamMember={user.team_member} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <MyTeamsW teamMember={user.team_member} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StoneHolders />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <MyTeams />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AnalyticsCurrentVisits />
          </Grid>

          <Grid item xs={12}>
            <MyTeamList />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
