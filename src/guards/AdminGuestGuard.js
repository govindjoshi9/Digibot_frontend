import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
// hooks
import useAdminAuth from '../hooks/useAdminAuth';
// routes

// ----------------------------------------------------------------------

AdminAuthGuard.propTypes = {
  children: PropTypes.node
};

export default function AdminAuthGuard({ children }) {
  const { isAdminAuthenticated } = useAdminAuth();

  if (isAdminAuthenticated) {
    return <Navigate to="/admin/dashboard" />;
  }

  return <>{children}</>;
}
