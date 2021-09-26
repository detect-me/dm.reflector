export const isBot = (req) => {
  const { isFacebookGpu, isFacebookResolution, isFacebookProvider } = req.locals;

  return [
    isFacebookGpu,
    isFacebookResolution,
    isFacebookProvider,
  ].some(Boolean);
};

export const abortRequest = (res) => res
  .set({
    'Content-Type': 'text/plain',
  })
  .status(401)
  .send('Unauthorized');
