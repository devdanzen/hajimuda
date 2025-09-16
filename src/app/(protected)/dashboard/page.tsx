'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';

import ArticleIcon from '@mui/icons-material/Article';
import DraftsIcon from '@mui/icons-material/Drafts';
import PeopleIcon from '@mui/icons-material/People';
import PublishIcon from '@mui/icons-material/Publish';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';

import { useAuth } from '@/context/AuthContext';
import { getCategoryColor, getCategoryTextColor } from '@/lib/categories';
import { formatDate } from '@/lib/date';

interface DashboardStats {
  totalArticles: number;
  publishedArticles: number;
  draftArticles: number;
  totalUsers: number;
  publishRate: number;
}

interface RecentArticle {
  id: number;
  title: string;
  category: string;
  createdAt: string;
}

interface CategoryStat {
  category: string;
  count: number;
}

export default function DashboardPage() {
  const router = useRouter();
  const { user, token } = useAuth();
  const [loading, setLoading] = React.useState(true);
  const [stats, setStats] = React.useState<DashboardStats>({
    totalArticles: 0,
    publishedArticles: 0,
    draftArticles: 0,
    totalUsers: 0,
    publishRate: 0,
  });
  const [recentArticles, setRecentArticles] = React.useState<RecentArticle[]>([]);
  const [categoryStats, setCategoryStats] = React.useState<CategoryStat[]>([]);

  const fetchDashboardStats = React.useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/dashboard/stats', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setStats(data.stats);
        setRecentArticles(data.recentArticles || []);
        setCategoryStats(data.categoryStats || []);
      }
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
    } finally {
      setLoading(false);
    }
  }, [token]);

  React.useEffect(() => {
    fetchDashboardStats();
  }, [fetchDashboardStats]);

  const statCards = [
    {
      title: 'Total Articles',
      value: stats.totalArticles,
      icon: <ArticleIcon />,
      color: '#3b82f6',
      subtitle: `${stats.publishRate}% published`,
    },
    {
      title: 'Published',
      value: stats.publishedArticles,
      icon: <PublishIcon />,
      color: '#10b981',
    },
    {
      title: 'Drafts',
      value: stats.draftArticles,
      icon: <DraftsIcon />,
      color: '#f59e0b',
    },
    {
      title: 'Total Users',
      value: stats.totalUsers,
      icon: <PeopleIcon />,
      color: '#8b5cf6',
    },
  ];

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, mb: 1 }}>
        Welcome back, {user?.name || user?.email}!
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Here&apos;s what&apos;s happening with your website today.
      </Typography>

      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, mb: 3 }}>
        {statCards.map((stat) => (
          <Box key={stat.title} sx={{
            flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 12px)', md: '1 1 calc(25% - 18px)' },
            minWidth: '250px'
          }}>
            <Card
              sx={{
                height: '100%',
                position: 'relative',
                overflow: 'visible',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 4,
                  backgroundColor: stat.color,
                  borderRadius: '4px 4px 0 0',
                },
              }}
            >
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Box
                    sx={{
                      p: 1.5,
                      borderRadius: 2,
                      backgroundColor: `${stat.color}10`,
                      color: stat.color,
                    }}
                  >
                    {stat.icon}
                  </Box>
                </Box>
                <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5 }}>
                  {stat.value}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {stat.title}
                </Typography>
                {stat.subtitle && (
                  <Typography variant="caption" color="text.secondary">
                    {stat.subtitle}
                  </Typography>
                )}
              </CardContent>
            </Card>
          </Box>
        ))}
      </Box>

      <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
        <Box sx={{
          flex: { xs: '1 1 100%', md: '1 1 65%' },
          minWidth: '300px'
        }}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                Recent Articles
              </Typography>
              {recentArticles.length > 0 ? (
                <Box sx={{ mt: 2 }}>
                  {recentArticles.map((article) => (
                    <Box
                      key={article.id}
                      sx={{
                        py: 2,
                        borderBottom: '1px solid',
                        borderColor: 'divider',
                        cursor: 'pointer',
                        '&:hover': {
                          backgroundColor: 'action.hover',
                        },
                        '&:last-child': {
                          borderBottom: 'none',
                        },
                      }}
                      onClick={() => router.push(`/dashboard/artikel/${article.id}`)}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Chip
                          label={article.category}
                          size="small"
                          sx={{
                            backgroundColor: getCategoryColor(article.category),
                            color: getCategoryTextColor(article.category),
                            fontWeight: 500
                          }}
                        />
                        <Box sx={{ flexGrow: 1 }}>
                          <Typography variant="body2" sx={{ fontWeight: 500 }}>
                            {article.title}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {formatDate(article.createdAt)}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  ))}
                </Box>
              ) : (
                <Typography variant="body2" color="text.secondary" sx={{ py: 2 }}>
                  No articles yet. Create your first article!
                </Typography>
              )}
            </CardContent>
          </Card>
        </Box>

        <Box sx={{
          flex: { xs: '1 1 100%', md: '1 1 30%' },
          minWidth: '280px',
          display: 'flex',
          flexDirection: 'column',
          gap: 3
        }}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                Category Distribution
              </Typography>
              {categoryStats.length > 0 ? (
                <Box sx={{ mt: 2 }}>
                  {categoryStats.map((stat) => (
                    <Box
                      key={stat.category}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        py: 1,
                      }}
                    >
                      <Chip
                        label={stat.category}
                        size="small"
                        sx={{
                          backgroundColor: getCategoryColor(stat.category),
                          color: getCategoryTextColor(stat.category),
                          fontWeight: 500,
                          border: `1px solid ${getCategoryTextColor(stat.category)}20`
                        }}
                      />
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        {stat.count} articles
                      </Typography>
                    </Box>
                  ))}
                </Box>
              ) : (
                <Typography variant="body2" color="text.secondary" sx={{ py: 2 }}>
                  No categories yet
                </Typography>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                Quick Actions
              </Typography>
              <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Box
                  component="a"
                  href="/dashboard/artikel/new"
                  sx={{
                    p: 2,
                    borderRadius: 1,
                    border: '1px solid',
                    borderColor: 'divider',
                    textDecoration: 'none',
                    color: 'text.primary',
                    display: 'block',
                    '&:hover': {
                      backgroundColor: 'action.hover',
                    },
                  }}
                >
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    Create New Article
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Write and publish a new article
                  </Typography>
                </Box>
                <Box
                  component="a"
                  href="/dashboard/artikel"
                  sx={{
                    p: 2,
                    borderRadius: 1,
                    border: '1px solid',
                    borderColor: 'divider',
                    textDecoration: 'none',
                    color: 'text.primary',
                    display: 'block',
                    '&:hover': {
                      backgroundColor: 'action.hover',
                    },
                  }}
                >
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    Manage Articles
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Edit or delete existing articles
                  </Typography>
                </Box>
                <Box
                  component="a"
                  href="/dashboard/users"
                  sx={{
                    p: 2,
                    borderRadius: 1,
                    border: '1px solid',
                    borderColor: 'divider',
                    textDecoration: 'none',
                    color: 'text.primary',
                    display: 'block',
                    '&:hover': {
                      backgroundColor: 'action.hover',
                    },
                  }}
                >
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    View Users
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    See all registered users
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Box>
  );
}