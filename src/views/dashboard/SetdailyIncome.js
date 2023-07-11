import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Grid, Box, Typography } from '@mui/material';

const SetDailyIncome = () => {
  const [value, setValue] = useState('');
  const [botType, setBotType] = useState('');

  const handleIncomeChange = (e) => {
    const inputValue = parseFloat(e.target.value);

    if (inputValue <= getMaxValue()) {
      setValue(inputValue);
    } else {
      setValue(getMaxValue());
    }
  };

  const handleBotTypeChange = (type) => {
    setBotType(type);
    setValue('');
  };

  const getMinValue = () => {
    if (botType === 'flexibleBot') return 0.1;
    if (botType === 'flexibleProBot') return 0.2;
    if (botType === 'mediumBot') return 0.3;
    if (botType === 'premiumBot') return 0.4;
    return 0;
  };

  const getMaxValue = () => {
    if (botType === 'flexibleBot') return 0.5;
    if (botType === 'flexibleProBot') return 0.7;
    if (botType === 'mediumBot') return 0.8;
    if (botType === 'premiumBot') return 0.9;
    return 0;
  };

  const handleSubmit = () => {
    // Perform submit logic here using the selected bot type and income value
    console.log('Bot Type:', botType);
    console.log('Income Value:', value);
  };

  return (
    <Box
      component="form"
      noValidate
      autoComplete="off"
      sx={{ display: 'flex', flexDirection: 'column', background: 'white', width: '100%', p: 4, borderRadius: '20px', height: '100%' }}
    >
      <Typography variant="h3" sx={{ mb: 3, mt: 5 }}>
        Daily Income Set
      </Typography>
      <Grid container sx={{ mb: 2 }} rowSpacing={1} columnSpacing={1}>
        <Grid item xs={12} md={4}>
          <TextField
            label="Enter Income"
            type="number"
            value={value}
            sx={{ marginRight: '1rem', width: '90%' }}
            onChange={handleIncomeChange}
            inputProps={{
              min: getMinValue(),
              max: getMaxValue()
            }}
            helperText={`Min: ${getMinValue()} - Max: ${getMaxValue()}`}
          />
        </Grid>
        {/* <Grid item xs={12} md={3}>
          <TextField label="Min Value" value={getMinValue()} disabled />
        </Grid>
        <Grid item xs={12} md={3}>
          <TextField label="Max Value" value={getMaxValue()} disabled />
        </Grid> */}
        <Grid item xs={12} md={3}>
          <Button variant="contained" onClick={handleSubmit} sx={{ marginTop: '4px', px: 4, py: 1, width: '100%' }}>
            Submit
          </Button>
        </Grid>
      </Grid>
      <Grid container rowSpacing={1} columnSpacing={1} sx={{ mt: 2 }}>
        <Grid item xs={12} md={3} sx={{ px: 3 }}>
          <Button
            variant="contained"
            sx={{ background: 'darkred', width: '100%', py: 1, marginTop: '4px' }}
            onClick={() => handleBotTypeChange('flexibleBot')}
          >
            FLEXIBLE BOT
          </Button>
        </Grid>
        <Grid item xs={12} md={3} sx={{ px: 3 }}>
          <Button
            variant="contained"
            sx={{ backgroundColor: 'firebrick', width: '100%', py: 1, marginTop: '4px' }}
            onClick={() => handleBotTypeChange('flexibleProBot')}
          >
            FLEXIBLE PRO BOT
          </Button>
        </Grid>
        <Grid item xs={12} md={3} sx={{ px: 3 }}>
          <Button
            variant="contained"
            sx={{ backgroundColor: 'orangered', width: '100%', py: 1, marginTop: '4px' }}
            onClick={() => handleBotTypeChange('mediumBot')}
          >
            MEDIUM BOT
          </Button>
        </Grid>
        <Grid item xs={12} md={3} sx={{ px: 3 }}>
          <Button
            variant="contained"
            sx={{ backgroundColor: 'indianred', width: '100%', py: 1, marginTop: '4px' }}
            onClick={() => handleBotTypeChange('premiumBot')}
          >
            PREMIUM BOT
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SetDailyIncome;
