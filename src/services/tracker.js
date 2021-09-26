import Mixpanel from 'mixpanel';

const tracker = (req, res, next) => {
  const mixpanel = Mixpanel.init('7c0d9a14a55481b294bf9e636499dd2f');

  const {
    userConfig,
    ipEntity,
    isFacebookResolution,
    isFacebookGpu,
    isFacebookProvider,
  } = req.locals;

  mixpanel.track('save user data', {
    ip: ipEntity.ip,
    userConfig,
    ipEntity,
    botCheckingResults: {
      isFacebookResolution,
      isFacebookGpu,
      isFacebookProvider,
    },
  });

  next();
};

export default tracker;
