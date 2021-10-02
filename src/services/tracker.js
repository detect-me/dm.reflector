import Mixpanel from 'mixpanel';

import { IS_DEV, IS_PROD } from '../env';

const tracker = (req, res, next) => {
  const {
    userConfig,
    ipEntity,
    isFacebookResolution,
    isFacebookGpu,
    isFacebookProvider,
    isValidSearchParams,
    isAllowCountry,
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
    },
  };

  if (IS_DEV) {
    console.log(payload);
  } else if (IS_PROD) {
    Mixpanel
      .init('7c0d9a14a55481b294bf9e636499dd2f')
      .track('save user data', payload);
  }

  next();
};

export default tracker;
