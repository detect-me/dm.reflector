import { encrypt } from 'dm.crypter';
import * as Sentry from '@sentry/node';

import renderApp from './view';
import { ENCRYPT_HASH_KEY, ENCRYPT_IV_KEY } from './config';
import { IS_PROD } from './env';

export const handleNotFound = (_, res) => res
  .set({ 'Content-Type': 'text/plain' })
  .status(404)
  .send('Not Found');

// eslint-disable-next-line no-unused-vars
export const handleCriticalError = (err, req, res, next) => {
  if (IS_PROD) {
    Sentry.withScope((scope) => {
      scope.setTag('app-data', JSON.stringify(req.locals));

      Sentry.captureException(err);
    });
  }

  console.log(err.message);

  return res
    .set({ 'Content-Type': 'text/plain' })
    .status(500)
    .send('Internal Server Error');
};

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

export const handleIsBot = (res) => res
  .set({
    'Content-Type': 'text/plain',
  })
  .status(401)
  .send('Unauthorized');

export const handleNotAuth = (res) => res
  .status(403)
  .json({ message: '403 Forbidden' });
