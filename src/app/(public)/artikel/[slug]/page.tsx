import ArticleDetailScreen from '@/screens/ArticleDetailScreen';

interface ArticleDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

const ArticleDetailPage = async ({ params }: ArticleDetailPageProps) => {
  const { slug } = await params;
  return <ArticleDetailScreen slug={slug} />;
};

export default ArticleDetailPage;
