import { NextRequest, NextResponse } from 'next/server';

import { and, desc, eq, ilike, or,sql } from 'drizzle-orm';

import { articles } from '@/db/schema/articles';
import { users } from '@/db/schema/users';
import { generateSlug, truncateText } from '@/lib/articles';
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

    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const search = searchParams.get('search') || '';
    const category = searchParams.get('category') || '';
    const published = searchParams.get('published') || '';
    const offset = (page - 1) * limit;

    const conditions = [];
    if (search) {
      conditions.push(
        or(
          ilike(articles.title, `%${search}%`),
          ilike(articles.content, `%${search}%`)
        )
      );
    }
    if (category && category !== 'all') {
      conditions.push(
        eq(articles.category, category as 'teknologi' | 'berita' | 'edukasi')
      );
    }
    if (published && published !== 'all') {
      conditions.push(eq(articles.published, published === 'true'));
    }

    const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

    const [articlesList, totalCount] = await Promise.all([
      db
        .select({
          id: articles.id,
          title: articles.title,
          slug: articles.slug,
          content: articles.content,
          excerpt: articles.excerpt,
          image: articles.image,
          category: articles.category,
          published: articles.published,
          authorId: articles.authorId,
          authorName: users.name,
          authorEmail: users.email,
          createdAt: articles.createdAt,
          updatedAt: articles.updatedAt,
        })
        .from(articles)
        .leftJoin(users, eq(articles.authorId, users.id))
        .where(whereClause)
        .orderBy(desc(articles.createdAt))
        .limit(limit)
        .offset(offset),
      db
        .select({ count: sql<number>`count(*)` })
        .from(articles)
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

export async function POST(request: NextRequest) {
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

    const body = await request.json();
    const { title, content, category, image, published: isPublished } = body;

    if (!title || !category) {
      return NextResponse.json(
        { error: 'Title and category are required' },
        { status: 400 }
      );
    }

    const slug = generateSlug(title);
    const excerpt = truncateText(content || '', 200);

    const newArticle = await db
      .insert(articles)
      .values({
        title,
        slug,
        content: content || '',
        excerpt,
        image: image || null,
        category: category as 'teknologi' | 'berita' | 'edukasi',
        authorId: payload.userId,
        published: isPublished ?? true,
      })
      .returning();

    return NextResponse.json({
      success: true,
      article: newArticle[0],
    });
  } catch (error) {
    console.error('Error creating article:', error);
    return NextResponse.json(
      { error: 'Failed to create article' },
      { status: 500 }
    );
  }
}