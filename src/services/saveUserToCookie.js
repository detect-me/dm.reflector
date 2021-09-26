import { encrypt } from 'dm.crypter';

import { IS_PROD } from '../env';

import { ENCRYPT_HASH_KEY, ENCRYPT_IV_KEY } from '../config';
import { isBot } from '../helpers';

console.log(IS_PROD);

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
      domain: req.get('origin'),
      httpOnly: true,
      maxAge: 86400,
      secure: IS_PROD,
      sameSite: 'None',
    },
  );

  next();
};

export default saveUserToCookie;
