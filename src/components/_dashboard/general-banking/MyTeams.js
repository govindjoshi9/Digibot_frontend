import { merge } from 'lodash';
import ReactApexChart from 'react-apexcharts';
// material
import { useTheme, styled } from '@material-ui/core/styles';
import { Box, Card, Stack, Divider, CardHeader, Typography, useMediaQuery } from '@material-ui/core';
//
import { BaseOptionChart } from '../../charts';

// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  '& .apexcharts-legend': {
    width: 240,
    margin: 'auto',
    [theme.breakpoints.up('sm')]: {
      flexWrap: 'wrap',
      height: 160,
      width: '50%'
    }
  },
  '& .apexcharts-datalabels-group': {
    display: 'none'
  }
}));

// ----------------------------------------------------------------------

const CHART_DATA = {
  labels: ['Level 1', 'Level 2', 'Level 3', 'Level 4', 'Level 5', 'Level 6', 'Level 7', 'Level 8', 'Level 9'],
  data: [14, 23, 21, 17, 15, 10, 12, 17, 21]
};

export default function MyTeams() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const chartOptions = merge(BaseOptionChart(), {
    labels: CHART_DATA.labels,
    colors: [
      theme.palette.primary.main,
      theme.palette.info.dark,
      theme.palette.chart.yellow[0],
      theme.palette.chart.blue[0],
      theme.palette.chart.red[0],
      theme.palette.chart.violet[2],
      theme.palette.chart.violet[0],
      theme.palette.success.dark,
      theme.palette.chart.green[0]
    ],
    stroke: {
      colors: [theme.palette.background.paper]
    },
    fill: { opacity: 0.8 },
    legend: {
      position: 'right',
      itemMargin: {
        horizontal: 10,
        vertical: 5
      }
    },
    responsive: [
      {
        breakpoint: theme.breakpoints.values.sm,
        options: {
          legend: {
            position: 'bottom',
            horizontalAlign: 'left'
          }
        }
      }
    ]
  });

  return (
    <RootStyle>
      <CardHeader title="My Team" />

      <Box sx={{ my: 5 }} dir="ltr">
        <ReactApexChart
          type="polarArea"
          series={CHART_DATA.data}
          options={chartOptions}
          height={isMobile ? 360 : 240}
        />
      </Box>

      <Divider />

      <Stack direction="row" divider={<Divider orientation="vertical" flexItem />}>
        <Box sx={{ py: 2, width: 1, textAlign: 'center' }}>
          <Typography sx={{ mb: 1, typography: 'body2', color: 'text.secondary' }}>Active Members</Typography>
          <Typography sx={{ typography: 'h4' }}>44</Typography>
        </Box>
        <Box sx={{ py: 2, width: 1, textAlign: 'center' }}>
          <Typography sx={{ mb: 1, typography: 'body2', color: 'text.secondary' }}>Inactive Members</Typography>
          <Typography sx={{ typography: 'h4' }}>21</Typography>
        </Box>
        <Box sx={{ py: 2, width: 1, textAlign: 'center' }}>
          <Typography sx={{ mb: 1, typography: 'body2', color: 'text.secondary' }}>Total Teams</Typography>
          <Typography sx={{ typography: 'h4' }}>65</Typography>
        </Box>
        <Box sx={{ py: 2, width: 1, textAlign: 'center' }}>
          <Typography sx={{ mb: 1, typography: 'body2', color: 'text.secondary' }}>Total Business</Typography>
          <Typography sx={{ typography: 'h4' }}>$927.8</Typography>
        </Box>
      </Stack>
    </RootStyle>
  );
}
