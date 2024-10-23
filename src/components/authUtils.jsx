import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const useLogout = () => {
  const navigate = useNavigate();

  const logout = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }

      await axios.post('http://localhost:8000/logout/', {}, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      localStorage.removeItem('token');
      navigate('/login');
    } catch (err) {
      console.error('Error:', err.response ? err.response.data : err.message);
    }
  };

  return logout;
};
