import express from 'express';
import cors from 'cors';

import router from './router';
import { auth } from './middlewares';
import { handleNotFound, handleCriticalError } from './handlers';

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
