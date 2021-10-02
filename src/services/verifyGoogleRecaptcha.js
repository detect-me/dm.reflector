import fetch from 'cross-fetch';

const SECRET = '6LdGdWAcAAAAAAtbeTKA2Lw-W2RHJP4Y2kCKrl29';

const verify = (req, res, next) => {
  const { error, value: useResponse } = req.locals.userConfig.recaptchaV3;

  if (error) {
    next();
  } else {
    fetch(
      `https://www.google.com/recaptcha/api/siteverify?secret=${SECRET}&response=${useResponse}`,
      { method: 'POST' },
    )
      .then((response) => response.json())
      .then((result) => {
        req.locals.userConfig.recaptchaV3.result = result;
      })
      .catch(console.log)
      .finally(next);
  }
};

export default verify;
