import { useEffect, useState } from 'react';
import useAdminAuth from '../../../hooks/useAdminAuth';
// material-ui
import { Grid } from '@mui/material';

// project imports
// import EarningCard from './EarningCard';
// import PopularCard from './PopularCard';
// import TotalOrderLineChartCard from './TotalOrderLineChartCard';
import TotalIncomeDarkCard from './DashboardCard/TotalIncomeDarkCard';
import TotalIncomeLightCard from './DashboardCard/TotalIncomeLightCard';
import ActiveCard from './DashboardCard/ActiveCard';
import InactiveCard from './DashboardCard/InactiveCard';
import PendingCard from './DashboardCard/PendingCard';
import TotalStaking from './DashboardCard/TotalStaking';
import ConfirmWithdraw from './DashboardCard/ConfirmWithdraw';
// import TotalGrowthBarChart from './TotalGrowthBarChart';
// import Flexibot from './Dashboard/Flexibot';
// import Flexibotpro from './Dashboard/Flexibotpro';
// import MediumBot from './Dashboard/MediumBot';
// import PremiumBot from './Dashboard/PremiumBot';
import { gridSpacing } from 'store/constant';

// ==============================|| DEFAULT DASHBOARD ||============================== //

const Dashboard = () => {
  const { user } = useAdminAuth();
  console.log(user);
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item lg={4} md={12} sm={12} xs={12}>
            <Grid container spacing={gridSpacing}>
              <Grid item sm={6} xs={12} md={6} lg={12}>
                <TotalIncomeDarkCard isLoading={isLoading} title={'Total User'} />
              </Grid>
              <Grid item sm={6} xs={12} md={6} lg={12}>
                <ActiveCard isLoading={isLoading} title={'Active user '} teams={user?.totalActiveUser} />
              </Grid>
            </Grid>
          </Grid>
          <Grid item lg={4} md={12} sm={12} xs={12}>
            <Grid container spacing={gridSpacing}>
              <Grid item sm={6} xs={12} md={6} lg={12}>
                <InactiveCard isLoading={isLoading} title={'Inactive User'} inactive={user?.totalInactiveUser} />
              </Grid>
              <Grid item sm={6} xs={12} md={6} lg={12}>
                <TotalIncomeLightCard isLoading={isLoading} title={'Total investment'} number={user?.totalInvestment} />
              </Grid>
            </Grid>
          </Grid>
          <Grid item lg={4} md={12} sm={12} xs={12}>
            <Grid container spacing={gridSpacing}>
              <Grid item sm={6} xs={12} md={6} lg={12}>
                <PendingCard isLoading={isLoading} title={'Pending Withdraw Request'} stackingBonus={user?.pendingWithdraw} />
              </Grid>
              <Grid item sm={6} xs={12} md={6} lg={12}>
                <ConfirmWithdraw isLoading={isLoading} title={'Confirm Withdraw Request'} directMember={`$${user?.confirmWithdraw}`} />
              </Grid>
            </Grid>
          </Grid>
          <Grid item lg={4} md={12} sm={12} xs={12}>
            <Grid container spacing={gridSpacing}>
              <Grid item sm={6} xs={12} md={6} lg={12}>
                <TotalIncomeDarkCard isLoading={isLoading} title={'Blocked Users'} totalUser={`${user?.totalBlockedUser}`} />
              </Grid>
              <Grid item sm={6} xs={12} md={6} lg={12}>
                <TotalStaking isLoading={isLoading} title={'Today Staking'} />
              </Grid>
            </Grid>
          </Grid>
          <Grid item lg={4} md={12} sm={12} xs={12}>
            <Grid container spacing={gridSpacing}>
              <Grid item sm={6} xs={12} md={6} lg={12}>
                <TotalIncomeDarkCard isLoading={isLoading} title={'Today Stacking'} totalUser={`$${user?.todaystaking}`} />
              </Grid>
              <Grid item sm={6} xs={12} md={6} lg={12}>
                <PendingCard isLoading={isLoading} title={'Total Income'} />
              </Grid>
            </Grid>
          </Grid>
          <Grid item lg={4} md={12} sm={12} xs={12}>
            <Grid container spacing={gridSpacing}>
              <Grid item sm={6} xs={12} md={6} lg={12}>
                <TotalIncomeDarkCard isLoading={isLoading} title={'Total Wallet Bal'}/>
              </Grid>
              <Grid item sm={6} xs={12} md={6} lg={12}>
                <ActiveCard isLoading={isLoading} title={'Total Income'} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12} md={4}>
            <ActiveCard isLoading={isLoading} title={'FLEXIBLE BOT '}/>
          </Grid>
          <Grid item xs={12} md={4}>
            <ActiveCard isLoading={isLoading} title={'FLEXIBLE PRO BOT '}/>
          </Grid>
          <Grid item xs={12} md={4}>
            <ActiveCard isLoading={isLoading} title={'MEDIUM BOT '}/>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
