import 'dotenv/config';
import { eq } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/vercel-postgres';
import { users } from './db/schema/users';

async function main() {
  const db = drizzle();

  const user: typeof users.$inferInsert = {
    name: 'Danish',
    age: 21,
    email: 'daniz.rafidz@gmail.com',
  };

  await db.insert(users).values(user);
  console.log('New user created!');

  const usersList = await db.select().from(users);
  console.log('Getting all users from the database: ', usersList);
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
  console.log('User info updated!');
}

main();
