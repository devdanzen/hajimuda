import { NextRequest, NextResponse } from 'next/server';

import { eq } from 'drizzle-orm';

import { articles } from '@/db/schema/articles';
import { generateSlug, truncateText } from '@/lib/articles';
import { verifyToken } from '@/lib/auth';
import { db } from '@/lib/db';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const token = request.headers.get('authorization')?.replace('Bearer ', '');
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const payload = await verifyToken(token);
    if (!payload || payload.role !== 'admin') {
      return NextResponse.json({ error: 'Admin access required' }, { status: 403 });
    }

    const { id: idParam } = await params;
    const id = parseInt(idParam);
    const article = await db
      .select()
      .from(articles)
      .where(eq(articles.id, id))
      .limit(1);

    if (article.length === 0) {
      return NextResponse.json({ error: 'Article not found' }, { status: 404 });
    }

    return NextResponse.json({ article: article[0] });
  } catch (error) {
    console.error('Error fetching article:', error);
    return NextResponse.json(
      { error: 'Failed to fetch article' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const token = request.headers.get('authorization')?.replace('Bearer ', '');
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const payload = await verifyToken(token);
    if (!payload || payload.role !== 'admin') {
      return NextResponse.json({ error: 'Admin access required' }, { status: 403 });
    }

    const { id: idParam } = await params;
    const id = parseInt(idParam);
    const body = await request.json();
    const { title, content, category, image, published } = body;

    if (!title || !category) {
      return NextResponse.json(
        { error: 'Title and category are required' },
        { status: 400 }
      );
    }

    const slug = generateSlug(title);
    const excerpt = truncateText(content || '', 200);

    const updatedArticle = await db
      .update(articles)
      .set({
        title,
        slug,
        content: content || '',
        excerpt,
        image: image || null,
        category: category as 'teknologi' | 'berita' | 'edukasi',
        published: published ?? true,
        updatedAt: new Date(),
      })
      .where(eq(articles.id, id))
      .returning();

    if (updatedArticle.length === 0) {
      return NextResponse.json({ error: 'Article not found' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      article: updatedArticle[0],
    });
  } catch (error) {
    console.error('Error updating article:', error);
    return NextResponse.json(
      { error: 'Failed to update article' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const token = request.headers.get('authorization')?.replace('Bearer ', '');
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const payload = await verifyToken(token);
    if (!payload || payload.role !== 'admin') {
      return NextResponse.json({ error: 'Admin access required' }, { status: 403 });
    }

    const { id: idParam } = await params;
    const id = parseInt(idParam);
    const deletedArticle = await db
      .delete(articles)
      .where(eq(articles.id, id))
      .returning();

    if (deletedArticle.length === 0) {
      return NextResponse.json({ error: 'Article not found' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: 'Article deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting article:', error);
    return NextResponse.json(
      { error: 'Failed to delete article' },
      { status: 500 }
    );
  }
}