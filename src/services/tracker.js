import Mixpanel from 'mixpanel';

import { IS_DEV, IS_PROD } from '../env';
import { isBot } from '../helpers';

const DEFAULT_KEY = '7c0d9a14a55481b294bf9e636499dd2f';

const tracker = (req, res, next) => {
  const {
    appConfig,
    userConfig,
    ipEntity,
    isFacebookResolution,
    isFacebookGpu,
    isFacebookProvider,
    isValidSearchParams,
    isAllowCountry,
    isGoogleVerified,
    isValidReferrer,
  } = req.locals;

  const payload = {
    ip: ipEntity.ip,
    userConfig,
    ipEntity,
    botCheckingResults: {
      isFacebookResolution,
      isFacebookGpu,
      isFacebookProvider,
      isValidSearchParams,
      isAllowCountry,
      isGoogleVerified,
      isValidReferrer,
    },
    referrer: req.get('Referrer'),

    // mixpanel
    $os: userConfig.os.name,
  };

  if (IS_DEV) {
    console.log(payload);
  } else if (IS_PROD) {
    const mixpanel = Mixpanel.init(appConfig.analyticServiceKey || DEFAULT_KEY);
    const bot = isBot(req);
    const userID = bot ? '0' : '1';

    mixpanel.people.set(
      userID,
      { $first_name: bot ? 'BOT' : 'USER' },
    );
    mixpanel.people.increment(userID, 'count', 1);
    mixpanel.track('save user data', payload);
  }

  next();
};

export default tracker;
