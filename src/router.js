import { Router } from 'express';

import getUser from './controllers/getUser';

const apiRouter = Router()
  .get('/api/user', getUser);

export default apiRouter;
