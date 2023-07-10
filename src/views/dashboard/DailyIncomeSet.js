import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Grid, Box, Typography } from '@mui/material';
import { format } from 'date-fns';
import { getSearch, getSearchDashboard, postBlockUser, postUnBlockUser, postActivate, changePasswordUsingAdmin } from '../../redux/admin';
import { setSession } from '../../utils/jwt';

const SearchSection = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [userID, setUserID] = useState('');
  const [walletAdd, setWalletadd] = useState('');
  const [invA, setInva] = useState('');
  const [value, setValue] = React.useState('');
  const [searchError, setSearchError] = useState('');
  const [error, setError] = useState({
    dashboardError: '',
    blockError: '',
    unBlockError: ''
  });

  useEffect(() => {
    console.log(value);
  }, [value]);

  const handleSearch = async () => {
    if (searchQuery.trim() === '') {
      setSearchError('Please enter a search query.');
      return;
    }

    // Perform search logic here using the searchQuery
    console.log('Searching for:', searchQuery);
    const res = await getSearch(searchQuery);
    console.log(res);
    setUserID(res.data[0].member_user_id);
    setWalletadd(res.data[0].wallet_address);
    console.log(new Date(res.data[0].registration_date));
    setInva(res.data[0].topup_amount);
    setValue(format(new Date(res.data[0].activation_date), 'dd-MM-yyyy'));
  };

  const handleChangePassword = async () => {
    if (newPassword.trim() === '') {
      alert('please enter password');
      return;
    }
    if (userID.trim() === '') {
      alert('please select userID');
      return;
    }
    const res = await changePasswordUsingAdmin(userID, newPassword);
    console.log(res);
  };

  const handleSearchQueryChange = (event) => {
    setSearchQuery(event.target.value);
    setSearchError('');
  };
  const handleSearchPasswordChange = (event) => {
    setNewPassword(event.target.value);
  };

  const handDashboard = async () => {
    if (!userID) {
      setError.dashboardError('User ID is empty or undefined.');
      console.log(userID);
      return;
    }
    const res = await getSearchDashboard(userID);
    setSession(res.token);
    window.location.replace('/dashboard');
  };

  const handleBlock = async () => {
    if (!userID) {
      setError.blockError('User ID is empty or undefined.');
      console.log(userID);
      return;
    }
    const res = await postBlockUser(userID);
    console.log(res);
  };

  const handleUnBlock = async () => {
    if (!userID) {
      setError.unBlockError('User ID is empty or undefined.');
      console.log(userID);
      return;
    }
    const res = await postUnBlockUser(userID);
    console.log(res);
  };
  const handleActivate = async () => {
    if (!userID) {
      setError.unBlockError('User ID is empty or undefined.');
      console.log(userID);
      return;
    }
    const res = await postActivate(userID);
    console.log(res);
  };

  const handleUserQueryChange = (event) => {
    setUserID(event.target.value);
  };
  const handleWalletQueryChange = (event) => {
    setWalletadd(event.target.value);
  };

  const handleInvQueryChange = (event) => {
    setInva(event.target.value);
  };

  return (
    <Box
      component="form"
      noValidate
      autoComplete="off"
      sx={{ display: 'flex', flexDirection: 'column', background: 'white', width: '100%', p: 4, borderRadius: '20px', height: '100%' }}
    >
      <Typography variant="h2" sx={{ mb: 3 }}>
        Search User
      </Typography>
      <Grid container sx={{ mb: 2 }} rowSpacing={1} columnSpacing={1}>
        <Grid item xs={12} md={6}>
          <TextField
            label="UserId/ Wallet Address"
            variant="outlined"
            value={searchQuery}
            onChange={handleSearchQueryChange}
            error={searchError !== ''}
            helperText={searchError}
            style={{ marginRight: '1rem', width: '100%' }}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <Button variant="contained" onClick={handleSearch} sx={{ marginTop: '4px', px: 4, py: 1, width: '100%' }}>
            Submit
          </Button>
        </Grid>
      </Grid>

      <Typography variant="h3" sx={{ mb: 3, mt: 5 }}>
        Member Information
      </Typography>
      <Grid container sx={{ mb: 2 }} rowSpacing={1} columnSpacing={1}>
        <Grid item xs={12} md={3}>
          <TextField
            label="User ID"
            variant="outlined"
            value={userID}
            onChange={handleUserQueryChange}
            style={{ marginRight: '1rem', width: '100%' }}
            InputProps={{
              readOnly: true
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label="Wallet Address"
            variant="outlined"
            value={walletAdd}
            onChange={handleWalletQueryChange}
            sx={{ marginRight: '1rem', width: '100%' }}
            InputProps={{
              readOnly: true
            }}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <TextField
            label="Registration Date"
            variant="outlined"
            value={value}
            onChange={handleWalletQueryChange}
            sx={{ marginRight: '1rem', width: '100%' }}
            InputProps={{
              readOnly: true
            }}
          />
        </Grid>

        {/* <Grid item xs={12} md={3}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker label="Registration Date" value={value} onChange={(newValue) => setValue(newValue)} />
          </LocalizationProvider>
        </Grid> */}
      </Grid>
      <Grid container rowSpacing={1} columnSpacing={1}>
        <Grid item xs={12} md={3}>
          <TextField
            label="Investment Amt  "
            variant="outlined"
            value={invA}
            onChange={handleInvQueryChange}
            sx={{ marginRight: '1rem', width: '100%' }}
            InputProps={{
              readOnly: true
            }}
          />
        </Grid>
      </Grid>
      <Grid container rowSpacing={1} columnSpacing={1} sx={{ mt: 2 }}>
        <Grid item xs={12} md={3} sx={{ px: 3 }}>
          <Button variant="contained" onClick={handDashboard} sx={{ width: '100%', py: 1, marginTop: '4px' }}>
            DashBoard
          </Button>
          {error.dashboardError && (
            <Typography variant="body2" color="error" sx={{ mt: 1 }}>
              {error.dashboardError}
            </Typography>
          )}
        </Grid>
        <Grid item xs={12} md={3} sx={{ px: 3 }}>
          <Button variant="contained" onClick={handleBlock} sx={{ backgroundColor: 'red', width: '100%', py: 1, marginTop: '4px' }}>
            Block User
          </Button>
        </Grid>
        <Grid item xs={12} md={3} sx={{ px: 3 }}>
          <Button variant="contained" onClick={handleUnBlock} sx={{ backgroundColor: 'red', width: '100%', py: 1, marginTop: '4px' }}>
            UnBlock User
          </Button>
        </Grid>
        <Grid item xs={12} md={3} sx={{ px: 3 }}>
          <Button variant="contained" onClick={handleActivate} sx={{ backgroundColor: 'green', width: '100%', py: 1, marginTop: '4px' }}>
            Activate
          </Button>
        </Grid>
      </Grid>

      {/* <Grid container sx={{ mb: 2, mt: 2 }} rowSpacing={1} columnSpacing={1}>
        <Grid item xs={12} md={4}>
          <TextField
            label="New Password"
            variant="outlined"
            value={newPassword}
            onChange={handleSearchPasswordChange}
            error={searchError !== ''}
            helperText={searchError}
            style={{ marginRight: '1rem', width: '100%' }}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <Button variant="contained" onClick={handleChangePassword} sx={{ marginTop: '4px', px: 4, py: 1, width: '100%' }}>
            Change Password
          </Button>
        </Grid>
      </Grid> */}
    </Box>
  );
};

export default SearchSection;
