import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// The full upload+processing+results flow now lives in /upload
const Results = () => {
  const navigate = useNavigate();
  useEffect(() => { navigate('/upload', { replace: true }); }, [navigate]);
  return null;
};

export default Results;
