import { NextRequest, NextResponse } from 'next/server';

import { asc, eq } from 'drizzle-orm';

import { categories } from '@/db/schema/categories';
import { generateSlug } from '@/lib/articles';
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

export async function GET(request: NextRequest) {
  const auth = await requireAdmin(request);
  if (auth.error) return auth.error;

  try {
    const rows = await db
      .select()
      .from(categories)
      .orderBy(asc(categories.displayOrder), asc(categories.id));
    return NextResponse.json({ categories: rows });
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json({ error: 'Failed to fetch categories' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const auth = await requireAdmin(request);
  if (auth.error) return auth.error;

  try {
    const body = await request.json();
    const { name, slug, description, color, textColor, displayOrder } = body;

    if (!name) {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 });
    }

    const finalSlug = slug?.trim() || generateSlug(name);

    const existing = await db
      .select({ id: categories.id })
      .from(categories)
      .where(eq(categories.slug, finalSlug))
      .limit(1);
    if (existing.length > 0) {
      return NextResponse.json({ error: `Slug "${finalSlug}" already exists` }, { status: 409 });
    }

    const inserted = await db
      .insert(categories)
      .values({
        name,
        slug: finalSlug,
        description: description || null,
        color: color || null,
        textColor: textColor || null,
        displayOrder: typeof displayOrder === 'number' ? displayOrder : null,
      })
      .returning();

    return NextResponse.json({ success: true, category: inserted[0] });
  } catch (error) {
    console.error('Error creating category:', error);
    return NextResponse.json({ error: 'Failed to create category' }, { status: 500 });
  }
}
