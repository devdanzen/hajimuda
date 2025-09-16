import { eq } from 'drizzle-orm';

import { users } from './db/schema/users';
import { hashPassword } from './lib/auth';
import { db } from './lib/db';

import 'dotenv/config';

async function seed() {
  try {
    console.info('Starting seed...');

    const email = 'admin@hajimuda.com';
    const password = 'admin123';
    const hashedPassword = await hashPassword(password);

    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    if (existingUser.length > 0) {
      console.info('Admin user already exists, updating password...');
      await db
        .update(users)
        .set({ password: hashedPassword })
        .where(eq(users.email, email));
    } else {
      console.info('Creating admin user...');
      await db.insert(users).values({
        name: 'Admin',
        age: 30,
        email,
        password: hashedPassword,
        role: 'admin',
      });
    }

    console.info('Seed completed successfully!');
    console.info('Login credentials:');
    console.info('Email:', email);
    console.info('Password:', password);
    process.exit(0);
  } catch (error) {
    console.error('Seed error:', error);
    process.exit(1);
  }
}

seed();