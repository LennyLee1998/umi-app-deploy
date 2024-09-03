import Guide from '@/components/Guide';
import { trim } from '@/utils/format';
import { PageContainer } from '@ant-design/pro-components';
import { useModel, useNavigate } from '@umijs/max';
import { Button } from 'antd';
import styles from './index.less';

const HomePage: React.FC = () => {
  const { name } = useModel('global');
  const { initialState, refresh, setInitialState } = useModel('@@initialState');
  const navigate = useNavigate();
  const handleExitClick = () => {
    setInitialState({
      isLogin: false,
      userInfo: null,
    });
    localStorage.clear();
    sessionStorage.clear();
    // navigate('/login');
  };
  return (
    <PageContainer ghost>
      <div className={styles.container}>
        <Guide name={trim(name)} />
        <Button onClick={handleExitClick} type="primary" size="large">
          Exit Button
        </Button>
      </div>
    </PageContainer>
  );
};

export default HomePage;
