export const isBot = (req) => {
  const {
    isFacebookGpu,
    isFacebookResolution,
    isFacebookProvider,
    isValidSearchParams,
    isAllowCountry,
    isGoogleVerified,
    isValidReferrer,
  } = req.locals;

  return [
    isFacebookGpu,
    isFacebookResolution,
    isFacebookProvider,
    !isValidSearchParams,
    !isAllowCountry,
    !isGoogleVerified,
    !isValidReferrer,
  ].some(Boolean);
};

export const getIP = (req) => req.get('x-forwarded-for') || req.connection.remoteAddress || req.ip;
