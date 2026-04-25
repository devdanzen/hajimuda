import { sql } from '@vercel/postgres';
import { drizzle } from 'drizzle-orm/vercel-postgres';

import * as articles from '@/db/schema/articles';
import * as categories from '@/db/schema/categories';
import * as users from '@/db/schema/users';

const schema = {
  ...users,
  ...articles,
  ...categories,
};

export const db = drizzle(sql, { schema });
