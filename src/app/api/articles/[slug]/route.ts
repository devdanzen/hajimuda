import { NextRequest, NextResponse } from 'next/server';

import { and,eq } from 'drizzle-orm';

import { articles } from '@/db/schema/articles';
import { categories } from '@/db/schema/categories';
import { users } from '@/db/schema/users';
import { db } from '@/lib/db';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    const articleList = await db
      .select({
        id: articles.id,
        title: articles.title,
        slug: articles.slug,
        content: articles.content,
        excerpt: articles.excerpt,
        image: articles.image,
        category: categories.slug,
        categoryName: categories.name,
        categoryColor: categories.color,
        categoryTextColor: categories.textColor,
        createdAt: articles.createdAt,
        updatedAt: articles.updatedAt,
        authorName: users.name,
        authorEmail: users.email,
      })
      .from(articles)
      .leftJoin(users, eq(articles.authorId, users.id))
      .leftJoin(categories, eq(articles.categoryId, categories.id))
      .where(
        and(
          eq(articles.slug, slug),
          eq(articles.published, true) // Only show published articles
        )
      )
      .limit(1);

    if (articleList.length === 0) {
      return NextResponse.json(
        { error: 'Article not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      article: articleList[0],
    });
  } catch (error) {
    console.error('Error fetching article:', error);
    return NextResponse.json(
      { error: 'Failed to fetch article' },
      { status: 500 }
    );
  }
}