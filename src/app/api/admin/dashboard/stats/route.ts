import { NextRequest, NextResponse } from 'next/server';

import { sql } from 'drizzle-orm';

import { articles } from '@/db/schema/articles';
import { users } from '@/db/schema/users';
import { verifyToken } from '@/lib/auth';
import { db } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    // Verify admin token
    const token = request.headers.get('authorization')?.replace('Bearer ', '');
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const payload = await verifyToken(token);
    if (!payload || payload.role !== 'admin') {
      return NextResponse.json({ error: 'Admin access required' }, { status: 403 });
    }

    // Get statistics
    const [totalArticles, publishedArticles, totalUsers, recentArticles] = await Promise.all([
      // Total articles count
      db
        .select({ count: sql<number>`count(*)` })
        .from(articles)
        .then(result => result[0]?.count || 0),

      // Published articles count
      db
        .select({ count: sql<number>`count(*)` })
        .from(articles)
        .where(sql`${articles.published} = true`)
        .then(result => result[0]?.count || 0),

      // Total users count
      db
        .select({ count: sql<number>`count(*)` })
        .from(users)
        .then(result => result[0]?.count || 0),

      // Recent articles (last 5)
      db
        .select({
          id: articles.id,
          title: articles.title,
          category: articles.category,
          createdAt: articles.createdAt,
        })
        .from(articles)
        .orderBy(sql`${articles.createdAt} DESC`)
        .limit(5),
    ]);

    // Calculate some derived stats
    const draftArticles = totalArticles - publishedArticles;
    const publishRate = totalArticles > 0 ? Math.round((publishedArticles / totalArticles) * 100) : 0;

    // Get category distribution
    const categoryStats = await db
      .select({
        category: articles.category,
        count: sql<number>`count(*)`,
      })
      .from(articles)
      .groupBy(articles.category);

    return NextResponse.json({
      stats: {
        totalArticles,
        publishedArticles,
        draftArticles,
        totalUsers,
        publishRate,
      },
      recentArticles,
      categoryStats,
    });
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch dashboard statistics' },
      { status: 500 }
    );
  }
}