import { merge } from 'lodash';
import PropTypes from 'prop-types';
import ReactApexChart from 'react-apexcharts';
// material
import { useTheme, styled } from '@material-ui/core/styles';
import { Card, CardHeader } from '@material-ui/core';
// utils
import { fNumber } from '../../../utils/formatNumber';
//
import { BaseOptionChart } from '../../charts';

// ----------------------------------------------------------------------

const CHART_HEIGHT = 392;
const LEGEND_HEIGHT = 72;

const ChartWrapperStyle = styled('div')(({ theme }) => ({
  height: CHART_HEIGHT,
  marginTop: theme.spacing(2),
  '& .apexcharts-canvas svg': { height: CHART_HEIGHT },
  '& .apexcharts-canvas svg,.apexcharts-canvas foreignObject': {
    overflow: 'visible'
  },
  '& .apexcharts-legend': {
    height: LEGEND_HEIGHT,
    alignContent: 'center',
    position: 'relative !important',
    borderTop: `solid 1px ${theme.palette.divider}`,
    top: `calc(${CHART_HEIGHT - LEGEND_HEIGHT}px) !important`
  }
}));

// ----------------------------------------------------------------------
// 1st active referrals and second is inactive refferals
const Refs = [53, 34];
const Active = (Refs[0] * 100) / (Refs[0] + Refs[1]).toFixed(1);
const InActive = (Refs[1] * 100) / (Refs[0] + Refs[1]).toFixed(1);
const CHART_DATA = [Active.toFixed(1), InActive.toFixed(1)];

ActiveVsInactive.propTypes = {
  myProfile: PropTypes.object
};

export default function ActiveVsInactive({ myProfile }) {
  const theme = useTheme();

  const chartOptions = merge(BaseOptionChart(), {
    labels: ['Active', 'Inactive'],
    legend: { floating: true, horizontalAlign: 'center' },
    fill: {
      type: 'gradient',
      gradient: {
        colorStops: [
          [
            {
              offset: 0,
              color: theme.palette.primary.light
            },
            {
              offset: 100,
              color: theme.palette.primary.main
            }
          ],
          [
            {
              offset: 0,
              color: theme.palette.warning.light
            },
            {
              offset: 100,
              color: theme.palette.warning.main
            }
          ]
        ]
      }
    },
    plotOptions: {
      radialBar: {
        hollow: { size: '68%' },
        dataLabels: {
          value: { offsetY: 16 },
          total: {
            formatter: () => fNumber(Refs[0] + Refs[1])
          }
        }
      }
    }
  });

  return (
    <Card>
      <CardHeader title="Active Vs Inactive Referrals" />
      <ChartWrapperStyle dir="ltr">
        <ReactApexChart type="radialBar" series={CHART_DATA} options={chartOptions} height={310} />
      </ChartWrapperStyle>
    </Card>
  );
}
