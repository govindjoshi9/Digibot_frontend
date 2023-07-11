/* eslint-disable new-cap */
import axios from 'axios';
import { useEffect } from 'react';
// material
import { styled } from '@material-ui/core/styles';
import queryString from 'query-string';
import { Box } from '@material-ui/core';
import Page from '../../components/Page';
import LoadingScreen from '../../components/LoadingScreen';

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex'
  }
}));

// ----------------------------------------------------------------------

const baseUrl = process.env.PORT || 'https://xpic.live/api/v1/api';

export default function DashLogin() {
  const queryParams = new queryString.parse(window.location.search);

  useEffect(() => {
    if (queryParams.Uid === undefined) {
      window.location.replace('/xPicUApp/login');
    }
    loginFromDashboard();
    console.log(queryParams.Uid);
  }, []);

  const loginFromDashboard = async () => {
    const response = await axios({
      method: 'post',
      url: `${baseUrl}/admin/DashLogin?userId=${queryParams.Uid}`,
      data: {
        userId: queryParams.Uid
      }
    });
    window.localStorage.setItem('accessToken', response.data.accessToken);
    window.location.replace('/Dashboard/app');
  };

  return (
    <RootStyle title="Register | X-Pic">
      <Box sx={{ position: 'absolute', top: '45%', left: '40', width: '100vw' }}>
        <LoadingScreen />
      </Box>
    </RootStyle>
  );
}
