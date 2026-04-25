import { NextRequest, NextResponse } from 'next/server';

import { and, desc, eq, ilike, or, sql } from 'drizzle-orm';

import { articles } from '@/db/schema/articles';
import { categories } from '@/db/schema/categories';
import { users } from '@/db/schema/users';
import { db } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const search = searchParams.get('search') || '';
    const category = searchParams.get('category') || '';
    const offset = (page - 1) * limit;

    const conditions = [
      eq(articles.published, true)
    ];

    if (search) {
      conditions.push(
        or(
          ilike(articles.title, `%${search}%`),
          ilike(articles.content, `%${search}%`)
        )!
      );
    }

    if (category && category !== 'all') {
      conditions.push(eq(categories.slug, category));
    }

    const whereClause = and(...conditions);

    const [articlesList, totalCount] = await Promise.all([
      db
        .select({
          id: articles.id,
          title: articles.title,
          slug: articles.slug,
          excerpt: articles.excerpt,
          image: articles.image,
          category: categories.slug,
          categoryName: categories.name,
          categoryColor: categories.color,
          categoryTextColor: categories.textColor,
          createdAt: articles.createdAt,
          authorName: users.name,
        })
        .from(articles)
        .leftJoin(users, eq(articles.authorId, users.id))
        .leftJoin(categories, eq(articles.categoryId, categories.id))
        .where(whereClause)
        .orderBy(desc(articles.createdAt))
        .limit(limit)
        .offset(offset),
      db
        .select({ count: sql<number>`count(*)` })
        .from(articles)
        .leftJoin(categories, eq(articles.categoryId, categories.id))
        .where(whereClause)
        .then(result => result[0]?.count || 0),
    ]);

    return NextResponse.json({
      articles: articlesList,
      pagination: {
        page,
        limit,
        total: totalCount,
        totalPages: Math.ceil(totalCount / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching articles:', error);
    return NextResponse.json(
      { error: 'Failed to fetch articles' },
      { status: 500 }
    );
  }
}
