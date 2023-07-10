import { useEffect, useState } from 'react';
import useAuth from '../../../hooks/useAuth';
// material-ui
import { Grid } from '@mui/material';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import ContentCopyTwoToneIcon from '@mui/icons-material/ContentCopyTwoTone';
// project imports
import EarningCard from './EarningCard';
// import PopularCard from './PopularCard';
import TotalOrderLineChartCard from './TotalOrderLineChartCard';
// import TotalIncomeDarkCard from './TotalIncomeDarkCard';
import TotalIncomeLightCard from './TotalIncomeLightCard';
import InactiveCard from './DashboardCard/InactiveCard';
import PendingCard from './DashboardCard/PendingCard';
import TotalStaking from './DashboardCard/TotalStaking';
import ConfirmWithdraw from './DashboardCard/ConfirmWithdraw';
import ActiveCard from './DashboardCard/ActiveCard';
import TotalIncomeG from './DashboardCard/TotalIncomeG';
import TotalIncomeN from './DashboardCard/TotalIncomeN';
// import TotalGrowthBarChart from './TotalGrowthBarChart';
import { gridSpacing } from 'store/constant';

// ==============================|| DEFAULT DASHBOARD ||============================== //

const Dashboard = () => {
  const { user } = useAuth();
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(false);
  }, []);

  const blueWhiteStyle = {
    color: 'white', // Set the color based on hover state
    backgroundColor: 'transparent', // Set the background color based on hover state
    cursor: 'pointer'
  };

  const copyToClipboard = () => {
    try {
      navigator.clipboard.writeText(`https://royalmagic.live/register?UplineId=${user?.member_user_id}`);
      setOpen2(true);
    } catch (error) {
      const tempItem = document.createElement('input');

      tempItem.setAttribute('type', 'text');
      tempItem.setAttribute('display', 'none');
      const content = `https://royalmagic.live/register?UplineId=${user?.member_user_id}`;
      tempItem.setAttribute('value', content);
      document.body.appendChild(tempItem);

      tempItem.select();
      document.execCommand('Copy');

      tempItem.parentElement.removeChild(tempItem);
      setOpen2(true);
    }
  };

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        {user?.status == 0 ? (
          <Stack sx={{ width: '100%', my: 2 }} spacing={2}>
            <Alert variant="filled" severity="error">
              Please Activate Your Id
            </Alert>
          </Stack>
        ) : (
          <></>
        )}
        <Grid container spacing={gridSpacing}>
          <Grid item lg={4} md={6} sm={6} xs={12}>
            <EarningCard isLoading={isLoading} totalEarning={user?.wallet_amount} />
          </Grid>
          <Grid item lg={4} md={6} sm={6} xs={12}>
            <TotalOrderLineChartCard isLoading={isLoading} directBusiness={user?.direct_business} />
          </Grid>
          <Grid item lg={4} md={12} sm={12} xs={12}>
            <Grid container spacing={gridSpacing}>
              <Grid item sm={6} xs={12} md={6} lg={12}>
                <ConfirmWithdraw isLoading={isLoading} title="Direct Member" directMember={user?.direct_member} />
              </Grid>

              <Grid item sm={6} xs={12} md={6} lg={12}>
                <TotalIncomeLightCard isLoading={isLoading} title={'Total investment'} topupAmount={user?.topup_amount} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item lg={4} md={12} sm={12} xs={12}>
        <Grid container spacing={gridSpacing}>
          {/* <Grid item sm={6} xs={12} md={6} lg={12}>
            <TotalIncomeDarkCard isLoading={isLoading} title={'Team Business'} teamBusiness={user?.team_business} />
          </Grid> */}
          <Grid item sm={6} xs={12} md={6} lg={12}>
            <TotalStaking isLoading={isLoading} title={'Refferal Bonus'} refBonus={user?.direct_income} />
          </Grid>
        </Grid>
      </Grid>

      <Grid item lg={4} md={12} sm={12} xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item sm={6} xs={12} md={6} lg={12}>
            <ActiveCard isLoading={isLoading} title={'Magic Pool Income'} teams={`$${user?.magicPoolIncome}`} />
          </Grid>
        </Grid>
      </Grid>
      <Grid item lg={4} md={12} sm={12} xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item sm={6} xs={12} md={6} lg={12}>
            <TotalIncomeG isLoading={isLoading} title={'Royal Pool Income'} number={user?.royalPoolIncome} />
          </Grid>
        </Grid>
      </Grid>
      <Grid item lg={4} md={12} sm={12} xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item sm={6} xs={12} md={6} lg={12}>
            <InactiveCard isLoading={isLoading} title={'Level Income'} inactive={`$${user?.net_income}`} />
          </Grid>
        </Grid>
      </Grid>
      <Grid item lg={4} md={12} sm={12} xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item sm={6} xs={12} md={6} lg={12}>
            <TotalIncomeN isLoading={isLoading} title={'Withdraw Amount'} withdrawAmount={user?.withdrawal_amt} />
          </Grid>
        </Grid>
      </Grid>
      <Grid item lg={4} md={12} sm={12} xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item sm={6} xs={12} md={6} lg={12}>
            <PendingCard isLoading={isLoading} title={'Pending Withdraw'} stackingBonus={user?.magicPoolIncome} />
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12} md={8}>
            {/* <TotalGrowthBarChart isLoading={isLoading} /> */}
          </Grid>
          <Grid item xs={12} md={4}>
            {/* <PopularCard isLoading={isLoading} /> */}
          </Grid>
        </Grid>
        <Stack sx={{ width: 'max-content', my: 2 }} spacing={2}>
          <Alert variant="filled" severity="primary">
            https://royalmagic.live/register?UplineId={user?.member_user_id}
            <ContentCopyTwoToneIcon style={blueWhiteStyle} onClick={() => copyToClipboard()} sx={{ ml: 2 }} />
          </Alert>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
