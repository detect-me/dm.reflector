import botCheckers from '../services/botCheckers';
import tracker from '../services/tracker';
import saveUserToCookie from '../services/saveUserToCookie';
import readUserFromCookie from '../services/readUserFromCookie';

import { abortRequest, isBot } from '../helpers';
import { handleIsNotBot } from '../handlers';

const getUser = (req, res) => {
  if (isBot(req)) {
    abortRequest(res);
  } else {
    handleIsNotBot(req, res);
  }
};

export default [readUserFromCookie, botCheckers, tracker, saveUserToCookie, getUser];
