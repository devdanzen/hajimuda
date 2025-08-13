import DashboardScreen from '@/screens/dashboard/DashboardScreen';
import UserList from '@/components/dashboard/user/UserList';

const UsersPage = () => {
  return (
    <DashboardScreen>
      <UserList />
    </DashboardScreen>
  );
};

export default UsersPage;
