import DashboardScreen from '@/screens/dashboard/DashboardScreen';
import UserShow from '@/components/dashboard/user/UserShow';

interface UserDetailPageProps {
  params: Promise<{
    userId: string;
  }>;
}

const UserDetailPage = async ({ params }: UserDetailPageProps) => {
  const { userId } = await params;

  return (
    <DashboardScreen>
      <UserShow userId={parseInt(userId)} />
    </DashboardScreen>
  );
};

export default UserDetailPage;
