import { useAuth } from 'contexts/AuthContext';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/todos');
    } else {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);
  // 因為會依照狀態直接導引至其他頁面了，i.e. 不需要 homepage 了，所以可直接刪除此行
  // return <div>HomePage</div>;
};

export default HomePage;
