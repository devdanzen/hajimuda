import DashboardScreen from '@/screens/dashboard/DashboardScreen';
import UserEdit from '@/components/dashboard/user/UserEdit';

interface UserEditPageProps {
  params: Promise<{
    userId: string;
  }>;
}

const UserEditPage = async ({ params }: UserEditPageProps) => {
  const { userId } = await params;

  return (
    <DashboardScreen>
      <UserEdit userId={parseInt(userId)} />
    </DashboardScreen>
  );
};

export default UserEditPage;
