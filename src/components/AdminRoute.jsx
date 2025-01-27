import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

const AdminRoute = ({ children }) => {
  const token = Cookies.get('token');
  
  if (!token) {
    return <Navigate to="/login" />;
  }
  
  try {
    const decoded = jwtDecode(token);
    if (decoded.role !== 'admin') {
      return <Navigate to="/login" />;
    }
    
    return children;
  } catch (error) {
    Cookies.remove('token');
    return <Navigate to="/login" />;
  }
};

export default AdminRoute; 