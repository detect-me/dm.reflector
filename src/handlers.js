import { encrypt } from 'dm.crypter';

import renderApp from './view';
import { ENCRYPT_HASH_KEY, ENCRYPT_IV_KEY } from './config';

export const handleNotFound = (_, res) => res
  .set({ 'Content-Type': 'text/plain' })
  .status(404)
  .send('Not Found');

// eslint-disable-next-line no-unused-vars
export const handleCriticalError = (err, req, res, next) => res
  .set({ 'Content-Type': 'text/plain' })
  .status(500)
  .send('Internal Server Error');

export const handleIsNotBot = (req, res) => {
  const app = renderApp(req.locals.appConfig, req.locals.userConfig);

  res.json({
    app: encrypt(
      app,
      ENCRYPT_HASH_KEY,
      ENCRYPT_IV_KEY,
    ),
  });
};
