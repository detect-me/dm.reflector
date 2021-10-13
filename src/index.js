import express from 'express';
import cors from 'cors';
import * as Sentry from '@sentry/node';

import router from './router';
import { auth } from './middlewares';
import { handleNotFound, handleCriticalError } from './handlers';
import { IS_PROD } from './env';

if (IS_PROD) {
  Sentry.init({
    dsn: 'https://1a66c5c2091c43c894a4068c901b7a4d@o1037798.ingest.sentry.io/6005897',
  });
}

const PORT = '17091';

const app = express();

app.use(cors({ origin: true, credentials: true, maxAge: true }));
app.use(auth);
app.use(router);
app.use(handleNotFound);
app.use(handleCriticalError);

app.listen(PORT, () => {
  console.log(`App started at http://localhost:${PORT}`);
});
