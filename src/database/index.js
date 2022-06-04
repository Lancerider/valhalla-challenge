import { Low, JSONFile } from 'lowdb';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

let db;

const __dirname = dirname(fileURLToPath(import.meta.url));

export const createConnection = async () => {
  const file = join(__dirname, 'db.json');
  const adapter = new JSONFile(file);
  db = new Low(adapter);

  await db.read();

  if (!db.data) {
    db.data = {
      productions: []
    }

    await db.write();
  }

  console.log('Database ready');
}

export const getConnection = () => db;
