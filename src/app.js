import cors from 'cors';
import express from 'express';

import productionsRoutes from './routes/productions.route.js';
import './database/index.js';
import {
  errorHandler,
  logErrors,
  boomErrorHandler,
} from './middlewares/error.handler.js';

const app = express();
const router = express.Router();

router.use('/productions', productionsRoutes);
app.use('/api', router); // http://domain.com/api/...

app.use(cors());
app.use(express.json());

// Error handling
app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

export default app;
