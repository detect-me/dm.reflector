import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import router from './router';
import { auth } from './middlewares';
import { handleNotFound, handleCriticalError } from './handlers';

const PORT = '17089';

const app = express();

app.use(cors({ origin: true, credentials: true, maxAge: true }));
app.use(cookieParser());
app.use(auth);
app.use(router);

app.get('/api/user', () => {
  throw new Error('lol');
});

app.use(handleNotFound);
app.use(handleCriticalError);

app.listen(PORT, () => {
  console.log(`App started at http://localhost:${PORT}`);
});
