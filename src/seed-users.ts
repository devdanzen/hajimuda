import { eq } from 'drizzle-orm';

import { users } from './db/schema/users';
import { hashPassword } from './lib/auth';
import { db } from './lib/db';

import 'dotenv/config';

async function seedUsers() {
  try {
    console.info('Starting user seed...');

    const sampleUsers = [
      {
        name: 'Ahmad Rizki',
        age: 28,
        email: 'ahmad.rizki@example.com',
        password: 'password123',
        role: 'member' as const,
      },
      {
        name: 'Siti Nurhaliza',
        age: 35,
        email: 'siti.nurhaliza@example.com',
        password: 'password123',
        role: 'member' as const,
      },
      {
        name: 'Muhammad Fadhil',
        age: 42,
        email: 'fadhil@example.com',
        password: 'password123',
        role: 'member' as const,
      },
      {
        name: 'Aisyah Rahman',
        age: 31,
        email: 'aisyah.r@example.com',
        password: 'password123',
        role: 'member' as const,
      },
      {
        name: 'Budi Santoso',
        age: 45,
        email: 'budi.santoso@example.com',
        password: 'password123',
        role: 'member' as const,
      },
    ];

    for (const user of sampleUsers) {
      const existingUser = await db
        .select()
        .from(users)
        .where(eq(users.email, user.email))
        .limit(1);

      if (existingUser.length === 0) {
        const hashedPassword = await hashPassword(user.password);
        await db.insert(users).values({
          ...user,
          password: hashedPassword,
        });
        console.info(`Created user: ${user.email}`);
      } else {
        console.info(`User already exists: ${user.email}`);
      }
    }

    console.info('User seed completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Seed error:', error);
    process.exit(1);
  }
}

seedUsers();