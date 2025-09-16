import { eq } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/vercel-postgres';

import { users } from './db/schema/users';

import 'dotenv/config';

async function main() {
  const db = drizzle();

  const user: typeof users.$inferInsert = {
    name: 'Danish',
    age: 21,
    email: 'daniz.rafidz@gmail.com',
    password: 'hashed_password_here',
  };

  await db.insert(users).values(user);

  // const usersList = await db.select().from(users);
  /*
  const users: {
    id: number;
    name: string;
    age: number;
    email: string;
  }[]
  */

  await db
    .update(users)
    .set({
      age: 22,
    })
    .where(eq(users.email, user.email));
}

main();
