import fetch from 'cross-fetch';
import { URLSearchParams, URL } from 'url';
import DataDome from '@datadome/node-module';

import { IS_DEV, IS_PROD } from '../env';
import { getIP } from '../helpers';

const FACEBOOK_BOT_GPUS = [
  'google swiftshader',
  'mesa dri intel ivybridge mobile',
  'intel mesa dri intel haswell mobile',
  'intel iris plus',
];

const FACEBOOK_PROVIDER = 'Facebook, Inc.';
const FACEBOOK = 'facebook';

const FACEBOOK_RESOLUTION = '2000x2000';

const BLACK_LIST_COUNTRIES = ['Canada', 'United States'];

const ALLOW_GOOGLE_SCORE = 0.7;

const checkGPU = (req, res, next) => {
  const { value: gpu } = req.locals.userConfig.gpu;

  req.locals.isFacebookGpu = FACEBOOK_BOT_GPUS.some(
    (mapGpu) => gpu.includes(mapGpu),
  );
  next();
};

const checkResolution = (req, res, next) => {
  const { resolution } = req.locals.userConfig.device;

  req.locals.isFacebookResolution = resolution === FACEBOOK_RESOLUTION;
  next();
};

const checkInternetServiceProvider = (req, res, next) => {
  const ip = getIP(req);

  if (IS_DEV) {
    req.locals.ipEntity = { ip };
    req.locals.isFacebookProvider = false;
    next();
  } else {
    fetch(`http://ip-api.com/json/${ip}?fields=country,city,zip,timezone,isp,as,reverse,mobile,proxy,hosting`)
      .then((response) => response.json())
      .then(({
        as,
        country,
        city,
        isp: provider,
        timezone,
        reverse,
        proxy,
        hosting,
        zip,
      }) => {
        req.locals.isFacebookProvider = (
          (provider === FACEBOOK_PROVIDER) || provider.toLowerCase().includes(FACEBOOK)
        );
        req.locals.ipEntity = {
          as,
          ip,
          country,
          city,
          provider,
          timezone,
          reverse,
          proxy,
          hosting,
          zip,
        };
      })
      .finally(next);
  }
};

const validateSearchParams = (req, res, next) => {
  const { search } = req.locals.userConfig;
  const query = new URLSearchParams(search);

  query.delete('fbclid');

  req.locals.isValidSearchParams = Boolean(query.toString());

  next();
};

const validateGeo = (req, res, next) => {
  const { country } = req.locals.ipEntity;

  req.locals.isAllowCountry = country
    ? !BLACK_LIST_COUNTRIES.includes(country)
    : true;

  next();
};

const verifyGoogleRecaptcha = (req, res, next) => {
  const { result } = req.locals.userConfig.recaptchaV3;

  req.locals.isGoogleVerified = result && result.score
    ? result.score >= ALLOW_GOOGLE_SCORE
    : true;

  next();
};

const validateReferrerHeader = (req, res, next) => {
  const { search } = new URL(req.get('Referrer'));

  req.locals.isValidReferrer = !search;

  next();
};

const validateByDataDome = (req, res, next) => {
  if (IS_PROD) {
    const datadomeClient = new DataDome('BWh6OdKjIf9VDud', 'api.datadome.co');

    const onValidRequest = () => {
      req.locals.dataDome = false;

      next();
    };

    const onInvalidRequest = (ownRes) => {
      req.locals.dataDome = {
        botName: ownRes.get('X-DataDome-botname'),
        botFamily: ownRes.get('X-DataDome-botfamily'),
        isBot: ownRes.get('X-DataDome-isbot'),
      };

      next();
    };

    datadomeClient.authCallback(req, res, onValidRequest, onInvalidRequest);
  } else {
    next();
  }
};

export default [
  checkGPU,
  checkResolution,
  checkInternetServiceProvider,
  validateSearchParams,
  validateGeo,
  verifyGoogleRecaptcha,
  validateReferrerHeader,
  validateByDataDome,
];
