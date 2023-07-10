import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button, FormHelperText, Snackbar, SnackbarContent } from '@mui/material';
import useAuth from '../../hooks/useAuth';
import { postWithdraw } from '../../redux/user';

export default function ValidationTextFields() {
  const { user } = useAuth();
  const [withdrawAmount, setWithdrawAmount] = React.useState(0);
  const [withdrawWallet, setwithdrawWallet] = React.useState('');
  const [error, setError] = React.useState(false);
  const [serverError, setServerError] = React.useState('');
  const [success, setSuccess] = React.useState(false);
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  console.log(success);

  const handleWithdrawAmountChange = (event) => {
    const amount = parseInt(event.target.value);
    setWithdrawAmount(amount);
    setError(false); // Reset the error state when the value changes
    setServerError(''); // Reset the server error state when the value changes
  };
  const handleWithdrawWalletChange = (event) => {
    const walladdress = parseInt(event.target.value);
    setwithdrawWallet(walladdress);
    setError(false); // Reset the error state when the value changes
    setServerError(''); // Reset the server error state when the value changes
  };

  const handleWithdrawSubmit = async () => {
    if (withdrawAmount > user.wallet_amount) {
      setError(true); // Set the error state if the withdrawal amount exceeds the wallet balance
      return;
    }

    if (withdrawAmount < 0) {
      setError(true); // Set the error state if the withdrawal amount is negative
      return;
    }

    // Withdrawal logic here

    try {
      await postWithdraw(withdrawAmount, withdrawWallet);
      setSuccess(true); // Set the success state if the withdrawal request is successful
      setServerError(''); // Reset the server error state on success
      setSnackbarOpen(true); // Open the snackbar on success
    } catch (error) {
      setServerError('Error submitting withdrawal request.'); // Set the server error state on failure
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false); // Close the snackbar
  };

  return (
    <Box
      component="form"
      noValidate
      autoComplete="off"
      sx={{ display: 'flex', flexDirection: 'column', background: 'white', width: 'fit-content', p: 4, borderRadius: '20px' }}
    >
      <TextField
        disabled
        id="outlined-error-helper-text"
        label="Wallet Balance"
        value={`$${user?.wallet_amount}`}
        sx={{
          mt: 2,
          width: { sm: 200, md: 300 },
          '& .MuiInputBase-root': {}
        }}
      />

      <TextField
        id="outlined-error-helper-text"
        label="Withdraw Amount"
        helperText={error ? 'Incorrect entry.' : ''}
        error={error} // Set the error state to display the error styling
        type="number"
        value={withdrawAmount}
        onChange={handleWithdrawAmountChange}
        sx={{
          mt: 2,
          width: '300px'
        }}
      />

      {error && <FormHelperText error={error}>Withdraw amount cannot exceed wallet balance or be negative.</FormHelperText>}

      {serverError && <FormHelperText error={true}>{serverError}</FormHelperText>}

      <TextField
        id="withdraw-wallet-address"
        label="Withdraw Address"
        helperText={error ? 'Incorrect entry.' : ''}
        error={error} // Set the error state to display the error styling
        type="text"
        value={withdrawWallet}
        onChange={handleWithdrawWalletChange}
        sx={{
          mt: 2,
          width: '300px'
        }}
      />

      <Button variant="contained" disableElevation sx={{ mt: 2, width: '200px' }} onClick={handleWithdrawSubmit}>
        Submit
      </Button>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <SnackbarContent style={{ backgroundColor: 'green' }} message="Withdrawal request submitted successfully." />
      </Snackbar>
    </Box>
  );
}
