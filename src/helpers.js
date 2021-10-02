export const isBot = (req) => {
  const {
    isFacebookGpu,
    isFacebookResolution,
    isFacebookProvider,
    isValidSearchParams,
    isAllowCountry,
  } = req.locals;

  return [
    isFacebookGpu,
    isFacebookResolution,
    isFacebookProvider,
    !isValidSearchParams,
    !isAllowCountry,
  ].some(Boolean);
};

export const abortRequest = (res) => res
  .set({
    'Content-Type': 'text/plain',
  })
  .status(401)
  .send('Unauthorized');
