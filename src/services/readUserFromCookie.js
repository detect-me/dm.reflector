import { decrypt } from 'dm.crypter';

import { ENCRYPT_HASH_KEY, ENCRYPT_IV_KEY } from '../config';

import { handleIsNotBot } from '../handlers';

const readUserFromCookie = (req, res, next) => {
  const isOldUser = Boolean(req.cookies.DM_USER);

  if (isOldUser) {
    const { isBot } = JSON.parse(decrypt(
      req.cookies.DM_USER,
      ENCRYPT_HASH_KEY,
      ENCRYPT_IV_KEY,
    ));

    if (!isBot) {
      return handleIsNotBot(req, res);
    }
  }

  next();
};

export default readUserFromCookie;
