import { NextResponse } from 'next/server';

import { asc } from 'drizzle-orm';

import { categories } from '@/db/schema/categories';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const rows = await db
      .select({
        id: categories.id,
        name: categories.name,
        slug: categories.slug,
        color: categories.color,
        textColor: categories.textColor,
        displayOrder: categories.displayOrder,
      })
      .from(categories)
      .orderBy(asc(categories.displayOrder), asc(categories.id));
    return NextResponse.json({ categories: rows });
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json({ error: 'Failed to fetch categories' }, { status: 500 });
  }
}
