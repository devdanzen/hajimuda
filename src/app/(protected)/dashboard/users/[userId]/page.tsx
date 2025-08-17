import UserShow from '@/components/dashboard/user/UserShow';

import DashboardScreen from '@/screens/dashboard/DashboardScreen';

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
