export const isBot = (req) => {
  const {
    isFacebookGpu,
    isFacebookResolution,
    isFacebookProvider,
    isValidSearchParams,
  } = req.locals;

  return [
    isFacebookGpu,
    isFacebookResolution,
    isFacebookProvider,
    !isValidSearchParams,
  ].some(Boolean);
};

export const abortRequest = (res) => res
  .set({
    'Content-Type': 'text/plain',
  })
  .status(401)
  .send('Unauthorized');
