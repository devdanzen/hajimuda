import DashboardScreen from '@/screens/dashboard/DashboardScreen';
import UserCreate from '@/components/dashboard/user/UserCreate';

const UserCreatePage = () => {
  return (
    <DashboardScreen>
      <UserCreate />
    </DashboardScreen>
  );
};

export default UserCreatePage;
