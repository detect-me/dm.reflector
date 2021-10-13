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

export const abortRequest = (res) => res
  .set({
    'Content-Type': 'text/plain',
  })
  .status(401)
  .send('Unauthorized');
