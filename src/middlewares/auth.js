import { decrypt } from 'dm.crypter';

import { ENCRYPT_HASH_KEY, ENCRYPT_IV_KEY } from '../config';

const auth = (req, res, next) => {
  try {
    const appConfig = decrypt(
      req.get('X-API-KEY'),
      ENCRYPT_HASH_KEY,
      ENCRYPT_IV_KEY,
    );
    const userConfig = decrypt(
      req.get('X-USER-KEY'),
      ENCRYPT_HASH_KEY,
      ENCRYPT_IV_KEY,
    );

    req.locals = {
      appConfig: JSON.parse(appConfig),
      userConfig: JSON.parse(userConfig),
    };

    next();
  } catch (error) {
    console.log(error);

    res
      .status(403)
      .json({ message: '403 Forbidden' });
  }
};

export default auth;
