import Mixpanel from 'mixpanel';

import { IS_DEV, IS_PROD } from '../env';

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
    $device: userConfig.os.name,
  };

  if (IS_DEV) {
    console.log(payload);
  } else if (IS_PROD) {
    Mixpanel
      .init(appConfig.analyticServiceKey || DEFAULT_KEY)
      .track('save user data', payload);
  }

  next();
};

export default tracker;
