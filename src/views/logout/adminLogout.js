// project imports
import MainCard from 'ui-component/cards/MainCard';
import useAuth from '../../hooks/useAdminAuth';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
// ==============================|| SAMPLE PAGE ||============================== //

const Logout = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  async function logoutNavigate() {
    await logout();
    navigate('/admin/login');
  }
  useEffect(() => {
    logoutNavigate();
  });

  console.log('working');
  <MainCard title="Logout"></MainCard>;
};

export default Logout;
