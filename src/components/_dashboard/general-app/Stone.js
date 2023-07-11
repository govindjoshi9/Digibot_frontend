import { Icon } from '@iconify/react';
import { useState, useEffect, useRef } from 'react';
// material
import { alpha, useTheme, styled } from '@material-ui/core/styles';
import { Box, Card, Typography, Button } from '@material-ui/core';
// utils
import { fNumber, fPercent } from '../../../utils/formatNumber';

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

const PERCENT = 0.15;
const TOTAL_INSTALLED = 4876;
const CHART_DATA = [{ data: [5, 18, 12, 51, 68, 11, 39, 37, 27, 20] }];

export default function Stone() {
  const [autoWidth, setAutoWidth] = useState(24);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [amount, setAmount] = useState(0);
  const theme = useTheme();
  const handleOpenConfirm = () => {
    setOpenConfirm(true);
  };
  useEffect(() => {
    if (amount) {
      handleAutoWidth();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [amount]);
  const handleAutoWidth = () => {
    const getNumberLength = amount.toString().length;
    setAutoWidth(getNumberLength * 22);
  };

  return (
    <Card sx={{ display: 'flex', alignItems: 'center', p: 3 }}>
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="subtitle2">Stone Bonus</Typography>

        <Typography variant="h4">Space Stone</Typography>
      </Box>
    </Card>
  );
}
