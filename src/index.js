import app from './app.js';

import { createConnection } from './database/index.js';
import config from './config/index.js';

await createConnection();

app.listen(config.port, () => {
  console.log('server is listening on port 3000');
}).on('error', (error) => {
  console.error(error);
});

export default app;
