import { NextRequest, NextResponse } from 'next/server';

import { and, eq, ne, sql } from 'drizzle-orm';

import { articles } from '@/db/schema/articles';
import { categories } from '@/db/schema/categories';
import { verifyToken } from '@/lib/auth';
import { db } from '@/lib/db';

async function requireAdmin(request: NextRequest) {
  const token = request.headers.get('authorization')?.replace('Bearer ', '');
  if (!token) {
    return { error: NextResponse.json({ error: 'Unauthorized' }, { status: 401 }) };
  }
  const payload = await verifyToken(token);
  if (!payload || payload.role !== 'admin') {
    return { error: NextResponse.json({ error: 'Admin access required' }, { status: 403 }) };
  }
  return { payload };
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireAdmin(request);
  if (auth.error) return auth.error;

  try {
    const { id: idParam } = await params;
    const id = parseInt(idParam);
    const row = await db
      .select()
      .from(categories)
      .where(eq(categories.id, id))
      .limit(1);
    if (row.length === 0) {
      return NextResponse.json({ error: 'Category not found' }, { status: 404 });
    }
    return NextResponse.json({ category: row[0] });
  } catch (error) {
    console.error('Error fetching category:', error);
    return NextResponse.json({ error: 'Failed to fetch category' }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireAdmin(request);
  if (auth.error) return auth.error;

  try {
    const { id: idParam } = await params;
    const id = parseInt(idParam);
    const body = await request.json();
    const { name, slug, description, color, textColor, displayOrder } = body;

    if (!name || !slug) {
      return NextResponse.json({ error: 'Name and slug are required' }, { status: 400 });
    }

    const conflict = await db
      .select({ id: categories.id })
      .from(categories)
      .where(and(eq(categories.slug, slug), ne(categories.id, id)))
      .limit(1);
    if (conflict.length > 0) {
      return NextResponse.json({ error: `Slug "${slug}" already exists` }, { status: 409 });
    }

    const updated = await db
      .update(categories)
      .set({
        name,
        slug,
        description: description ?? null,
        color: color ?? null,
        textColor: textColor ?? null,
        displayOrder: typeof displayOrder === 'number' ? displayOrder : null,
        updatedAt: new Date(),
      })
      .where(eq(categories.id, id))
      .returning();

    if (updated.length === 0) {
      return NextResponse.json({ error: 'Category not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, category: updated[0] });
  } catch (error) {
    console.error('Error updating category:', error);
    return NextResponse.json({ error: 'Failed to update category' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireAdmin(request);
  if (auth.error) return auth.error;

  try {
    const { id: idParam } = await params;
    const id = parseInt(idParam);

    const inUse = await db
      .select({ count: sql<number>`count(*)` })
      .from(articles)
      .where(eq(articles.categoryId, id))
      .then(r => Number(r[0]?.count || 0));

    if (inUse > 0) {
      return NextResponse.json(
        { error: `Cannot delete: ${inUse} article(s) still use this category` },
        { status: 409 }
      );
    }

    const deleted = await db
      .delete(categories)
      .where(eq(categories.id, id))
      .returning();
    if (deleted.length === 0) {
      return NextResponse.json({ error: 'Category not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting category:', error);
    return NextResponse.json({ error: 'Failed to delete category' }, { status: 500 });
  }
}
