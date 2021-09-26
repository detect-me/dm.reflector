import { encrypt } from 'dm.crypter';

import { ENCRYPT_HASH_KEY, ENCRYPT_IV_KEY } from '../config';
import { isBot } from '../helpers';

const saveUserToCookie = (req, res, next) => {
  const payload = {
    isBot: isBot(req),
  };

  res.cookie(
    'DM_USER',
    encrypt(
      JSON.stringify(payload),
      ENCRYPT_HASH_KEY,
      ENCRYPT_IV_KEY,
    ),
    {
      domain: req.get('X-Forwarded-Host'),
      httpOnly: true,
      maxAge: 86400,
    },
  );

  next();
};

export default saveUserToCookie;
