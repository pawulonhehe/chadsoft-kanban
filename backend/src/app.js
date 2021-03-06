import compression from 'compression';
import express from 'express';
import helmet from 'helmet';

import env from './constants/env';
import routes from './routes';

const cors = require('cors');

const app = express();
app.use(
  cors({
    origin: 'http://localhost:3000',
  })
);
// set security HTTP headers
app.use(helmet());

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// serving client files in production
if (env.NODE_ENV === 'production') {
  app.use(express.static('public'));
}

// gzip compression
app.use(compression());

// api routes
app.use('/api', routes);

export default app;
