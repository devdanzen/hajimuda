import { users } from './db/schema/users';
import { db } from './lib/db';

import 'dotenv/config';

async function testUsers() {
  try {
    console.info('Testing user database...');
    const allUsers = await db.select().from(users);
    console.info('Total users in database:', allUsers.length);
    allUsers.forEach(user => {
      console.info(`- ${user.email} (${user.role})`);
    });
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

testUsers();