import { writeFileSync } from 'fs';
import * as path from 'path';

const args = process.argv.splice(2);
const numberOfItems = parseInt(args[0]) || 10;
const userId = args[1] || 'generated-from-seeder';
const dbJsonPath = path.resolve('./data', 'db.json');

console.log(`generating ${numberOfItems} items...`);

const items = Array.from(Array(numberOfItems)).map((_, idx) => {
  const id = idx + 1;

  return {
    id,
    userId,
    name: `Item ${id}`,
    description: `Item ${id} description`,
    createdAt: new Date().toUTCString()
  };
});

console.log('writing items to:', dbJsonPath);

writeFileSync(dbJsonPath, JSON.stringify(items, null, 2));

console.log('done!');
