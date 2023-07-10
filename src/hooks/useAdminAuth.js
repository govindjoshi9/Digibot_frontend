import { useContext } from 'react';
import { AdminAuthContext } from '../contexts/AdminJWTContext.js';

// ----------------------------------------------------------------------

const useAdminAuth = () => useContext(AdminAuthContext);

export default useAdminAuth;
