/* eslint-disable react/prop-types */
// material
import PropTypes from 'prop-types';
import { Card, CardHeader, Typography, Stack, LinearProgress } from '@material-ui/core';
// utils
import { fPercent } from '../../../utils/formatNumber';
import mockData from '../../../utils/mock-data';

// ----------------------------------------------------------------------

const LABELS = ['Total Profit', 'Total Income', 'Total Expenses'];

const DIDBusiness = 1000;

const MOCK_SALES = [...Array(10)].map((_, index) => ({
  label: LABELS[index],
  amount: mockData.number.price(index) * 100,
  stones: mockData.positions.stone(index),
  titlePositions: mockData.positions.titlePositions(index),
  bizness: mockData.number.bizness(index),
  value2: mockData.number.bizness(index),
  value: mockData.number.percent(index)
}));

// ----------------------------------------------------------------------

ProgressItem.propTypes = {
  progress: PropTypes.shape({
    label: PropTypes.string,
    titlePositions: PropTypes.string,
    amount: PropTypes.number,
    value2: PropTypes.string,
    value: PropTypes.number
  })
};

function ProgressItem({ progress }) {
  return (
    <Stack spacing={1}>
      <Stack direction="row" alignItems="center">
        <Typography variant="subtitle2" sx={{ flexGrow: 1 }}>
          {progress.titlePositions}
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            &nbsp;({fPercent((DIDBusiness * 100) / progress.value2)})
          </Typography>
        </Typography>
        <Typography variant="subtitle2">{progress.bizness} USD</Typography>
      </Stack>

      <LinearProgress
        variant="determinate"
        value={(DIDBusiness * 100) / progress.value2}
        color={
          (progress.label === 'Total Income' && 'info') ||
          (progress.label === 'Total Expenses' && 'warning') ||
          'primary'
        }
      />
    </Stack>
  );
}

export default function AchivePositions() {
  return (
    <Card>
      <CardHeader title="Positions Progress" />
      <Stack spacing={4} sx={{ p: 3 }}>
        {MOCK_SALES.map((progress) => (
          <ProgressItem key={progress.value} progress={progress} />
        ))}
      </Stack>
    </Card>
  );
}
