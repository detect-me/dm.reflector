import fetch from 'cross-fetch';
import { URLSearchParams } from 'url';

import { IS_DEV } from '../env';

const FACEBOOK_BOT_GPU = 'google swiftshader';
const FACEBOOK_BOT_MOBILE_GPU = 'mesa dri intel ivybridge mobile';

const FACEBOOK_PROVIDER = 'Facebook, Inc.';
const FACEBOOK = 'facebook';

const FACEBOOK_RESOLUTION = '2000x2000';

const BLACK_LIST_COUNTRIES = ['United States'];

const checkGPU = (req, res, next) => {
  const { value: gpu } = req.locals.userConfig.gpu;

  req.locals.isFacebookGpu = (
    gpu === FACEBOOK_BOT_GPU || gpu.includes(FACEBOOK_BOT_MOBILE_GPU)
  );
  next();
};

const checkResolution = (req, res, next) => {
  const { resolution } = req.locals.userConfig.device;

  req.locals.isFacebookResolution = resolution === FACEBOOK_RESOLUTION;
  next();
};

const checkInternetServiceProvider = (req, res, next) => {
  const ip = req.get('x-forwarded-for') || req.connection.remoteAddress || req.ip;

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

export default [
  checkGPU,
  checkResolution,
  checkInternetServiceProvider,
  validateSearchParams,
  validateGeo,
];
