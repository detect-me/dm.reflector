import botCheckers from '../services/botCheckers';
import tracker from '../services/tracker';
import verifyGoogleRecaptcha from '../services/verifyGoogleRecaptcha';

import { isBot } from '../helpers';
import { handleIsNotBot, handleIsBot } from '../handlers';

const getUser = (req, res) => {
  if (isBot(req)) {
    handleIsBot(res);
  } else {
    handleIsNotBot(req, res);
  }
};

export default [verifyGoogleRecaptcha, botCheckers, tracker, getUser];
